'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useWorkspaceUI } from '@/store/workspace-context';
import { Icon } from './icons';

export function Toaster() {
  const { toasts } = useWorkspaceUI();

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[60] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="glass pointer-events-auto flex items-center gap-2.5 rounded-xl border border-[var(--border-strong)] px-4 py-3 text-sm shadow-glass"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-gradient text-white">
              <Icon name="check" className="h-3 w-3" />
            </span>
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
