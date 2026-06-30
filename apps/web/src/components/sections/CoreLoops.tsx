'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useWorkspace, usePayrollEstimate } from '@/lib/hooks';
import { useAuditAction } from '@/lib/actions';
import { useWorkspaceUI } from '@/store/workspace-context';
import { riskColor } from '@/lib/format';

function LoopShell({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="glass-card flex flex-col gap-3 p-5">
      <div className="flex items-center gap-2">
        <span className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-[var(--text-faint)]">
          Loop {index}
        </span>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function EmployeeLoop() {
  const { data } = useWorkspace();
  const { openInsight } = useWorkspaceUI();
  const act = useAuditAction();
  return (
    <LoopShell index={1} title="员工 360 画像">
      <div className="flex flex-col gap-2">
        {(data?.employeeProfiles ?? []).map((p) => (
          <button
            key={p.code}
            type="button"
            onClick={() => {
              openInsight({
                eyebrow: '员工 360',
                title: `${p.name} · 全链路画像`,
                body: '已汇总合同、证照、培训、偏好、到岗、薪酬、风控与客户反馈，可直接进入排班或续签动作。',
              });
              act(`查看 ${p.name} 员工 360 画像`);
            }}
            className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-left transition-colors hover:border-[var(--border-strong)]"
          >
            <span className="font-mono text-[11px] text-[var(--text-faint)]">{p.code}</span>
            <strong className="text-sm">{p.name}</strong>
            <span className="ml-auto text-xs text-[var(--text-muted)]">匹配 {p.matchScore}</span>
          </button>
        ))}
      </div>
    </LoopShell>
  );
}

function ApprovalLoop({ moduleTitle }: { moduleTitle: string }) {
  const { data } = useWorkspace();
  const steps = data?.approvalFlow ?? [];
  const [step, setStep] = useState(0);
  const act = useAuditAction();

  const advance = () => {
    if (step >= steps.length - 1) return;
    setStep((s) => s + 1);
    act(`推进「${moduleTitle}」审批流`, `审批推进至：${steps[step + 1]}`);
  };

  return (
    <LoopShell index={2} title="审批流编排">
      <ol className="flex flex-col gap-1.5">
        {steps.map((label, i) => (
          <li key={label} className="flex items-center gap-2 text-sm">
            <span
              className={`grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold ${
                i <= step ? 'bg-brand-gradient text-white' : 'bg-white/5 text-[var(--text-faint)]'
              }`}
            >
              {i + 1}
            </span>
            <span className={i <= step ? '' : 'text-[var(--text-faint)]'}>{label}</span>
          </li>
        ))}
      </ol>
      <button type="button" onClick={advance} className="btn btn-secondary w-full">
        推进下一审批节点
      </button>
    </LoopShell>
  );
}

function PayrollSandbox() {
  const [rate, setRate] = useState(42);
  const [hours, setHours] = useState(168);
  const estimate = usePayrollEstimate();

  const local = useMemo(() => `¥${(rate * hours).toLocaleString('zh-CN')}`, [rate, hours]);

  useEffect(() => {
    const t = setTimeout(() => estimate.mutate({ rate, hours }), 280);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rate, hours]);

  const display = estimate.data?.formatted ?? local;

  return (
    <LoopShell index={3} title="薪酬规则沙盘">
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs text-[var(--text-muted)]">
          时薪
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value) || 0)}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-white focus-ring"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-[var(--text-muted)]">
          工时
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value) || 0)}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-white focus-ring"
          />
        </label>
      </div>
      <motion.strong
        key={display}
        initial={{ opacity: 0.4, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-2xl font-bold gradient-text"
      >
        {display}
      </motion.strong>
    </LoopShell>
  );
}

function RiskLoop() {
  const { data } = useWorkspace();
  return (
    <LoopShell index={4} title="合规风险热力图">
      <div className="grid grid-cols-2 gap-2">
        {(data?.riskHeatmap ?? []).map((cell) => (
          <div
            key={cell.label}
            className="flex flex-col gap-1 rounded-xl border px-3 py-2.5"
            style={{ borderColor: 'var(--border)', background: `${riskColor(cell.level)}1a` }}
          >
            <b className="text-[11px] font-medium text-[var(--text-muted)]">{cell.label}</b>
            <span className="flex items-baseline gap-1.5">
              <strong className="text-xl font-bold" style={{ color: riskColor(cell.level) }}>
                {cell.count}
              </strong>
              <em className="not-italic text-[11px]" style={{ color: riskColor(cell.level) }}>
                {cell.level}
              </em>
            </span>
          </div>
        ))}
      </div>
    </LoopShell>
  );
}

function IntegrationLoop() {
  const { data } = useWorkspace();
  return (
    <LoopShell index={5} title="集成健康监控">
      <div className="flex flex-col gap-2">
        {(data?.integrationHealth ?? []).map((row) => {
          const healthy = row.status === '正常';
          return (
            <div key={row.name} className="flex items-center gap-2 text-sm">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: healthy ? 'var(--success)' : 'var(--warn)' }}
              />
              <span>{row.name}</span>
              <strong className="ml-auto font-mono text-xs text-[var(--text-muted)]">
                {row.uptime}
              </strong>
              <em className="not-italic text-xs" style={{ color: healthy ? 'var(--success)' : 'var(--warn)' }}>
                {row.status}
              </em>
            </div>
          );
        })}
      </div>
    </LoopShell>
  );
}

export function CoreLoops({ moduleTitle }: { moduleTitle: string }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      <EmployeeLoop />
      <ApprovalLoop moduleTitle={moduleTitle} />
      <PayrollSandbox />
      <RiskLoop />
      <IntegrationLoop />
    </div>
  );
}
