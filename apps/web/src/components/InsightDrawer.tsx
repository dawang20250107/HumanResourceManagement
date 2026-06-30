'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useWorkspaceUI } from '@/store/workspace-context';
import { useEscape } from '@/lib/use-escape';
import { Icon } from './icons';

export function InsightDrawer() {
  const { insight, closeInsight } = useWorkspaceUI();
  useEscape(insight !== null, closeInsight);

  return (
    <AnimatePresence>
      {insight && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeInsight}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="glass fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col gap-4 border-l border-[var(--border-strong)] p-7"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-between">
              <p className="eyebrow">{insight.eyebrow}</p>
              <button
                type="button"
                onClick={closeInsight}
                aria-label="关闭"
                className="grid h-8 w-8 place-items-center rounded-lg text-[var(--text-muted)] hover:bg-white/5 hover:text-white focus-ring"
              >
                <Icon name="close" className="h-4 w-4" />
              </button>
            </div>
            <h2 className="text-2xl font-bold leading-tight">{insight.title}</h2>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">{insight.body}</p>
            <div className="mt-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-xs text-[var(--text-faint)]">
              该洞察会同步记录到审计日志，并可继续下钻到责任人、规则、预算与客户影响。
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
