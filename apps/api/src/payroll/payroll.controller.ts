import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { PayrollEstimateResult } from '@flexforce/shared';
import { PayrollEstimateDto } from './dto/payroll-estimate.dto';

@ApiTags('payroll')
@Controller('payroll')
export class PayrollController {
  @Post('estimate')
  @ApiOkResponse({ description: '薪酬沙盘：按时薪 × 工时估算应发' })
  estimate(@Body() dto: PayrollEstimateDto): PayrollEstimateResult {
    const amount = Math.round(dto.rate * dto.hours);
    return {
      rate: dto.rate,
      hours: dto.hours,
      amount,
      formatted: `¥${amount.toLocaleString('zh-CN')}`,
    };
  }
}
