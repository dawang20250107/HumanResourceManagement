import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { ModuleDetail, ModuleSummary } from '@flexforce/shared';
import { ModulesService } from './modules.service';

@ApiTags('modules')
@Controller('modules')
export class ModulesController {
  constructor(private readonly modules: ModulesService) {}

  @Get()
  @ApiOkResponse({ description: '所有工作台模块（用于导航）' })
  findAll(): Promise<ModuleSummary[]> {
    return this.modules.findAll();
  }

  @Get(':key')
  @ApiOkResponse({ description: '单个模块的完整工作台数据' })
  findOne(@Param('key') key: string): Promise<ModuleDetail> {
    return this.modules.findOne(key);
  }
}
