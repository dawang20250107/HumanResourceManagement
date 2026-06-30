'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWorkspace } from '@/lib/hooks';
import { useAuditAction } from '@/lib/actions';

export function DeliveryPlanner({ moduleTitle }: { moduleTitle: string }) {
  const { data: workspace } = useWorkspace();
  const slots = workspace?.deliveryPlanner ?? [];
  const rules = workspace?.complianceRules ?? [];
  const [status, setStatus] = useState('等待生成跨模块履约计划。');
  const act = useAuditAction();

  const generate = () => {
    setStatus('已生成履约计划：补员 42 人、主管复核 3 条、客户验收节点 12 个、预计毛利 +1.6%。');
    act(`生成「${moduleTitle}」跨模块履约计划`, '已生成履约计划');
  };

  return (
    <section className="glass-card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold">履约计划编排器</h3>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            把需求、人员、班次、规则和客户 SLA 放到同一张作战图中。
          </p>
        </div>
        <button type="button" onClick={generate} className="btn btn-secondary shrink-0">
          一键生成履约计划
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {slots.map((slot, i) => (
          <div key={slot.window} className="flex items-center gap-3">
            <span className="w-24 shrink-0 font-mono text-xs text-[var(--text-faint)]">
              {slot.window}
            </span>
            <strong className="w-28 shrink-0 text-sm">{slot.label}</strong>
            <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${slot.coverage}%` }}
                transition={{ delay: i * 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-brand-gradient"
              />
            </div>
            <em className="w-28 shrink-0 not-italic text-right text-xs text-[var(--text-muted)]">
              {slot.coverage}% · {slot.note}
            </em>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {rules.map((rule) => (
          <span key={rule} className="chip">
            {rule}
          </span>
        ))}
      </div>

      <p className="mt-3 text-xs text-[var(--text-muted)]">{status}</p>
    </section>
  );
}
