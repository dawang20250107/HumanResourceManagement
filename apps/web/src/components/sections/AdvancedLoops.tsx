'use client';

import { motion } from 'framer-motion';
import { useWorkspace } from '@/lib/hooks';
import { useAuditAction } from '@/lib/actions';
import { useWorkspaceUI } from '@/store/workspace-context';

export function AdvancedLoops() {
  const { data } = useWorkspace();
  const { openInsight } = useWorkspaceUI();
  const act = useAuditAction();
  const advanced = (data?.loops ?? []).filter((l) => l.group === 'advanced');
  const enterprise = (data?.loops ?? []).filter((l) => l.group === 'enterprise');

  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {advanced.map((loop, i) => (
          <motion.button
            key={loop.code}
            type="button"
            whileHover={{ y: -3 }}
            onClick={() => {
              openInsight({
                eyebrow: '高级实战模块',
                title: loop.title,
                body: '已联动组织、合同、培训、SLA、成本与审计数据，可继续下钻到责任人、规则、预算和客户影响。',
              });
              act(`打开高级模块「${loop.title}」`);
            }}
            className="glass-card card-hover flex flex-col gap-2 p-4 text-left"
          >
            <span className="text-[11px] font-semibold text-[var(--text-faint)]">{loop.code}</span>
            <strong className="text-sm font-semibold">{loop.title}</strong>
            <b className="text-xs font-medium text-[var(--text-muted)]">{loop.metric}</b>
            <em className="not-italic text-[11px] text-[var(--text-faint)]">{loop.note}</em>
            <span className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: `${62 + i * 7}%` }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
                className="block h-full rounded-full bg-brand-gradient"
              />
            </span>
          </motion.button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {enterprise.map((loop) => (
          <article
            key={loop.code}
            className="glass-card card-hover flex flex-col gap-2 p-5"
            style={{ background: 'linear-gradient(160deg, rgba(99,102,241,0.1), rgba(255,255,255,0.02))' }}
          >
            <span className="text-[11px] font-semibold text-[var(--text-faint)]">{loop.code}</span>
            <h3 className="text-base font-semibold">{loop.title}</h3>
            <strong className="text-sm gradient-text">{loop.metric}</strong>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">{loop.note}</p>
            <button
              type="button"
              onClick={() => {
                openInsight({
                  eyebrow: '企业级能力',
                  title: loop.title,
                  body: '已进入顶级 HR 系统的企业治理视角：质量、留存、市场供给、全球主体与安全运营统一联动。',
                });
                act(`下钻企业级能力「${loop.title}」`);
              }}
              className="btn btn-secondary mt-1 w-fit"
            >
              下钻分析
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
