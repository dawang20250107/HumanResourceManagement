import { useEffect, useMemo, useState } from 'react';
import { workforceApi } from './api/workforceApi';
import { AuditPanel } from './components/AuditPanel';
import { Command, CommandCenter } from './components/CommandCenter';
import { DemandDrawer, DemandFormValue } from './components/DemandDrawer';
import { ExecutiveGrid } from './components/ExecutiveGrid';
import { Sidebar } from './components/Sidebar';
import { ModuleWorkspace } from './modules/ModuleWorkspace';
import { clients, modules, tenant, workers } from './data/seed';
import { useWorkforceState } from './state/useWorkforceState';
import './styles.css';

const commands: Command[] = [
  { label: '审批上海仓配夜班需求', module: 'demand', effect: '已将第一条需求推进到待排班。' },
  { label: '为待排班需求生成班次', module: 'schedule', effect: '已生成排班草案并写入排班计划。' },
  { label: '生成薪酬结算批次', module: 'payroll', effect: '已生成新的薪酬批次。' },
  { label: '查看跨区域用工风险', module: 'risk', effect: '已定位到合规风控模块。' }
];

type ApiSyncState = 'idle' | 'syncing' | 'synced' | 'failed';

export default function App() {
  const workforce = useWorkforceState();
  const [commandOpen, setCommandOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [apiSync, setApiSync] = useState<ApiSyncState>('idle');
  const [apiMessage, setApiMessage] = useState('当前使用前端模拟数据，可连接 NestJS API 快照。');
  const activeConfig = useMemo(() => modules.find(item => item.key === workforce.activeModule) ?? modules[0], [workforce.activeModule]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setCommandOpen(false); setDrawerOpen(false); }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);

  function createDemand(value: DemandFormValue) {
    workforce.createDemand(value);
    setDrawerOpen(false);
  }

  function runCommand(command: Command) {
    workforce.runCommand(command);
    setCommandOpen(false);
  }

  async function syncApiSnapshot() {
    setApiSync('syncing');
    setApiMessage('正在读取 NestJS /api/workforce/snapshot ...');
    try {
      const snapshot = await workforceApi.snapshot();
      workforce.hydrateSnapshot(snapshot);
      workforce.addAudit('已从 NestJS API 同步工作台快照', 'admin');
      setApiSync('synced');
      setApiMessage(`API 快照同步完成：${snapshot.demands.length} 个需求，${snapshot.shifts.length} 个班次。`);
    } catch (error) {
      setApiSync('failed');
      setApiMessage(error instanceof Error ? `API 暂不可用：${error.message}` : 'API 暂不可用：未知错误');
      workforce.addAudit('API 快照同步失败，继续使用前端模拟数据', 'admin');
    }
  }

  return <div className="app-shell"><Sidebar modules={modules} active={workforce.activeModule} onSelect={workforce.setActiveModule} /><main className="workspace"><header className="workspace-header"><div><p className="eyebrow">{tenant.name} · {tenant.plan}</p><h1>灵活用工与企业 HR 的产品化 SaaS 工作台</h1><p>从需求、审批、排班、履约、薪酬、对账到风控审计，已具备前端状态流与 NestJS API 对接入口。</p><div className={`api-sync api-sync-${apiSync}`} role="status" aria-live="polite"><span>{apiMessage}</span><button className="button ghost" type="button" onClick={syncApiSnapshot} disabled={apiSync === 'syncing'}>{apiSync === 'syncing' ? '同步中...' : '同步 API 快照'}</button></div></div><div className="header-actions"><button className="button secondary" onClick={() => setCommandOpen(true)} aria-expanded={commandOpen}>AI 指挥中心</button><button className="button primary" onClick={() => setDrawerOpen(true)} aria-expanded={drawerOpen}>创建用工需求</button></div></header><ExecutiveGrid clients={clients} demands={workforce.demands} shifts={workforce.shifts} audit={workforce.audit} /><ModuleWorkspace module={activeConfig} demands={workforce.demands} workers={workers} shifts={workforce.shifts} timesheets={workforce.timesheets} payroll={workforce.payroll} onAdvance={workforce.advanceDemand} onApprove={workforce.approveDemand} onSchedule={workforce.scheduleDemand} onSettle={workforce.settlePayroll} /><AuditPanel audit={workforce.audit} /><CommandCenter open={commandOpen} commands={commands} onRun={runCommand} onClose={() => setCommandOpen(false)} /><DemandDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onCreate={createDemand} /></main></div>;
}
