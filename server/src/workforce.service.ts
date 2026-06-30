import { Injectable } from '@nestjs/common';
import { ApprovalStatus } from '@prisma/client';
import { PrismaService } from './prisma.service';

const statusOrder = [ApprovalStatus.QUOTING, ApprovalStatus.APPROVAL, ApprovalStatus.SCHEDULING, ApprovalStatus.IN_PROGRESS, ApprovalStatus.COMPLETED];

@Injectable()
export class WorkforceService {
  constructor(private readonly prisma: PrismaService) {}

  async snapshot() {
    const [tenants, clients, demands, workers, shifts, timesheets, payrollBatches, invoices, auditEvents] = await Promise.all([
      this.prisma.tenant.findMany(), this.prisma.client.findMany(), this.prisma.demand.findMany({ orderBy: { createdAt: 'desc' } }), this.prisma.worker.findMany(), this.prisma.shift.findMany(), this.prisma.timesheet.findMany(), this.prisma.payrollBatch.findMany({ orderBy: { createdAt: 'desc' } }), this.prisma.invoice.findMany({ orderBy: { createdAt: 'desc' } }), this.prisma.auditEvent.findMany({ orderBy: { createdAt: 'desc' }, take: 30 })
    ]);
    return { tenants, clients, demands, workers, shifts, timesheets, payrollBatches, invoices, auditEvents };
  }

  async createDemand(input: { clientId: string; title: string; role: string; city: string; headcount: number; budgetPerHour: number }) {
    const demand = await this.prisma.demand.create({ data: { ...input, status: ApprovalStatus.QUOTING } });
    await this.audit('demand', `创建用工需求：${demand.title}`);
    return demand;
  }

  async advanceDemand(id: string) {
    const demand = await this.prisma.demand.findUniqueOrThrow({ where: { id } });
    const next = statusOrder[Math.min(statusOrder.indexOf(demand.status) + 1, statusOrder.length - 1)];
    const updated = await this.prisma.demand.update({ where: { id }, data: { status: next } });
    await this.audit('demand', `推进需求 ${updated.title} 到 ${updated.status}`);
    return updated;
  }

  async scheduleDemand(id: string) {
    const demand = await this.prisma.demand.update({ where: { id }, data: { status: ApprovalStatus.IN_PROGRESS } });
    const shift = await this.prisma.shift.create({ data: { demandId: id, name: `${demand.role} 自动排班`, window: '20:00-02:00', coverage: 88, status: '已发布' } });
    await this.audit('schedule', `为 ${demand.title} 生成排班 ${shift.name}`);
    return { demand, shift };
  }

  async settle() {
    const payroll = await this.prisma.payrollBatch.create({ data: { title: '自动结算批次', amount: 0, status: '待确认' } });
    await this.audit('payroll', '生成薪酬结算批次');
    return payroll;
  }

  private async audit(module: string, message: string) {
    const tenant = await this.prisma.tenant.findFirst();
    if (!tenant) return;
    await this.prisma.auditEvent.create({ data: { tenantId: tenant.id, module, message } });
  }
}
