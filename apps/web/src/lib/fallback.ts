/**
 * Static fallbacks sourced from @flexforce/shared. If the API is unreachable
 * (e.g. the web app is opened before the NestJS service boots), the workspace
 * still renders the seeded snapshot instead of an error screen.
 */
import {
  MODULES,
  WORKSPACE,
  INITIAL_AUDIT_MESSAGES,
  type AuditEvent,
  type ModuleDetail,
  type ModuleSummary,
} from '@flexforce/shared';

export const fallbackModules: ModuleSummary[] = MODULES.map((m) => ({
  key: m.key,
  title: m.title,
  intent: m.intent,
  description: m.description,
  order: m.order,
}));

export function fallbackModule(key: string): ModuleDetail {
  return MODULES.find((m) => m.key === key) ?? MODULES[0];
}

export const fallbackWorkspace = WORKSPACE;

export const fallbackAudit: AuditEvent[] = INITIAL_AUDIT_MESSAGES.map((message, i) => ({
  id: `seed-${i}`,
  at: new Date(Date.now() - (INITIAL_AUDIT_MESSAGES.length - i) * 60_000).toISOString(),
  message,
}));
