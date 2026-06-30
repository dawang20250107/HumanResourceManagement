import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class PayrollEstimateDto {
  @ApiProperty({ example: 42, description: '时薪（元）' })
  @IsNumber()
  @Min(0)
  @Max(100000)
  rate!: number;

  @ApiProperty({ example: 168, description: '工时（小时）' })
  @IsNumber()
  @Min(0)
  @Max(100000)
  hours!: number;
}
