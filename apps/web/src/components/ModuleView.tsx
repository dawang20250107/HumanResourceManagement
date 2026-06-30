'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useModule } from '@/lib/hooks';
import { useWorkspaceUI } from '@/store/workspace-context';
import { ModuleIcon } from './icons';
import { MetricCard } from './MetricCard';
import { ProcessRail } from './ProcessRail';
import { RecommendedActions } from './sections/RecommendedActions';
import { DataBoard } from './sections/DataBoard';
import { MatchingMatrix } from './sections/MatchingMatrix';
import { DeliveryPlanner } from './sections/DeliveryPlanner';
import { CoreLoops } from './sections/CoreLoops';
import { AdvancedLoops } from './sections/AdvancedLoops';
import { AuditTimeline } from './sections/AuditTimeline';

export function ModuleView() {
  const { activeModule, openInsight } = useWorkspaceUI();
  const { data: module } = useModule(activeModule);

  if (!module) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={module.key}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-5"
      >
        {/* Hero + AI copilot */}
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <div className="glass-card flex flex-col gap-3 p-6">
            <p className="eyebrow">{module.intent}</p>
            <h2 className="flex items-center gap-3 text-2xl font-bold">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/5 text-brand-cyan">
                <ModuleIcon module={module.key} className="h-6 w-6" />
              </span>
              {module.title}
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">{module.description}</p>
          </div>
          <div
            className="glass-card flex flex-col justify-center gap-2 p-6"
            style={{ background: 'linear-gradient(150deg, rgba(99,102,241,0.16), rgba(34,211,238,0.06))' }}
          >
            <span className="eyebrow">AI Copilot 建议</span>
            <strong className="text-lg font-semibold leading-snug">{module.actions[0]}</strong>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              已结合供需预测、成本约束、履约历史与合规规则生成。
            </p>
          </div>
        </div>

        <ProcessRail steps={module.pipeline} />

        {/* KPI tiles */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {module.metrics.map((metric, i) => (
            <MetricCard
              key={metric.label}
              metric={metric}
              index={i}
              onOpen={() =>
                openInsight({
                  eyebrow: '指标详情',
                  title: `${metric.label} · ${metric.value}`,
                  body: `${metric.detail}，趋势 ${metric.delta}。AI 建议优先处理与「${module.actions[0]}」相关的任务，并同步记录到审计日志。`,
                })
              }
            />
          ))}
        </div>

        <RecommendedActions actions={module.actions} moduleTitle={module.title} />
        <DataBoard records={module.records} moduleTitle={module.title} />

        <div className="grid gap-4 xl:grid-cols-2">
          <MatchingMatrix moduleTitle={module.title} />
          <DeliveryPlanner moduleTitle={module.title} />
        </div>

        <CoreLoops moduleTitle={module.title} />
        <AdvancedLoops />
        <AuditTimeline />
      </motion.div>
    </AnimatePresence>
  );
}
