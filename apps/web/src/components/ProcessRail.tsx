'use client';

import { motion } from 'framer-motion';
import { Icon } from './icons';

export function ProcessRail({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <motion.div
          key={step}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          className="glass card-hover flex items-center gap-2.5 rounded-xl px-3 py-2"
        >
          <b className="grid h-6 w-6 place-items-center rounded-lg bg-brand-gradient text-xs font-bold text-white">
            {i + 1}
          </b>
          <span className="text-sm text-[var(--text-muted)]">{step}</span>
          {i < steps.length - 1 && (
            <Icon name="arrow" className="h-4 w-4 text-[var(--text-faint)]" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
