import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { id: 'tenant-flexforce-demo' },
    update: {},
    create: { id: 'tenant-flexforce-demo', name: 'FlexForce Enterprise', plan: 'Enterprise', region: 'CN-East' }
  });

  const client = await prisma.client.upsert({
    where: { id: 'client-hem-east' },
    update: {},
    create: { id: 'client-hem-east', tenantId: tenant.id, name: '盒马华东仓', industry: '仓配', sla: 97.4 }
  });

  await prisma.worker.upsert({
    where: { id: 'worker-001' },
    update: {},
    create: { id: 'worker-001', name: '张伟', city: '上海', skills: ['仓配', '夜班'], matchScore: 96, status: '可上岗' }
  });

  await prisma.demand.upsert({
    where: { id: 'demand-001' },
    update: {},
    create: {
      id: 'demand-001',
      clientId: client.id,
      title: '上海仓配夜班补员',
      role: '仓配夜班',
      city: '上海',
      headcount: 42,
      budgetPerHour: 42
    }
  });

  await prisma.auditEvent.create({
    data: { tenantId: tenant.id, module: 'admin', message: 'Prisma seed 初始化多租户、客户、员工与需求数据' }
  });
}

main()
  .finally(async () => prisma.$disconnect());
