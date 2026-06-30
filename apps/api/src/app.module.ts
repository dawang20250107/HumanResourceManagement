import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './common/common.module';
import { HealthModule } from './health/health.module';
import { ModulesContentModule } from './modules-content/modules.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { DemandsModule } from './demands/demands.module';
import { AuditModule } from './audit/audit.module';
import { PayrollModule } from './payroll/payroll.module';
import { CommandModule } from './command/command.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CommonModule,
    HealthModule,
    ModulesContentModule,
    WorkspaceModule,
    DemandsModule,
    AuditModule,
    PayrollModule,
    CommandModule,
  ],
})
export class AppModule {}
