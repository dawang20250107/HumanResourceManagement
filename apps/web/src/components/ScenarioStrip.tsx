'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useWorkspace } from '@/lib/hooks';
import { useWorkspaceUI } from '@/store/workspace-context';

export function ScenarioStrip() {
  const { data: workspace } = useWorkspace();
  const { scenarioIndex } = useWorkspaceUI();
  const scenarios = workspace?.scenarios ?? [];
  if (!scenarios.length) return null;
  const scenario = scenarios[scenarioIndex % scenarios.length];

  return (
    <div
      className="glass-card flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3.5"
      aria-live="polite"
    >
      <span className="flex items-center gap-2 text-xs font-medium text-[var(--text-faint)]">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-cyan opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-cyan" />
        </span>
        实时高峰场景
      </span>
      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-x-5 gap-y-1.5"
        >
          <strong className="text-sm font-semibold">{scenario.label}</strong>
          <span className="text-sm font-semibold text-brand-cyan">{scenario.need}</span>
          <span className="chip">{scenario.sla}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
