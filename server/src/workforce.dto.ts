export class CreateDemandDto {
  clientId?: string;
  clientName?: string;
  title!: string;
  role!: string;
  city!: string;
  headcount!: number;
  budgetPerHour!: number;
}

export class ScheduleDemandDto {
  name?: string;
  window?: string;
  coverage?: number;
  workerId?: string;
  hours?: number;
}

export class SettlePayrollDto {
  title?: string;
  clientId?: string;
  serviceFeeRate?: number;
}
