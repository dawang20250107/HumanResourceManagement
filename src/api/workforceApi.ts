import type { ApprovalStatus, AuditEvent, Client, Demand, Invoice, PayrollBatch, Shift, Tenant, Timesheet, Worker } from '../types';

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

interface ApiDemand extends Omit<Demand, 'status'> {
  status: string;
}

interface ApiAuditEvent extends AuditEvent {
  createdAt?: string;
}

interface ApiSnapshot extends Omit<WorkforceSnapshot, 'demands' | 'audit'> {
  demands: ApiDemand[];
  audit: ApiAuditEvent[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

const statusLabels: Record<string, ApprovalStatus> = {
  QUOTING: '待报价',
  APPROVAL: '待审批',
  SCHEDULING: '待排班',
  IN_PROGRESS: '履约中',
  COMPLETED: '已完成'
};

function normalizeStatus(status: string): ApprovalStatus {
  return statusLabels[status] ?? (status as ApprovalStatus);
}

function normalizeDemand(demand: ApiDemand): Demand {
  return { ...demand, status: normalizeStatus(demand.status) };
}

function normalizeAudit(event: ApiAuditEvent): AuditEvent {
  return {
    ...event,
    at: event.at ?? (event.createdAt ? new Date(event.createdAt).toLocaleString('zh-CN', { hour12: false }) : undefined)
  };
}

function normalizeSnapshot(snapshot: ApiSnapshot): WorkforceSnapshot {
  return {
    ...snapshot,
    demands: snapshot.demands.map(normalizeDemand),
    audit: snapshot.audit.map(normalizeAudit)
  };
}

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
  snapshot: async () => normalizeSnapshot(await request<ApiSnapshot>('/workforce/snapshot')),
  createDemand: async (payload: { clientName?: string; title: string; role: string; city: string; headcount: number; budgetPerHour: number }) =>
    normalizeDemand(await request<ApiDemand>('/workforce/demands', { method: 'POST', body: JSON.stringify(payload) })),
  advanceDemand: async (id: string) => normalizeDemand(await request<ApiDemand>(`/workforce/demands/${id}/advance`, { method: 'POST' })),
  scheduleDemand: (id: string) => request<Shift>(`/workforce/demands/${id}/schedule`, { method: 'POST', body: JSON.stringify({}) }),
  settle: () => request<{ batch: PayrollBatch; invoice: Invoice }>('/workforce/settlements', { method: 'POST', body: JSON.stringify({}) })
};
