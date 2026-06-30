export type ApprovalStatus = '待报价' | '待审批' | '待排班' | '履约中' | '已完成';
export type ModuleKey = 'overview' | 'demand' | 'talent' | 'schedule' | 'time' | 'payroll' | 'billing' | 'risk' | 'analytics' | 'admin';
export interface Tenant { id: string; name: string; plan: string; region: string; }
export interface Client { id: string; name: string; industry: string; sla: number; }
export interface Demand { id: string; clientId: string; title: string; role: string; city: string; headcount: number; status: ApprovalStatus | string; budgetPerHour: number; }
export interface Worker { id: string; name: string; skills: string[]; city: string; matchScore: number; status: '可上岗' | '待补证' | '培训中'; }
export interface Shift { id: string; demandId: string; name: string; window: string; coverage: number; status: '草案' | '已发布' | '履约中'; }
export interface Timesheet { id: string; shiftId: string; workerId: string; hours: number; status: '待确认' | '客户已验收' | '异常'; }
export interface PayrollBatch { id: string; title: string; amount: number; status: '草稿' | '待确认' | '已发薪'; }
export interface Invoice { id: string; clientId: string; amount: number; status: '草稿' | '待开票' | '已开票'; }
export interface AuditEvent { id: string; at?: string; createdAt?: string; message: string; module: ModuleKey | string; }
export interface ModuleConfig { key: ModuleKey; title: string; intent: string; description: string; metrics: [string, string, string, string][]; pipeline: string[]; }
