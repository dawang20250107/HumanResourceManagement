import type { AuditEvent, Client, Demand, Invoice, PayrollBatch, Shift, Tenant, Timesheet, Worker } from '../types';

export interface WorkforceSnapshot {
  tenant: Tenant | null;
  clients: Client[];
  demands: Demand[];
  workers: Worker[];
  shifts: Shift[];
  timesheets: Timesheet[];
  payroll: PayrollBatch[];
  invoices: Invoice[];
  audit: AuditEvent[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    ...init
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `API request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const workforceApi = {
  snapshot: () => request<WorkforceSnapshot>('/workforce/snapshot'),
  createDemand: (payload: { clientName?: string; title: string; role: string; city: string; headcount: number; budgetPerHour: number }) =>
    request<Demand>('/workforce/demands', { method: 'POST', body: JSON.stringify(payload) }),
  advanceDemand: (id: string) => request<Demand>(`/workforce/demands/${id}/advance`, { method: 'POST' }),
  scheduleDemand: (id: string) => request<Shift>(`/workforce/demands/${id}/schedule`, { method: 'POST', body: JSON.stringify({}) }),
  settle: () => request<{ batch: PayrollBatch; invoice: Invoice }>('/workforce/settlements', { method: 'POST', body: JSON.stringify({}) })
};
