import { useState } from 'react';
import { clients, initialAudit, initialDemands, initialInvoices, initialPayroll, initialShifts, initialTimesheets, workers } from '../data/seed';
import type { ApprovalStatus, AuditEvent, Demand, Invoice, ModuleKey, PayrollBatch, Shift, Timesheet } from '../types';

export interface CommandAction { label: string; module: ModuleKey; effect: string; }

const statusFlow: ApprovalStatus[] = ['待报价', '待审批', '待排班', '履约中', '已完成'];

export function useWorkforceState(initialModule: ModuleKey = 'overview') {
  const [activeModule, setActiveModule] = useState<ModuleKey>(initialModule);
  const [demands, setDemands] = useState<Demand[]>(initialDemands);
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);
  const [timesheets, setTimesheets] = useState<Timesheet[]>(initialTimesheets);
  const [payroll, setPayroll] = useState<PayrollBatch[]>(initialPayroll);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [audit, setAudit] = useState<AuditEvent[]>(initialAudit);

  function addAudit(message: string, module: ModuleKey = activeModule) {
    setAudit(events => [{ id: crypto.randomUUID(), at: new Date().toLocaleTimeString('zh-CN', { hour12: false }), message, module }, ...events]);
  }

  function nextStatus(status: ApprovalStatus): ApprovalStatus {
    return statusFlow[Math.min(statusFlow.indexOf(status) + 1, statusFlow.length - 1)];
  }

  function advanceDemand(id: string) {
    setDemands(list => list.map(item => item.id === id ? { ...item, status: nextStatus(item.status) } : item));
    addAudit(`推进需求 ${id} 状态流转`, 'demand');
  }

  function approveDemand(id: string) {
    setDemands(list => list.map(item => item.id === id ? { ...item, status: '待排班' } : item));
    setActiveModule('schedule');
    addAudit(`审批通过需求 ${id}，进入排班`, 'demand');
  }

  function scheduleDemand(id: string) {
    const demand = demands.find(item => item.id === id);
    if (!demand) return;
    setShifts(list => [{ id: crypto.randomUUID(), demandId: id, name: `${demand.role} 自动排班`, window: '20:00-02:00', coverage: 88, status: '已发布' }, ...list]);
    setTimesheets(list => [{ id: crypto.randomUUID(), shiftId: id, workerId: workers[0].id, hours: 8, status: '待确认' }, ...list]);
    setDemands(list => list.map(item => item.id === id ? { ...item, status: '履约中' } : item));
    setActiveModule('time');
    addAudit(`为 ${demand.title} 生成排班与工时`, 'schedule');
  }

  function settlePayroll() {
    const amount = timesheets.reduce((sum, sheet) => sum + sheet.hours * 42, 0);
    setPayroll(list => [{ id: crypto.randomUUID(), title: '自动结算批次', amount, status: '待确认' }, ...list]);
    setInvoices(list => [{ id: crypto.randomUUID(), clientId: clients[0].id, amount: Math.round(amount * 1.25), status: '待开票' }, ...list]);
    setActiveModule('payroll');
    addAudit('根据已验收工时生成薪酬批次与客户账单', 'payroll');
  }

  function createDemand(value: { client: string; role: string; count: number; city: string }) {
    const client = clients.find(item => item.name === value.client) ?? clients[0];
    const demand: Demand = { id: crypto.randomUUID(), clientId: client.id, title: `${value.city} · ${value.client} · ${value.role}`, role: value.role, city: value.city, headcount: value.count, status: '待报价', budgetPerHour: 42 };
    setDemands(list => [demand, ...list]);
    setActiveModule('demand');
    addAudit(`创建用工需求：${demand.title} ${demand.headcount}人`, 'demand');
  }

  function runCommand(command: CommandAction) {
    setActiveModule(command.module);
    if (command.module === 'demand' && demands[0]) approveDemand(demands[0].id);
    if (command.module === 'schedule' && demands[0]) scheduleDemand(demands[0].id);
    if (command.module === 'payroll') settlePayroll();
    addAudit(`AI 指挥中心执行：${command.label}。${command.effect}`, command.module);
  }

  return { activeModule, setActiveModule, demands, shifts, timesheets, payroll, invoices, audit, advanceDemand, approveDemand, scheduleDemand, settlePayroll, createDemand, runCommand };
}
