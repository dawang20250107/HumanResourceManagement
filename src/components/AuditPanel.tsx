import type { AuditEvent } from '../types';

function auditTime(event: AuditEvent) {
  return event.at ?? event.createdAt ?? '实时';
}

export function AuditPanel({ audit }: { audit: AuditEvent[] }) {
  return (
    <section className="audit-panel">
      <div>
        <h3>审计日志</h3>
        <p>审批、排班、结算、AI 指挥中心都会记录。</p>
      </div>
      <ol>
        {audit.slice(0, 8).map(event => (
          <li key={event.id}>{auditTime(event)} · {event.module} · {event.message}</li>
        ))}
      </ol>
    </section>
  );
}
