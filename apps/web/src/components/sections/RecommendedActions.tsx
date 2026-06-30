'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuditAction } from '@/lib/actions';
import { Icon } from '../icons';

export function RecommendedActions({
  actions,
  moduleTitle,
}: {
  actions: string[];
  moduleTitle: string;
}) {
  const [done, setDone] = useState<Set<number>>(new Set());
  const act = useAuditAction();

  const toggle = (i: number) => {
    setDone((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
    act(`更新「${moduleTitle}」推荐动作状态`);
  };

  return (
    <section className="glass-card p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold">下一步推荐动作</h3>
        <p className="mt-1 text-xs text-[var(--text-muted)]">
          系统按影响范围、时效、毛利和风险自动排序，运营主管可一键派发。
        </p>
      </div>
      <ul className="flex flex-col gap-2">
        {actions.map((action, i) => {
          const checked = done.has(i);
          return (
            <li key={action} className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-label={`完成动作 ${i + 1}`}
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg border transition-colors focus-ring ${
                  checked
                    ? 'border-transparent bg-brand-gradient text-white'
                    : 'border-[var(--border-strong)] text-transparent hover:border-brand-indigo'
                }`}
              >
                <Icon name="check" className="h-3.5 w-3.5" />
              </button>
              <motion.span
                animate={{
                  opacity: checked ? 0.45 : 1,
                  textDecorationLine: checked ? 'line-through' : 'none',
                }}
                className="text-sm"
              >
                {action}
              </motion.span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
