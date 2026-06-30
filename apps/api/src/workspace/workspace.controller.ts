import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { Scenario, WorkspaceSnapshot } from '@flexforce/shared';
import { WorkspaceService } from './workspace.service';

@ApiTags('workspace')
@Controller()
export class WorkspaceController {
  constructor(private readonly workspace: WorkspaceService) {}

  @Get('workspace')
  @ApiOkResponse({ description: '工作台聚合数据（指标、场景、矩阵、Loop 等）' })
  snapshot(): Promise<WorkspaceSnapshot> {
    return this.workspace.snapshot();
  }

  @Get('scenarios')
  @ApiOkResponse({ description: '高峰场景列表' })
  scenarios(): Promise<Scenario[]> {
    return this.workspace.scenarios();
  }
}
