import type { ModuleConfig, ModuleKey } from '../types';
export function Sidebar({ modules, active, onSelect }: { modules: ModuleConfig[]; active: ModuleKey; onSelect: (key: ModuleKey) => void }) {
  return <aside className="app-sidebar" aria-label="产品模块"><div className="brand"><span className="brand-mark">F</span><span>FlexForce HR Cloud</span></div><nav className="module-nav">{modules.map(module => <button key={module.key} className={`module-tab ${active === module.key ? 'active' : ''}`} aria-pressed={active === module.key} onClick={() => onSelect(module.key)}><span className="nav-icon">◆</span><span>{module.title}</span></button>)}</nav><div className="sidebar-card"><span>本月自动化节省</span><strong>486 小时</strong><p>来自 AI 匹配、批量入职、工时异常识别、自动对账与合规预警。</p></div></aside>;
}
