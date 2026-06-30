import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandService } from './command.service';

@ApiTags('command')
@Controller('command')
export class CommandController {
  constructor(private readonly command: CommandService) {}

  @Get('suggestions')
  @ApiOkResponse({ description: 'AI 指挥中心命令建议（可按关键字过滤）' })
  suggestions(@Query('q') q?: string): Promise<string[]> {
    return this.command.suggestions(q);
  }
}
