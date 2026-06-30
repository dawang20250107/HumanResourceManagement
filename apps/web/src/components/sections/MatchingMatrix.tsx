'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWorkspace } from '@/lib/hooks';
import { useAuditAction } from '@/lib/actions';

export function MatchingMatrix({ moduleTitle }: { moduleTitle: string }) {
  const { data: workspace } = useWorkspace();
  const rows = workspace?.matchingMatrix ?? [];
  const [status, setStatus] = useState('点击模拟后，将评估成本、覆盖率与 SLA 风险。');
  const act = useAuditAction();

  const simulate = () => {
    setStatus('模拟完成：覆盖率 +3.8%，小时成本 -¥2.4，SLA 风险降低到低。');
    act(`模拟「${moduleTitle}」最优匹配方案`, '已生成最优匹配模拟');
  };

  return (
    <section className="glass-card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold">AI 人岗匹配矩阵</h3>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            按技能、距离、偏好、历史履约、成本和合规约束生成可解释匹配分。
          </p>
        </div>
        <button type="button" onClick={simulate} className="btn btn-secondary shrink-0">
          模拟最优方案
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {rows.map((row, i) => (
          <motion.div
            key={row.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
          >
            <span className="w-16 text-sm font-semibold">{row.name}</span>
            <strong className="text-sm text-[var(--text-muted)]">{row.role}</strong>
            <span className="ml-auto grid h-9 w-9 place-items-center rounded-lg bg-brand-gradient text-sm font-bold text-white">
              {row.score}
            </span>
            <em className="hidden flex-1 not-italic text-xs text-[var(--text-faint)] sm:block">
              {row.reason}
            </em>
          </motion.div>
        ))}
      </div>

      <p className="mt-3 text-xs text-[var(--text-muted)]">{status}</p>
    </section>
  );
}
