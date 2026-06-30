'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ModuleKey } from '@flexforce/shared';
import { api } from './api';
import { fallbackAudit, fallbackModule, fallbackModules, fallbackWorkspace } from './fallback';

/** Wraps an API call so a network failure degrades to the seeded snapshot
 * instead of throwing — the workspace is always renderable. */
async function withFallback<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export const queryKeys = {
  modules: ['modules'] as const,
  module: (key: string) => ['module', key] as const,
  workspace: ['workspace'] as const,
  audit: ['audit'] as const,
  demands: ['demands'] as const,
};

export function useModules() {
  return useQuery({
    queryKey: queryKeys.modules,
    queryFn: () => withFallback(api.modules, fallbackModules),
    staleTime: 5 * 60 * 1000,
  });
}

export function useModule(key: ModuleKey) {
  return useQuery({
    queryKey: queryKeys.module(key),
    queryFn: () => withFallback(() => api.module(key), fallbackModule(key)),
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  });
}

export function useWorkspace() {
  return useQuery({
    queryKey: queryKeys.workspace,
    queryFn: () => withFallback(api.workspace, fallbackWorkspace),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAudit() {
  return useQuery({
    queryKey: queryKeys.audit,
    queryFn: () => withFallback(() => api.audit(8), fallbackAudit),
    staleTime: 30 * 1000,
  });
}

export function useAppendAudit() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (message: string) => api.appendAudit(message),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.audit }),
  });
}

export function useCreateDemand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { client: string; role: string; headcount: number; city: string }) =>
      api.createDemand(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.demands });
      qc.invalidateQueries({ queryKey: queryKeys.audit });
    },
  });
}

export function usePayrollEstimate() {
  return useMutation({
    mutationFn: ({ rate, hours }: { rate: number; hours: number }) =>
      api.payrollEstimate(rate, hours),
  });
}

export function useCommandSuggestions(query: string) {
  return useQuery({
    queryKey: ['command', query],
    queryFn: () =>
      withFallback(
        () => api.commandSuggestions(query),
        fallbackWorkspace.commandSuggestions.filter((s) => !query || s.includes(query)),
      ),
    staleTime: 60 * 1000,
  });
}
