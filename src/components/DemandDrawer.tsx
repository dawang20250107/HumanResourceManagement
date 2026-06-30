import { FormEvent } from 'react';

export interface DemandFormValue {
  client: string;
  role: string;
  count: number;
  city: string;
}

interface DemandDrawerProps {
  open: boolean;
  onClose: () => void;
  onCreate: (value: DemandFormValue) => void | Promise<void>;
}

export function DemandDrawer({ open, onClose, onCreate }: DemandDrawerProps) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onCreate({
      client: String(data.get('client')),
      role: String(data.get('role')),
      count: Number(data.get('count')),
      city: String(data.get('city'))
    });
  }

  return (
    <div className={`create-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
      <form className="create-panel" onSubmit={submit} role="dialog" aria-modal="true" aria-label="新建灵活用工需求">
        <div className="command-panel-header">
          <div>
            <p className="eyebrow">Create Demand</p>
            <h2>新建灵活用工需求</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="关闭新建需求">×</button>
        </div>
        <label>客户名称<input name="client" required defaultValue="盒马华东仓" /></label>
        <label>岗位类型<input name="role" required defaultValue="仓配夜班" /></label>
        <label>需求人数<input name="count" type="number" min="1" required defaultValue="42" /></label>
        <label>交付城市<input name="city" required defaultValue="上海" /></label>
        <button className="button primary" type="submit">生成需求并进入审批流</button>
        <p className="bulk-status">提交后会写入需求列表、状态流和审计日志。</p>
      </form>
    </div>
  );
}
