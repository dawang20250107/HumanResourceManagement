import { Module } from '@nestjs/common';
import { AuditModule } from '../audit/audit.module';
import { DemandsController } from './demands.controller';
import { DemandsService } from './demands.service';

@Module({
  imports: [AuditModule],
  controllers: [DemandsController],
  providers: [DemandsService],
})
export class DemandsModule {}
