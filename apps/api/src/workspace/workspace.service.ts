import { Injectable } from '@nestjs/common';
import type { LoopGroup, RiskLevel, Scenario, WorkspaceSnapshot } from '@flexforce/shared';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkspaceService {
  constructor(private readonly prisma: PrismaService) {}

  async snapshot(): Promise<WorkspaceSnapshot> {
    const order = { orderBy: { order: 'asc' as const } };
    const [
      setting,
      scenarios,
      matchRows,
      slots,
      rules,
      approval,
      employees,
      loops,
      risk,
      integrations,
      exec,
      commands,
    ] = await Promise.all([
      this.prisma.workspaceSetting.findUnique({ where: { id: 'default' } }),
      this.prisma.scenario.findMany(order),
      this.prisma.matchRow.findMany(order),
      this.prisma.deliverySlot.findMany(order),
      this.prisma.complianceRule.findMany(order),
      this.prisma.approvalStep.findMany(order),
      this.prisma.employeeProfile.findMany(order),
      this.prisma.loopCard.findMany(order),
      this.prisma.riskHeatCell.findMany(order),
      this.prisma.integrationStatus.findMany(order),
      this.prisma.executiveMetric.findMany(order),
      this.prisma.commandSuggestion.findMany(order),
    ]);

    return {
      automationSavingsHours: setting?.automationSavingsHours ?? 0,
      executiveMetrics: exec.map((m) => ({ label: m.label, value: m.value, delta: m.delta })),
      scenarios: scenarios.map((s) => ({ id: s.id, label: s.label, need: s.need, sla: s.sla })),
      matchingMatrix: matchRows.map((m) => ({
        name: m.name,
        role: m.role,
        score: m.score,
        reason: m.reason,
      })),
      deliveryPlanner: slots.map((d) => ({
        window: d.window,
        label: d.label,
        coverage: d.coverage,
        note: d.note,
      })),
      complianceRules: rules.map((r) => r.text),
      approvalFlow: approval.map((a) => a.label),
      employeeProfiles: employees.map((e) => ({
        code: e.code,
        name: e.name,
        role: e.role,
        matchScore: e.matchScore,
        note: e.note,
      })),
      loops: loops.map((l) => ({
        group: l.group as LoopGroup,
        code: l.code,
        title: l.title,
        metric: l.metric,
        note: l.note,
      })),
      riskHeatmap: risk.map((r) => ({
        label: r.label,
        level: r.level as RiskLevel,
        count: r.count,
      })),
      integrationHealth: integrations.map((s) => ({
        name: s.name,
        uptime: s.uptime,
        status: s.status,
      })),
      commandSuggestions: commands.map((c) => c.text),
    };
  }

  async scenarios(): Promise<Scenario[]> {
    const rows = await this.prisma.scenario.findMany({ orderBy: { order: 'asc' } });
    return rows.map((s) => ({ id: s.id, label: s.label, need: s.need, sla: s.sla }));
  }
}
