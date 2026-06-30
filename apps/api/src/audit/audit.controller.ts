import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { AuditEvent } from '@flexforce/shared';
import { AuditService } from './audit.service';
import { CreateAuditDto } from './dto/create-audit.dto';

@ApiTags('audit')
@Controller('audit')
export class AuditController {
  constructor(private readonly audit: AuditService) {}

  @Get()
  @ApiOkResponse({ description: '最近的审计事件（倒序）' })
  list(@Query('limit') limit?: number): Promise<AuditEvent[]> {
    return this.audit.list(limit ? Number(limit) : 20);
  }

  @Post()
  @ApiOkResponse({ description: '追加一条审计事件' })
  append(@Body() dto: CreateAuditDto): Promise<AuditEvent> {
    return this.audit.append(dto.message);
  }
}
