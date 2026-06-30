import { Injectable } from '@nestjs/common';
import type { AuditEvent } from '@flexforce/shared';
import { PrismaService } from '../prisma/prisma.service';
import { TenantService } from '../common/tenant.service';

@Injectable()
export class AuditService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenants: TenantService,
  ) {}

  async list(limit = 20): Promise<AuditEvent[]> {
    const rows = await this.prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return rows.map((r) => ({ id: r.id, at: r.createdAt.toISOString(), message: r.message }));
  }

  async append(message: string): Promise<AuditEvent> {
    const tenantId = await this.tenants.defaultTenantId();
    const row = await this.prisma.auditLog.create({ data: { tenantId, message } });
    return { id: row.id, at: row.createdAt.toISOString(), message: row.message };
  }
}
