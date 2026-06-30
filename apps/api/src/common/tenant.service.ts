import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/** Resolves the active tenant. A real build would derive this from auth/JWT;
 * the demo uses the single seeded tenant. */
@Injectable()
export class TenantService {
  constructor(private readonly prisma: PrismaService) {}

  async defaultTenantId(): Promise<string> {
    const tenant = await this.prisma.tenant.findFirst({ orderBy: { createdAt: 'asc' } });
    if (!tenant) {
      throw new NotFoundException('尚未初始化租户，请先运行 prisma:seed。');
    }
    return tenant.id;
  }
}
