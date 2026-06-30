import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAuditDto {
  @ApiProperty({ example: '生成华东仓配供需预测' })
  @IsString()
  @MinLength(1)
  @MaxLength(280)
  message!: string;
}
