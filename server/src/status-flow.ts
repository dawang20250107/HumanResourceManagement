import { ApprovalStatus } from '@prisma/client';

export const demandStatusFlow: ApprovalStatus[] = [
  ApprovalStatus.QUOTING,
  ApprovalStatus.APPROVAL,
  ApprovalStatus.SCHEDULING,
  ApprovalStatus.IN_PROGRESS,
  ApprovalStatus.COMPLETED
];

export function nextDemandStatus(status: ApprovalStatus): ApprovalStatus {
  const current = demandStatusFlow.indexOf(status);
  return demandStatusFlow[Math.min(current + 1, demandStatusFlow.length - 1)];
}
