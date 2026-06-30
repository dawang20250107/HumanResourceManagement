'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useCommandSuggestions } from '@/lib/hooks';
import { useAuditAction } from '@/lib/actions';
import { useEscape } from '@/lib/use-escape';
import { useWorkspaceUI } from '@/store/workspace-context';
import { Icon } from './icons';

export function CommandCenter() {
  const { commandOpen, setCommandOpen } = useWorkspaceUI();
  const [query, setQuery] = useState('');
  const { data: suggestions = [] } = useCommandSuggestions(query);
  const act = useAuditAction();

  useEscape(commandOpen, () => setCommandOpen(false));

  const run = (text: string) => {
    act(`AI 指挥中心下发：${text}`, `已下发：${text}`);
    setCommandOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {commandOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCommandOpen(false)}
          className="fixed inset-0 z-[55] flex items-start justify-center bg-black/50 p-4 pt-[12vh] backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--border-strong)] shadow-glass"
            role="dialog"
            aria-modal="true"
            aria-label="AI 指挥中心"
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
              <div>
                <p className="eyebrow">AI Command Center</p>
                <h2 className="mt-1 text-lg font-semibold">跨模块智能指挥中心</h2>
              </div>
              <button
                type="button"
                onClick={() => setCommandOpen(false)}
                aria-label="关闭"
                className="grid h-8 w-8 place-items-center rounded-lg text-[var(--text-muted)] hover:bg-white/5 hover:text-white focus-ring"
              >
                <Icon name="close" className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-3">
              <Icon name="search" className="h-4 w-4 text-[var(--text-faint)]" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="输入：补人、排班、结算、风控、对账…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--text-faint)]"
              />
            </div>

            <div className="max-h-72 overflow-y-auto p-2">
              {suggestions.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-[var(--text-faint)]">无匹配指令</p>
              )}
              {suggestions.map((item, i) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => run(item)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/5"
                >
                  <span className="font-mono text-xs text-[var(--text-faint)]">
                    0{i + 1}
                  </span>
                  {item}
                  <Icon name="arrow" className="ml-auto h-4 w-4 text-[var(--text-faint)]" />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
