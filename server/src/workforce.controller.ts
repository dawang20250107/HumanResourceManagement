import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WorkforceService } from './workforce.service';

@Controller('workforce')
export class WorkforceController {
  constructor(private readonly workforce: WorkforceService) {}

  @Get('snapshot') snapshot() { return this.workforce.snapshot(); }
  @Post('demands') createDemand(@Body() body: { clientId: string; title: string; role: string; city: string; headcount: number; budgetPerHour: number }) { return this.workforce.createDemand(body); }
  @Post('demands/:id/advance') advanceDemand(@Param('id') id: string) { return this.workforce.advanceDemand(id); }
  @Post('demands/:id/schedule') scheduleDemand(@Param('id') id: string) { return this.workforce.scheduleDemand(id); }
  @Post('settlements') settle() { return this.workforce.settle(); }
}
