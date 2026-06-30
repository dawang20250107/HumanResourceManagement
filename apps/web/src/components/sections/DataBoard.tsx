'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ModuleRecord } from '@flexforce/shared';
import { useAuditAction } from '@/lib/actions';

export function DataBoard({
  records,
  moduleTitle,
}: {
  records: ModuleRecord[];
  moduleTitle: string;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState('请选择需要处理的业务记录。');
  const act = useAuditAction();

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const dispatch = () => {
    if (!selected.size) {
      setStatus('请先选择至少一条业务记录。');
      return;
    }
    setStatus(`已选择 ${selected.size} 条记录，AI 已生成批量派发草案。`);
    act(`批量派发 ${selected.size} 条「${moduleTitle}」记录`, `已派发 ${selected.size} 条记录`);
  };

  return (
    <section className="glass-card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold">实战数据工作区</h3>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            可选择记录、批量派发、联动 AI 建议与审计日志。
          </p>
        </div>
        <button type="button" onClick={dispatch} className="btn btn-secondary shrink-0">
          批量派发
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {records.map((record) => {
          const checked = selected.has(record.id);
          return (
            <motion.label
              key={record.id}
              whileHover={{ x: 2 }}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                checked
                  ? 'border-brand-indigo/60 bg-brand-indigo/10'
                  : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)]'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(record.id)}
                className="h-4 w-4 accent-brand-indigo"
              />
              <span className="flex-1 text-sm font-medium">{record.name}</span>
              <strong className="text-sm">{record.value}</strong>
              <em className="not-italic text-xs text-[var(--text-faint)]">{record.status}</em>
            </motion.label>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-[var(--text-muted)]">{status}</p>
    </section>
  );
}
