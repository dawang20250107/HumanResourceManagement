'use client';

import { useAppendAudit } from './hooks';
import { useWorkspaceUI } from '@/store/workspace-context';

/** Records an audited workspace action: appends to the server audit trail and
 * shows a confirmation toast. Returns a stable callback. */
export function useAuditAction() {
  const append = useAppendAudit();
  const { pushToast } = useWorkspaceUI();
  return (auditMessage: string, toastMessage?: string) => {
    append.mutate(auditMessage);
    pushToast(toastMessage ?? auditMessage, 'success');
  };
}
