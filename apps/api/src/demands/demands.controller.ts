import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { Demand } from '@flexforce/shared';
import { DemandsService } from './demands.service';
import { CreateDemandDto } from './dto/create-demand.dto';

@ApiTags('demands')
@Controller('demands')
export class DemandsController {
  constructor(private readonly demands: DemandsService) {}

  @Get()
  @ApiOkResponse({ description: '已创建的用工需求列表' })
  list(): Promise<Demand[]> {
    return this.demands.list();
  }

  @Post()
  @ApiCreatedResponse({ description: '创建用工需求并写入审计日志' })
  create(@Body() dto: CreateDemandDto): Promise<Demand> {
    return this.demands.create(dto);
  }
}
