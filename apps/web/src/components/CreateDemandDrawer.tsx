'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { useCreateDemand } from '@/lib/hooks';
import { useEscape } from '@/lib/use-escape';
import { useWorkspaceUI } from '@/store/workspace-context';
import { Icon } from './icons';

const fields = [
  { name: 'client', label: '客户名称', value: '盒马华东仓', type: 'text' },
  { name: 'role', label: '岗位类型', value: '仓配夜班', type: 'text' },
  { name: 'headcount', label: '需求人数', value: '42', type: 'number' },
  { name: 'city', label: '交付城市', value: '上海', type: 'text' },
] as const;

export function CreateDemandDrawer() {
  const { createOpen, setCreateOpen, pushToast } = useWorkspaceUI();
  const createDemand = useCreateDemand();
  const [result, setResult] = useState('提交后会写入审计日志并生成 AI 排班建议。');
  useEscape(createOpen, () => setCreateOpen(false));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const input = {
      client: String(data.get('client') ?? ''),
      role: String(data.get('role') ?? ''),
      headcount: Number(data.get('headcount') ?? 0),
      city: String(data.get('city') ?? ''),
    };
    createDemand.mutate(input, {
      onSuccess: (demand) => {
        setResult(
          `已创建 ${demand.city} · ${demand.client} · ${demand.role} ${demand.headcount} 人需求，SLA 风险「${demand.slaRisk}」，AI 已生成候选池与排班草案。`,
        );
        pushToast(`已创建 ${demand.client} 需求`, 'success');
      },
      onError: () => setResult('创建失败：请确认后端 API 是否已启动。'),
    });
  };

  return (
    <AnimatePresence>
      {createOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCreateOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="glass fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-[var(--border-strong)]"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-between border-b border-[var(--border)] p-6">
              <div>
                <p className="eyebrow">Create Demand</p>
                <h2 className="mt-1 text-xl font-bold">新建灵活用工需求</h2>
              </div>
              <button
                type="button"
                onClick={() => setCreateOpen(false)}
                aria-label="关闭"
                className="grid h-8 w-8 place-items-center rounded-lg text-[var(--text-muted)] hover:bg-white/5 hover:text-white focus-ring"
              >
                <Icon name="close" className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={onSubmit} className="flex flex-1 flex-col gap-4 p-6">
              {fields.map((field) => (
                <label key={field.name} className="flex flex-col gap-1.5 text-sm font-medium">
                  {field.label}
                  <input
                    name={field.name}
                    type={field.type}
                    required
                    min={field.type === 'number' ? 1 : undefined}
                    defaultValue={field.value}
                    className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-white focus-ring"
                  />
                </label>
              ))}
              <button
                type="submit"
                disabled={createDemand.isPending}
                className="btn btn-primary mt-1 w-full disabled:opacity-60"
              >
                {createDemand.isPending ? '提交中…' : '生成需求并进入排班'}
              </button>
              <p className="text-xs leading-relaxed text-[var(--text-muted)]">{result}</p>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
