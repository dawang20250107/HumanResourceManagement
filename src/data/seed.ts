import type { AuditEvent, Client, Demand, Invoice, ModuleConfig, PayrollBatch, Shift, Tenant, Timesheet, Worker } from '../types';

export const tenant: Tenant = { id: 't-001', name: 'FlexForce Enterprise', plan: 'Enterprise', region: 'CN-East' };
export const clients: Client[] = [
  { id: 'c-hem', name: '盒马华东仓', industry: '仓配', sla: 97.4 },
  { id: 'c-tea', name: '连锁茶饮 A', industry: '零售', sla: 95.8 },
  { id: 'c-cc', name: '客服中心 B', industry: '客服', sla: 96.3 }
];
export const initialDemands: Demand[] = [
  { id: 'd-001', clientId: 'c-hem', title: '上海仓配夜班补员', role: '仓配夜班', city: '上海', headcount: 42, status: '待报价', budgetPerHour: 42 },
  { id: 'd-002', clientId: 'c-tea', title: '周末门店高峰', role: '门店店员', city: '杭州', headcount: 86, status: '待审批', budgetPerHour: 38 }
];
export const workers: Worker[] = [
  { id: 'w-001', name: '张伟', skills: ['仓配', '夜班'], city: '上海', matchScore: 96, status: '可上岗' },
  { id: 'w-002', name: '刘洋', skills: ['客服', '普通话'], city: '苏州', matchScore: 91, status: '培训中' },
  { id: 'w-003', name: '陈晨', skills: ['门店', '收银'], city: '杭州', matchScore: 88, status: '可上岗' }
];
export const initialShifts: Shift[] = [{ id: 's-001', demandId: 'd-001', name: '仓配夜班 A', window: '20:00-02:00', coverage: 84, status: '草案' }];
export const initialTimesheets: Timesheet[] = [{ id: 'ts-001', shiftId: 's-001', workerId: 'w-001', hours: 8, status: '待确认' }];
export const initialPayroll: PayrollBatch[] = [{ id: 'p-001', title: '6 月第一批工资', amount: 2180000, status: '草稿' }];
export const initialInvoices: Invoice[] = [{ id: 'i-001', clientId: 'c-hem', amount: 1120000, status: '草稿' }];
export const initialAudit: AuditEvent[] = [{ id: 'a-001', at: '09:00:00', message: '系统初始化：多租户策略与角色权限加载完成', module: 'admin' }];

export const modules: ModuleConfig[] = [
  { key: 'overview', title: '经营驾驶舱', intent: 'CEO / COO 视角', description: '汇总供需、履约、毛利、风险和现金流。', metrics: [['活跃员工','12,480','+8.2%','12 个城市供给稳定'],['履约工时','18,426','+12.8%','仓配与客服贡献 71%'],['项目毛利','23.6%','+2.1%','低毛利项目剩余 3 个'],['待处理异常','17','-31%','高危异常 3 条']], pipeline: ['需求','匹配','履约','结算'] },
  { key: 'demand', title: '客户需求', intent: '销售 / 客成 / 交付', description: '管理客户、项目、岗位、报价、SLA 与需求状态。', metrics: [['开放需求','1,842','+21%','未来 14 天预测'],['待报价','19','-8%','平均响应 2.1 小时'],['SLA','97.4%','+1.6%','低于阈值客户 5 个'],['需求缺口','312','+24%','华东仓配为主']], pipeline: ['录入','报价','审批','排班'] },
  { key: 'talent', title: '人才入职', intent: '招聘 / 入职', description: '候选人、证照、电子签、培训与入职资料。', metrics: [['候选人','3,284','+18%','去重命中 312 人'],['证照待审','86','-9%','健康证占比 64%'],['签署率','94%','+4%','平均 11 分钟'],['入职周期','1.8 天','-42%','批量入职提速']], pipeline: ['招聘','解析','审核','入职'] },
  { key: 'schedule', title: '智能排班', intent: '调度中心', description: '按技能、距离、偏好、成本、法规与 SLA 匹配班次。', metrics: [['覆盖率','96%','+5%','夜班缺口 42 人'],['替补池','418','+11%','10 公里内 281 人'],['迟到风险','2.4%','-1.3%','天气影响低'],['小时成本','¥42.8','-6%','低于预算 ¥3.1']], pipeline: ['拆班','匹配','发布','换班'] },
  { key: 'time', title: '工时履约', intent: '现场 / 客户验收', description: '移动打卡、设备考勤、主管确认、客户验收和异常申诉。', metrics: [['到岗率','98.1%','+0.8%','迟到 23 人'],['异常打卡','34','-22%','跨区域 12 条'],['待验收','112','+6%','超 24h 7 条'],['申诉处理','3.2h','-38%','SLA 内处理']], pipeline: ['打卡','确认','验收','申诉'] },
  { key: 'payroll', title: '薪酬结算', intent: '薪酬 / 财务', description: '工时、合同、薪税规则、工资单和发薪归档。', metrics: [['待结算','8,912h','+7%','本周新增 1,204 单'],['准确率','99.9%','+0.3%','自动匹配 98.6%'],['应发','¥2.18M','+11%','覆盖 4,820 人'],['异常单','12','-46%','规则冲突 5 条']], pipeline: ['归集','计算','确认','发薪'] },
  { key: 'billing', title: '客户对账', intent: '应收 / 客成', description: '客户合同、项目费率、工时验收、服务费、发票和回款。', metrics: [['应收','¥4.82M','+14%','本周预计 ¥1.1M'],['待开票','¥1.36M','+9%','已验收未开票'],['账单差异','9','-40%','费率变更'],['回款预测','¥3.74M','+18%','置信度 91%']], pipeline: ['费率','验收','账单','回款'] },
  { key: 'risk', title: '合规风控', intent: '法务 / 审计', description: '合同、证照、工时、劳动规则、权限和敏感操作预警。', metrics: [['高危预警','3','-25%','需今日处理'],['证照过期','21','-18%','7 天内到期'],['审计事件','1,482','+33%','敏感 16 条'],['权限异常','0','稳定','SSO 正常']], pipeline: ['规则','识别','处置','审计'] },
  { key: 'analytics', title: 'AI 分析', intent: '数据 / 业务', description: '需求预测、人岗匹配、毛利分析、自然语言报表和 RAG。', metrics: [['预测缺口','312','+24%','华东仓配'],['流失风险','8.4%','-1.2%','关注 96 人'],['AI 命中','91%','+6%','推荐采纳率'],['问答','2,416','+37%','可追溯率 100%']], pipeline: ['汇聚','预测','问答','行动'] },
  { key: 'admin', title: '组织权限', intent: 'IT / 平台', description: '多租户、组织架构、角色权限、字段权限、SSO、API 与审计。', metrics: [['租户','42','+5','3 个私有化'],['角色模板','18','+3','行业复用'],['API 调用','1.2M','+29%','错误率 0.03%'],['SSO','99.99%','稳定','MFA 91%']], pipeline: ['租户','权限','集成','安全'] }
];
