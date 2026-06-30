import type {
  AuditEvent,
  Demand,
  ModuleDetail,
  ModuleKey,
  ModuleSummary,
  PayrollEstimateResult,
  Scenario,
  WorkspaceSnapshot,
} from '@flexforce/shared';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}/api${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`${init?.method ?? 'GET'} ${path} → ${res.status} ${text}`.trim());
  }
  return res.json() as Promise<T>;
}

export const api = {
  modules: () => request<ModuleSummary[]>('/modules'),
  module: (key: ModuleKey | string) => request<ModuleDetail>(`/modules/${key}`),
  workspace: () => request<WorkspaceSnapshot>('/workspace'),
  scenarios: () => request<Scenario[]>('/scenarios'),
  audit: (limit = 8) => request<AuditEvent[]>(`/audit?limit=${limit}`),
  appendAudit: (message: string) =>
    request<AuditEvent>('/audit', { method: 'POST', body: JSON.stringify({ message }) }),
  demands: () => request<Demand[]>('/demands'),
  createDemand: (input: { client: string; role: string; headcount: number; city: string }) =>
    request<Demand>('/demands', { method: 'POST', body: JSON.stringify(input) }),
  payrollEstimate: (rate: number, hours: number) =>
    request<PayrollEstimateResult>('/payroll/estimate', {
      method: 'POST',
      body: JSON.stringify({ rate, hours }),
    }),
  commandSuggestions: (q?: string) =>
    request<string[]>(`/command/suggestions${q ? `?q=${encodeURIComponent(q)}` : ''}`),
};

export { BASE_URL };
