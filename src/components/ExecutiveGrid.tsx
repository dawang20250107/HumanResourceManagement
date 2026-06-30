import type { AuditEvent, Client, Demand, Shift } from '../types';
export function ExecutiveGrid({ clients, demands, shifts, audit }: { clients: Client[]; demands: Demand[]; shifts: Shift[]; audit: AuditEvent[] }) {
  return <section className="executive-grid"><article><span>客户</span><strong>{clients.length}</strong><em>SLA {clients[0]?.sla}%</em></article><article><span>需求</span><strong>{demands.length}</strong><em>{demands[0]?.status}</em></article><article><span>排班</span><strong>{shifts.length}</strong><em>覆盖 {shifts[0]?.coverage}%</em></article><article><span>审计</span><strong>{audit.length}</strong><em>实时记录</em></article></section>;
}
