/**
 * Seeds PostgreSQL from the canonical @flexforce/shared dataset.
 * Run with: pnpm --filter @flexforce/api prisma:seed
 */
import { PrismaClient } from '@prisma/client';
import { MODULES, WORKSPACE, INITIAL_AUDIT_MESSAGES } from '@flexforce/shared';

const prisma = new PrismaClient();

async function main() {
  // Clear in FK-safe order so reseeding is deterministic.
  await prisma.$transaction([
    prisma.metric.deleteMany(),
    prisma.moduleAction.deleteMany(),
    prisma.pipelineStep.deleteMany(),
    prisma.demoRecord.deleteMany(),
    prisma.module.deleteMany(),
    prisma.auditLog.deleteMany(),
    prisma.demand.deleteMany(),
    prisma.client.deleteMany(),
    prisma.tenant.deleteMany(),
    prisma.scenario.deleteMany(),
    prisma.matchRow.deleteMany(),
    prisma.deliverySlot.deleteMany(),
    prisma.complianceRule.deleteMany(),
    prisma.approvalStep.deleteMany(),
    prisma.employeeProfile.deleteMany(),
    prisma.loopCard.deleteMany(),
    prisma.riskHeatCell.deleteMany(),
    prisma.integrationStatus.deleteMany(),
    prisma.executiveMetric.deleteMany(),
    prisma.commandSuggestion.deleteMany(),
    prisma.workspaceSetting.deleteMany(),
  ]);

  // ── Tenant ─────────────────────────────────────────────
  const tenant = await prisma.tenant.create({
    data: { name: 'FlexForce 旗舰租户', slug: 'flexforce', region: '华东' },
  });

  // ── Modules + nested content ───────────────────────────
  for (const mod of MODULES) {
    await prisma.module.create({
      data: {
        key: mod.key,
        title: mod.title,
        intent: mod.intent,
        description: mod.description,
        order: mod.order,
        metrics: {
          create: mod.metrics.map((m, order) => ({ ...m, order })),
        },
        actions: {
          create: mod.actions.map((label, order) => ({ label, order })),
        },
        pipeline: {
          create: mod.pipeline.map((label, order) => ({ label, order })),
        },
        records: {
          create: mod.records.map((r, order) => ({
            id: r.id,
            name: r.name,
            value: r.value,
            status: r.status,
            order,
          })),
        },
      },
    });
  }

  // ── Clients derived from the demand module records ─────
  const demandModule = MODULES.find((m) => m.key === 'demand');
  if (demandModule) {
    await prisma.client.createMany({
      data: demandModule.records.map((r, i) => ({
        tenantId: tenant.id,
        name: r.name,
        tier: i === 0 ? 'A' : 'B',
        city: '上海',
      })),
    });
  }

  // ── Seed a couple of live demands ──────────────────────
  await prisma.demand.createMany({
    data: [
      { tenantId: tenant.id, client: '盒马华东仓', role: '仓配夜班', headcount: 42, city: '上海', status: '待排班', slaRisk: '低' },
      { tenantId: tenant.id, client: '连锁茶饮 A', role: '门店周末班', headcount: 186, city: '杭州', status: '排班中', slaRisk: '中' },
    ],
  });

  // ── Audit trail ────────────────────────────────────────
  for (let i = 0; i < INITIAL_AUDIT_MESSAGES.length; i++) {
    await prisma.auditLog.create({
      data: {
        tenantId: tenant.id,
        message: INITIAL_AUDIT_MESSAGES[i],
        // stagger timestamps so ordering is stable
        createdAt: new Date(Date.now() - (INITIAL_AUDIT_MESSAGES.length - i) * 60_000),
      },
    });
  }

  // ── Workspace reference data ───────────────────────────
  await prisma.workspaceSetting.create({
    data: { id: 'default', automationSavingsHours: WORKSPACE.automationSavingsHours },
  });

  await prisma.scenario.createMany({
    data: WORKSPACE.scenarios.map((s, order) => ({ ...s, order })),
  });
  await prisma.matchRow.createMany({
    data: WORKSPACE.matchingMatrix.map((m, order) => ({ ...m, order })),
  });
  await prisma.deliverySlot.createMany({
    data: WORKSPACE.deliveryPlanner.map((d, order) => ({ ...d, order })),
  });
  await prisma.complianceRule.createMany({
    data: WORKSPACE.complianceRules.map((text, order) => ({ text, order })),
  });
  await prisma.approvalStep.createMany({
    data: WORKSPACE.approvalFlow.map((label, order) => ({ label, order })),
  });
  await prisma.employeeProfile.createMany({
    data: WORKSPACE.employeeProfiles.map((e, order) => ({ ...e, order })),
  });
  await prisma.loopCard.createMany({
    data: WORKSPACE.loops.map((l, order) => ({ ...l, order })),
  });
  await prisma.riskHeatCell.createMany({
    data: WORKSPACE.riskHeatmap.map((r, order) => ({ ...r, order })),
  });
  await prisma.integrationStatus.createMany({
    data: WORKSPACE.integrationHealth.map((s, order) => ({ ...s, order })),
  });
  await prisma.executiveMetric.createMany({
    data: WORKSPACE.executiveMetrics.map((m, order) => ({ ...m, order })),
  });
  await prisma.commandSuggestion.createMany({
    data: WORKSPACE.commandSuggestions.map((text, order) => ({ text, order })),
  });

  console.log(`✅ Seeded ${MODULES.length} modules, workspace reference data, and tenant "${tenant.name}".`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
