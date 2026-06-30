import type { CSSProperties } from 'react';
import type { Demand, ModuleConfig, PayrollBatch, Shift, Timesheet, Worker } from '../types';

type ActionHandler = (id: string) => void | Promise<void>;

interface ModuleWorkspaceProps {
  module: ModuleConfig;
  demands: Demand[];
  workers: Worker[];
  shifts: Shift[];
  timesheets: Timesheet[];
  payroll: PayrollBatch[];
  onAdvance: ActionHandler;
  onApprove: ActionHandler;
  onSchedule: ActionHandler;
  onSettle: () => void | Promise<void>;
}

function MetricGrid({ metrics }: { metrics: ModuleConfig['metrics'] }) {
  return (
    <div className="workbench-grid">
      {metrics.map(metric => (
        <article className="metric-card" key={metric[0]}>
          <span>{metric[0]}</span>
          <strong>{metric[1]}</strong>
          <p>{metric[2]}</p>
          <small>{metric[3]}</small>
        </article>
      ))}
    </div>
  );
}

function DemandFlow({ demands, onAdvance, onApprove, onSchedule }: Pick<ModuleWorkspaceProps, 'demands' | 'onAdvance' | 'onApprove' | 'onSchedule'>) {
  return (
    <div className="data-board">
      <div className="data-board-header">
        <div>
          <h3>用工需求状态流</h3>
          <p>创建需求后真实写入此列表；审批、排班、履约、结算会推动状态。</p>
        </div>
      </div>
      <div className="record-list">
        {demands.map(demand => (
          <div className="record-row" key={demand.id}>
            <span>{demand.title}</span>
            <strong>{demand.city} · {demand.role} · {demand.headcount}人</strong>
            <em>{demand.status}</em>
            <button className="advance-status" onClick={() => onAdvance(demand.id)}>推进状态</button>
            <button className="advance-status" onClick={() => onApprove(demand.id)}>审批</button>
            <button className="advance-status" onClick={() => onSchedule(demand.id)}>排班</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TalentMatching({ workers }: { workers: Worker[] }) {
  return (
    <div className="decision-matrix">
      <h3>AI 人岗匹配</h3>
      {workers.map(worker => (
        <div className="match-row" key={worker.id}>
          <span>{worker.name}</span>
          <strong>{worker.skills.join(' / ')}</strong>
          <b>{worker.matchScore}</b>
          <em>{worker.city} · {worker.status}</em>
        </div>
      ))}
    </div>
  );
}

function DeliveryPlanner({ shifts, timesheets, payroll, onSettle }: Pick<ModuleWorkspaceProps, 'shifts' | 'timesheets' | 'payroll' | 'onSettle'>) {
  return (
    <div className="delivery-planner">
      <div className="data-board-header">
        <div>
          <h3>排班 / 工时 / 薪酬联动</h3>
          <p>展示从排班发布到工时归集、薪酬批次生成的跨模块流转。</p>
        </div>
        <button type="button" onClick={() => onSettle()}>生成结算批次</button>
      </div>
      <div className="shift-timeline">
        {shifts.map(shift => (
          <div className="shift-row" key={shift.id}>
            <span>{shift.window}</span>
            <strong>{shift.name}</strong>
            <i style={{ '--coverage': `${shift.coverage}%` } as CSSProperties}></i>
            <em>{shift.coverage}% · {shift.status}</em>
          </div>
        ))}
      </div>
      <div className="record-list">
        {timesheets.map(sheet => (
          <div className="record-row" key={sheet.id}>
            <span>工时 {sheet.hours}h</span>
            <strong>{sheet.status}</strong>
            <em>{sheet.workerId}</em>
          </div>
        ))}
        {payroll.map(batch => (
          <div className="record-row" key={batch.id}>
            <span>{batch.title}</span>
            <strong>¥{batch.amount.toLocaleString('zh-CN')}</strong>
            <em>{batch.status}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ModuleWorkspace(props: ModuleWorkspaceProps) {
  const { module, demands, workers, shifts, timesheets, payroll, onAdvance, onApprove, onSchedule, onSettle } = props;

  return (
    <section className="module-content">
      <div className="module-hero">
        <div>
          <p className="eyebrow">{module.intent}</p>
          <h2>{module.title}</h2>
          <p>{module.description}</p>
        </div>
        <div className="ai-card">
          <span>AI Copilot 建议</span>
          <strong>{module.pipeline.join(' → ')}</strong>
          <p>所有操作会写入审计日志，并推动跨模块状态变化。</p>
        </div>
      </div>
      <MetricGrid metrics={module.metrics} />
      <DemandFlow demands={demands} onAdvance={onAdvance} onApprove={onApprove} onSchedule={onSchedule} />
      <TalentMatching workers={workers} />
      <DeliveryPlanner shifts={shifts} timesheets={timesheets} payroll={payroll} onSettle={onSettle} />
    </section>
  );
}
