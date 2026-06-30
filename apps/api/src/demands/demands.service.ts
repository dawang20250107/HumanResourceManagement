import { Injectable } from '@nestjs/common';
import type { Demand, RiskLevel } from '@flexforce/shared';
import { PrismaService } from '../prisma/prisma.service';
import { TenantService } from '../common/tenant.service';
import { AuditService } from '../audit/audit.service';
import type { CreateDemandDto } from './dto/create-demand.dto';

@Injectable()
export class DemandsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenants: TenantService,
    private readonly audit: AuditService,
  ) {}

  private toDemand(row: {
    id: string;
    client: string;
    role: string;
    headcount: number;
    city: string;
    status: string;
    slaRisk: string;
    createdAt: Date;
  }): Demand {
    return {
      id: row.id,
      client: row.client,
      role: row.role,
      headcount: row.headcount,
      city: row.city,
      status: row.status,
      slaRisk: row.slaRisk as RiskLevel,
      createdAt: row.createdAt.toISOString(),
    };
  }

  async list(): Promise<Demand[]> {
    const rows = await this.prisma.demand.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map((r) => this.toDemand(r));
  }

  async create(dto: CreateDemandDto): Promise<Demand> {
    const tenantId = await this.tenants.defaultTenantId();
    // Naive SLA heuristic: larger asks carry more delivery risk.
    const slaRisk: RiskLevel = dto.headcount >= 200 ? '高' : dto.headcount >= 80 ? '中' : '低';
    const row = await this.prisma.demand.create({
      data: {
        tenantId,
        client: dto.client,
        role: dto.role,
        headcount: dto.headcount,
        city: dto.city,
        status: '待排班',
        slaRisk,
      },
    });
    await this.audit.append(`创建 ${dto.client} ${dto.role} ${dto.headcount} 人需求`);
    return this.toDemand(row);
  }
}
