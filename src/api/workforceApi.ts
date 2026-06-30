import type { Demand } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, { headers: { 'Content-Type': 'application/json' }, ...init });
  if (!response.ok) throw new Error(`API ${response.status}: ${response.statusText}`);
  return response.json() as Promise<T>;
}

export const workforceApi = {
  snapshot: () => request('/workforce/snapshot'),
  createDemand: (demand: Omit<Demand, 'id' | 'status'>) => request<Demand>('/workforce/demands', { method: 'POST', body: JSON.stringify(demand) }),
  advanceDemand: (id: string) => request<Demand>(`/workforce/demands/${id}/advance`, { method: 'POST' }),
  scheduleDemand: (id: string) => request(`/workforce/demands/${id}/schedule`, { method: 'POST' }),
  settle: () => request('/workforce/settlements', { method: 'POST' })
};
