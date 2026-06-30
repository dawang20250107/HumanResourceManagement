'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { ModuleKey } from '@flexforce/shared';

export interface InsightPayload {
  eyebrow: string;
  title: string;
  body: string;
}

export interface Toast {
  id: number;
  message: string;
  tone: 'default' | 'success';
}

interface WorkspaceContextValue {
  activeModule: ModuleKey;
  setActiveModule: (key: ModuleKey) => void;
  scenarioIndex: number;
  cycleScenario: (total: number) => void;
  insight: InsightPayload | null;
  openInsight: (payload: InsightPayload) => void;
  closeInsight: () => void;
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  createOpen: boolean;
  setCreateOpen: (open: boolean) => void;
  toasts: Toast[];
  pushToast: (message: string, tone?: Toast['tone']) => void;
  dismissToast: (id: number) => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

let toastSeq = 0;

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [activeModule, setActiveModule] = useState<ModuleKey>('overview');
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [insight, setInsight] = useState<InsightPayload | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (message: string, tone: Toast['tone'] = 'default') => {
      const id = ++toastSeq;
      setToasts((prev) => [...prev, { id, message, tone }]);
      setTimeout(() => dismissToast(id), 3600);
    },
    [dismissToast],
  );

  const cycleScenario = useCallback((total: number) => {
    if (total <= 0) return;
    setScenarioIndex((i) => (i + 1) % total);
  }, []);

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      activeModule,
      setActiveModule,
      scenarioIndex,
      cycleScenario,
      insight,
      openInsight: setInsight,
      closeInsight: () => setInsight(null),
      commandOpen,
      setCommandOpen,
      createOpen,
      setCreateOpen,
      toasts,
      pushToast,
      dismissToast,
    }),
    [activeModule, scenarioIndex, cycleScenario, insight, commandOpen, createOpen, toasts, pushToast, dismissToast],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspaceUI(): WorkspaceContextValue {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error('useWorkspaceUI must be used within WorkspaceProvider');
  return ctx;
}
