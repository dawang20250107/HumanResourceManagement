import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { WorkforceController } from './workforce.controller';
import { WorkforceService } from './workforce.service';

@Module({ controllers: [WorkforceController], providers: [PrismaService, WorkforceService] })
export class AppModule {}
