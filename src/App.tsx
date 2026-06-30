import { useEffect, useMemo, useState } from 'react';
import { Command, CommandCenter } from './components/CommandCenter';
import { DemandDrawer, DemandFormValue } from './components/DemandDrawer';
import { Sidebar } from './components/Sidebar';
import { ModuleWorkspace } from './modules/ModuleWorkspace';
import { clients, initialAudit, initialDemands, initialInvoices, initialPayroll, initialShifts, initialTimesheets, modules, tenant, workers } from './data/seed';
import type { ApprovalStatus, AuditEvent, Demand, Invoice, ModuleKey, PayrollBatch, Shift, Timesheet } from './types';
import './styles.css';

const statusFlow: ApprovalStatus[] = ['待报价', '待审批', '待排班', '履约中', '已完成'];
const commands: Command[] = [
  { label: '审批上海仓配夜班需求', module: 'demand', effect: '已将第一条需求推进到待排班。' },
  { label: '为待排班需求生成班次', module: 'schedule', effect: '已生成排班草案并写入排班计划。' },
  { label: '生成薪酬结算批次', module: 'payroll', effect: '已生成新的薪酬批次。' },
  { label: '查看跨区域用工风险', module: 'risk', effect: '已定位到合规风控模块。' }
];

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleKey>('overview');
  const [demands, setDemands] = useState<Demand[]>(initialDemands);
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);
  const [timesheets, setTimesheets] = useState<Timesheet[]>(initialTimesheets);
  const [payroll, setPayroll] = useState<PayrollBatch[]>(initialPayroll);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [audit, setAudit] = useState<AuditEvent[]>(initialAudit);
  const [commandOpen, setCommandOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeConfig = useMemo(() => modules.find(item => item.key === activeModule) ?? modules[0], [activeModule]);

  useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setCommandOpen(false); setDrawerOpen(false); } }; document.addEventListener('keydown', close); return () => document.removeEventListener('keydown', close); }, []);

  function addAudit(message: string, module: ModuleKey = activeModule) { setAudit(events => [{ id: crypto.randomUUID(), at: new Date().toLocaleTimeString('zh-CN', { hour12: false }), message, module }, ...events]); }
  function nextStatus(status: ApprovalStatus): ApprovalStatus { return statusFlow[Math.min(statusFlow.indexOf(status) + 1, statusFlow.length - 1)]; }
  function advanceDemand(id: string) { setDemands(list => list.map(item => item.id === id ? { ...item, status: nextStatus(item.status) } : item)); addAudit(`推进需求 ${id} 状态流转`, 'demand'); }
  function approveDemand(id: string) { setDemands(list => list.map(item => item.id === id ? { ...item, status: '待排班' } : item)); setActiveModule('schedule'); addAudit(`审批通过需求 ${id}，进入排班`, 'demand'); }
  function scheduleDemand(id: string) { const demand = demands.find(item => item.id === id); if (!demand) return; setShifts(list => [{ id: crypto.randomUUID(), demandId: id, name: `${demand.role} 自动排班`, window: '20:00-02:00', coverage: 88, status: '已发布' }, ...list]); setTimesheets(list => [{ id: crypto.randomUUID(), shiftId: id, workerId: workers[0].id, hours: 8, status: '待确认' }, ...list]); setDemands(list => list.map(item => item.id === id ? { ...item, status: '履约中' } : item)); setActiveModule('time'); addAudit(`为 ${demand.title} 生成排班与工时`, 'schedule'); }
  function settlePayroll() { const amount = timesheets.reduce((sum, sheet) => sum + sheet.hours * 42, 0); setPayroll(list => [{ id: crypto.randomUUID(), title: '自动结算批次', amount, status: '待确认' }, ...list]); setInvoices(list => [{ id: crypto.randomUUID(), clientId: clients[0].id, amount: Math.round(amount * 1.25), status: '待开票' }, ...list]); setActiveModule('payroll'); addAudit('根据已验收工时生成薪酬批次与客户账单', 'payroll'); }
  function createDemand(value: DemandFormValue) { const client = clients.find(item => item.name === value.client) ?? clients[0]; const demand: Demand = { id: crypto.randomUUID(), clientId: client.id, title: `${value.city} · ${value.client} · ${value.role}`, role: value.role, city: value.city, headcount: value.count, status: '待报价', budgetPerHour: 42 }; setDemands(list => [demand, ...list]); setDrawerOpen(false); setActiveModule('demand'); addAudit(`创建用工需求：${demand.title} ${demand.headcount}人`, 'demand'); }
  function runCommand(command: Command) { setActiveModule(command.module); setCommandOpen(false); if (command.module === 'demand' && demands[0]) approveDemand(demands[0].id); if (command.module === 'schedule' && demands[0]) scheduleDemand(demands[0].id); if (command.module === 'payroll') settlePayroll(); addAudit(`AI 指挥中心执行：${command.label}。${command.effect}`, command.module); }

  return <div className="app-shell"><Sidebar modules={modules} active={activeModule} onSelect={setActiveModule} /><main className="workspace"><header className="workspace-header"><div><p className="eyebrow">{tenant.name} · {tenant.plan}</p><h1>灵活用工与企业 HR 的产品化 SaaS 工作台</h1><p>从需求、审批、排班、履约、薪酬、对账到风控审计，使用 React state 演示真实业务数据流。</p></div><div className="header-actions"><button className="button secondary" onClick={() => setCommandOpen(true)}>AI 指挥中心</button><button className="button primary" onClick={() => setDrawerOpen(true)}>创建用工需求</button></div></header><section className="executive-grid"><article><span>客户</span><strong>{clients.length}</strong><em>SLA {clients[0].sla}%</em></article><article><span>需求</span><strong>{demands.length}</strong><em>{demands[0]?.status}</em></article><article><span>排班</span><strong>{shifts.length}</strong><em>覆盖 {shifts[0]?.coverage}%</em></article><article><span>审计</span><strong>{audit.length}</strong><em>实时记录</em></article></section><ModuleWorkspace module={activeConfig} demands={demands} workers={workers} shifts={shifts} timesheets={timesheets} payroll={payroll} onAdvance={advanceDemand} onApprove={approveDemand} onSchedule={scheduleDemand} onSettle={settlePayroll} /><section className="audit-panel"><div><h3>审计日志</h3><p>审批、排班、结算、AI 指挥中心都会记录。</p></div><ol>{audit.slice(0, 8).map(event => <li key={event.id}>{event.at} · {event.module} · {event.message}</li>)}</ol></section><CommandCenter open={commandOpen} commands={commands} onRun={runCommand} onClose={() => setCommandOpen(false)} /><DemandDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onCreate={createDemand} /></main></div>;
}
