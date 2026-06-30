'use client';

import { motion } from 'framer-motion';
import { useWorkspace } from '@/lib/hooks';
import { useWorkspaceUI } from '@/store/workspace-context';
import { Icon } from './icons';

export function WorkspaceHeader() {
  const { data: workspace } = useWorkspace();
  const { cycleScenario, setCommandOpen, setCreateOpen } = useWorkspaceUI();
  const scenarioCount = workspace?.scenarios.length ?? 0;

  return (
    <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow">Enterprise Workforce Operating System</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight lg:text-[34px]">
          灵活用工与企业 HR 的<span className="gradient-text">全产品 SaaS 工作台</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
          统一管理客户需求、人才供给、合同入职、智能排班、工时履约、薪酬结算、客户对账、合规风控、AI
          分析和组织权限。
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          className="btn btn-secondary"
          onClick={() => cycleScenario(scenarioCount)}
        >
          切换高峰场景
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          className="btn btn-secondary"
          onClick={() => setCommandOpen(true)}
        >
          <Icon name="command" className="h-4 w-4" /> AI 指挥中心
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          className="btn btn-primary"
          onClick={() => setCreateOpen(true)}
        >
          <Icon name="plus" className="h-4 w-4" /> 创建用工需求
        </motion.button>
      </div>
    </header>
  );
}
