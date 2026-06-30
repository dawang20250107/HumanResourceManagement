'use client';

import { motion } from 'framer-motion';
import type { Metric } from '@flexforce/shared';
import { deltaTone, parseMetricValue } from '@/lib/format';
import { AnimatedNumber } from './AnimatedNumber';

const toneStyles: Record<'up' | 'down' | 'flat', string> = {
  up: 'text-emerald-300 bg-emerald-400/10',
  down: 'text-rose-300 bg-rose-400/10',
  flat: 'text-sky-300 bg-sky-400/10',
};

export function MetricCard({
  metric,
  index,
  onOpen,
}: {
  metric: Metric;
  index: number;
  onOpen: () => void;
}) {
  const parsed = parseMetricValue(metric.value);
  const tone = deltaTone(metric.delta);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      className="glass-card card-hover relative flex flex-col gap-2 overflow-hidden p-5 text-left"
    >
      <span
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.5), transparent 70%)' }}
      />
      <span className="text-sm text-[var(--text-muted)]">{metric.label}</span>
      <strong className="text-3xl font-bold tracking-tight">
        {parsed.number === null ? (
          metric.value
        ) : (
          <>
            {parsed.prefix}
            <AnimatedNumber value={parsed.number} decimals={parsed.decimals} />
            {parsed.suffix}
          </>
        )}
      </strong>
      <span className={`w-fit rounded-full px-2 py-0.5 text-xs font-semibold ${toneStyles[tone]}`}>
        {metric.delta}
      </span>
      <small className="text-xs text-[var(--text-faint)]">{metric.detail}</small>
    </motion.button>
  );
}
