'use client';

import { motion } from 'framer-motion';
import type { ModuleKey } from '@flexforce/shared';
import { useModules, useWorkspace } from '@/lib/hooks';
import { useWorkspaceUI } from '@/store/workspace-context';
import { ModuleIcon } from './icons';

export function Sidebar() {
  const { data: modules = [] } = useModules();
  const { data: workspace } = useWorkspace();
  const { activeModule, setActiveModule } = useWorkspaceUI();

  return (
    <aside className="flex h-full flex-col gap-6 p-5">
      <a href="/" className="flex items-center gap-3 px-2 focus-ring" aria-label="FlexForce HR Cloud">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient text-lg font-black text-white shadow-glow">
          F
        </span>
        <span className="text-[15px] font-bold leading-tight">
          FlexForce
          <span className="block text-xs font-medium text-[var(--text-faint)]">HR Cloud</span>
        </span>
      </a>

      <nav
        className="flex flex-1 gap-1 overflow-x-auto no-scrollbar lg:flex-col lg:overflow-y-auto"
        aria-label="工作台导航"
      >
        {modules.map((m) => {
          const active = m.key === activeModule;
          return (
            <button
              key={m.key}
              type="button"
              onClick={() => setActiveModule(m.key as ModuleKey)}
              className={`relative flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-ring ${
                active ? 'text-white' : 'text-[var(--text-muted)] hover:text-white'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-xl border border-[var(--border-strong)]"
                  style={{ background: 'var(--surface-2)' }}
                  transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                />
              )}
              <ModuleIcon
                module={m.key as ModuleKey}
                className={`relative z-10 h-5 w-5 shrink-0 ${active ? 'text-brand-cyan' : ''}`}
              />
              <span className="relative z-10">{m.title}</span>
            </button>
          );
        })}
      </nav>

      <div className="glass-card hidden p-4 lg:block">
        <span className="text-xs text-[var(--text-faint)]">本月自动化节省</span>
        <strong className="mt-1 block text-2xl font-bold gradient-text">
          {workspace?.automationSavingsHours ?? 486} 小时
        </strong>
        <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
          来自 AI 匹配、批量入职、工时异常识别、自动对账与合规预警。
        </p>
      </div>
    </aside>
  );
}
