import { Injectable, NotFoundException } from '@nestjs/common';
import type { ModuleDetail, ModuleKey, ModuleSummary } from '@flexforce/shared';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ModulesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ModuleSummary[]> {
    const modules = await this.prisma.module.findMany({ orderBy: { order: 'asc' } });
    return modules.map((m) => ({
      key: m.key as ModuleKey,
      title: m.title,
      intent: m.intent,
      description: m.description,
      order: m.order,
    }));
  }

  async findOne(key: string): Promise<ModuleDetail> {
    const module = await this.prisma.module.findUnique({
      where: { key },
      include: {
        metrics: { orderBy: { order: 'asc' } },
        actions: { orderBy: { order: 'asc' } },
        pipeline: { orderBy: { order: 'asc' } },
        records: { orderBy: { order: 'asc' } },
      },
    });
    if (!module) {
      throw new NotFoundException(`未找到模块「${key}」`);
    }
    return {
      key: module.key as ModuleKey,
      title: module.title,
      intent: module.intent,
      description: module.description,
      order: module.order,
      metrics: module.metrics.map((m) => ({
        label: m.label,
        value: m.value,
        delta: m.delta,
        detail: m.detail,
      })),
      actions: module.actions.map((a) => a.label),
      pipeline: module.pipeline.map((p) => p.label),
      records: module.records.map((r) => ({
        id: r.id,
        name: r.name,
        value: r.value,
        status: r.status,
      })),
    };
  }
}
