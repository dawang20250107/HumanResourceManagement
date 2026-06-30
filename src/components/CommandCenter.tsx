import type { ModuleKey } from '../types';

export interface Command {
  label: string;
  module: ModuleKey;
  effect: string;
}

interface CommandCenterProps {
  open: boolean;
  commands: Command[];
  onRun: (command: Command) => void;
  onClose: () => void;
}

export function CommandCenter({ open, commands, onRun, onClose }: CommandCenterProps) {
  return (
    <div className={`command-overlay ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="command-panel" role="dialog" aria-modal="true" aria-label="AI 指挥中心">
        <div className="command-panel-header">
          <div>
            <p className="eyebrow">AI Command Center</p>
            <h2>跨模块智能指挥中心</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="关闭 AI 指挥中心">×</button>
        </div>
        <div className="command-results">
          {commands.map(command => (
            <button type="button" key={command.label} onClick={() => onRun(command)}>
              <span>{command.module}</span>
              {command.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
