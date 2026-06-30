'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAudit } from '@/lib/hooks';
import { formatTime } from '@/lib/format';

export function AuditTimeline() {
  const { data: events = [] } = useAudit();

  return (
    <section className="glass-card p-5">
      <div className="mb-3">
        <h3 className="text-base font-semibold">实时审计与协同动态</h3>
        <p className="mt-1 text-xs text-[var(--text-muted)]">
          所有 AI 建议、批量派发、需求创建和敏感操作都会记录，满足企业级追溯。
        </p>
      </div>
      <ol className="flex flex-col gap-2.5">
        <AnimatePresence initial={false}>
          {events.map((event) => (
            <motion.li
              key={event.id}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3 text-sm"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan" />
              <span className="font-mono text-[11px] text-[var(--text-faint)]">
                {formatTime(event.at)}
              </span>
              <span className="text-[var(--text-muted)]">{event.message}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
    </section>
  );
}
