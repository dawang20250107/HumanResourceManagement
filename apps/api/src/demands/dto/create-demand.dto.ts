import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, Min, MaxLength, MinLength } from 'class-validator';

export class CreateDemandDto {
  @ApiProperty({ example: '盒马华东仓' })
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  client!: string;

  @ApiProperty({ example: '仓配夜班' })
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  role!: string;

  @ApiProperty({ example: 42, minimum: 1, maximum: 100000 })
  @IsInt()
  @Min(1)
  @Max(100000)
  headcount!: number;

  @ApiProperty({ example: '上海' })
  @IsString()
  @MinLength(1)
  @MaxLength(60)
  city!: string;
}
