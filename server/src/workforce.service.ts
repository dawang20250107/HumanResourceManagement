import { Injectable, NotFoundException } from '@nestjs/common';
import { ApprovalStatus } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { nextDemandStatus } from './status-flow';
import { CreateDemandDto, ScheduleDemandDto, SettlePayrollDto } from './workforce.dto';

const DEFAULT_TENANT_ID = 'tenant-flexforce-demo';

@Injectable()
export class WorkforceService {
  constructor(private readonly prisma: PrismaService) {}

  async snapshot() {
    const [tenant, clients, demands, workers, shifts, timesheets, payroll, invoices, audit] = await Promise.all([
      this.prisma.tenant.findFirst(),
      this.prisma.client.findMany({ orderBy: { name: 'asc' } }),
      this.prisma.demand.findMany({ orderBy: { createdAt: 'desc' } }),
      this.prisma.worker.findMany({ orderBy: { matchScore: 'desc' } }),
      this.prisma.shift.findMany({ orderBy: { id: 'desc' } }),
      this.prisma.timesheet.findMany({ orderBy: { id: 'desc' } }),
      this.prisma.payrollBatch.findMany({ orderBy: { createdAt: 'desc' } }),
      this.prisma.invoice.findMany({ orderBy: { createdAt: 'desc' } }),
      this.prisma.auditEvent.findMany({ orderBy: { createdAt: 'desc' }, take: 40 })
    ]);

    return { tenant, clients, demands, workers, shifts, timesheets, payroll, invoices, audit };
  }

  async createDemand(dto: CreateDemandDto) {
    const client = await this.resolveClient(dto.clientId, dto.clientName);
    const demand = await this.prisma.demand.create({
      data: {
        clientId: client.id,
        title: dto.title,
        role: dto.role,
        city: dto.city,
        headcount: dto.headcount,
        budgetPerHour: dto.budgetPerHour,
        status: ApprovalStatus.QUOTING
      }
    });
    await this.audit('demand', `创建用工需求：${demand.title}，${demand.headcount}人`);
    return demand;
  }

  async advanceDemand(id: string) {
    const current = await this.prisma.demand.findUnique({ where: { id } });
    if (!current) throw new NotFoundException(`Demand ${id} not found`);

    const demand = await this.prisma.demand.update({
      where: { id },
      data: { status: nextDemandStatus(current.status) }
    });
    await this.audit('demand', `需求 ${demand.title} 状态推进为 ${demand.status}`);
    return demand;
  }

  async scheduleDemand(id: string, dto: ScheduleDemandDto) {
    const demand = await this.prisma.demand.findUnique({ where: { id } });
    if (!demand) throw new NotFoundException(`Demand ${id} not found`);

    const worker = dto.workerId
      ? await this.prisma.worker.findUnique({ where: { id: dto.workerId } })
      : await this.prisma.worker.findFirst({ orderBy: { matchScore: 'desc' } });
    if (!worker) throw new NotFoundException('No worker available for scheduling');

    const shift = await this.prisma.shift.create({
      data: {
        demandId: demand.id,
        name: dto.name ?? `${demand.role} 自动排班`,
        window: dto.window ?? '20:00-02:00',
        coverage: dto.coverage ?? 88,
        status: '已发布',
        timesheets: {
          create: { workerId: worker.id, hours: dto.hours ?? 8, status: '待确认' }
        }
      },
      include: { timesheets: true }
    });

    await this.prisma.demand.update({ where: { id }, data: { status: ApprovalStatus.IN_PROGRESS } });
    await this.audit('schedule', `需求 ${demand.title} 已生成排班 ${shift.name} 并进入履约`);
    return shift;
  }

  async settle(dto: SettlePayrollDto) {
    const accepted = await this.prisma.timesheet.findMany({ where: { status: { in: ['客户已验收', '待确认'] } } });
    const amount = accepted.reduce((sum, item) => sum + item.hours * 42, 0);
    const firstClient = dto.clientId ? { id: dto.clientId } : await this.prisma.client.findFirst();
    if (!firstClient) throw new NotFoundException('No client available for invoice settlement');

    const [batch, invoice] = await this.prisma.$transaction([
      this.prisma.payrollBatch.create({ data: { title: dto.title ?? '自动结算批次', amount, status: '待确认' } }),
      this.prisma.invoice.create({ data: { clientId: firstClient.id, amount: Math.round(amount * (dto.serviceFeeRate ?? 1.25)), status: '待开票' } })
    ]);
    await this.audit('payroll', `根据 ${accepted.length} 条工时生成薪酬批次与客户账单`);
    return { batch, invoice };
  }

  private async resolveClient(clientId?: string, clientName?: string) {
    if (clientId) {
      const client = await this.prisma.client.findUnique({ where: { id: clientId } });
      if (client) return client;
    }

    if (clientName) {
      const client = await this.prisma.client.findFirst({ where: { name: clientName } });
      if (client) return client;
    }

    const fallback = await this.prisma.client.findFirst();
    if (!fallback) throw new NotFoundException('No client available for demand creation');
    return fallback;
  }

  private async audit(module: string, message: string) {
    const tenant = await this.ensureTenant();
    await this.prisma.auditEvent.create({
      data: { tenantId: tenant.id, module, message }
    });
  }

  private async ensureTenant() {
    const tenant = await this.prisma.tenant.findFirst();
    if (tenant) return tenant;

    return this.prisma.tenant.create({
      data: { id: DEFAULT_TENANT_ID, name: 'FlexForce Enterprise', plan: 'Enterprise', region: 'CN-East' }
    });
  }
}
