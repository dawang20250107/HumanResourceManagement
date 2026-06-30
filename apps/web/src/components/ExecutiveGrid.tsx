'use client';

import { motion } from 'framer-motion';
import { useWorkspace } from '@/lib/hooks';
import { deltaTone, parseMetricValue } from '@/lib/format';
import { AnimatedNumber } from './AnimatedNumber';

const toneText: Record<'up' | 'down' | 'flat', string> = {
  up: 'text-emerald-300',
  down: 'text-rose-300',
  flat: 'text-sky-300',
};

export function ExecutiveGrid() {
  const { data } = useWorkspace();
  const metrics = data?.executiveMetrics ?? [];

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="关键经营指标">
      {metrics.map((m, i) => {
        const parsed = parseMetricValue(m.value);
        const tone = deltaTone(m.delta);
        return (
          <motion.article
            key={m.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card card-hover flex flex-col gap-1.5 p-5"
          >
            <span className="text-xs text-[var(--text-muted)]">{m.label}</span>
            <strong className="text-[26px] font-bold tracking-tight">
              {parsed.number === null ? (
                m.value
              ) : (
                <>
                  {parsed.prefix}
                  <AnimatedNumber value={parsed.number} decimals={parsed.decimals} />
                  {parsed.suffix}
                </>
              )}
            </strong>
            <span className={`text-xs font-semibold ${toneText[tone]}`}>{m.delta}</span>
          </motion.article>
        );
      })}
    </section>
  );
}
