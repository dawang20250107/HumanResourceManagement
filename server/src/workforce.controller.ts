import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateDemandDto, ScheduleDemandDto, SettlePayrollDto } from './workforce.dto';
import { WorkforceService } from './workforce.service';

@Controller('workforce')
export class WorkforceController {
  constructor(private readonly workforce: WorkforceService) {}

  @Get('snapshot')
  snapshot() {
    return this.workforce.snapshot();
  }

  @Post('demands')
  createDemand(@Body() body: CreateDemandDto) {
    return this.workforce.createDemand(body);
  }

  @Post('demands/:id/advance')
  advanceDemand(@Param('id') id: string) {
    return this.workforce.advanceDemand(id);
  }

  @Post('demands/:id/schedule')
  scheduleDemand(@Param('id') id: string, @Body() body: ScheduleDemandDto) {
    return this.workforce.scheduleDemand(id, body);
  }

  @Post('settlements')
  settle(@Body() body: SettlePayrollDto) {
    return this.workforce.settle(body);
  }
}
