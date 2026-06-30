/**
 * Canonical seed dataset for FlexForce HR Cloud.
 *
 * The NestJS seed script writes these rows into PostgreSQL, and the web app
 * can fall back to them for static rendering. Keeping the data here guarantees
 * the API and UI describe the exact same workspace.
 */
import type {
  DeliverySlot,
  EmployeeProfile,
  ExecutiveMetric,
  IntegrationStatus,
  LoopCard,
  MatchRow,
  Metric,
  ModuleDetail,
  ModuleKey,
  ModuleRecord,
  RiskHeatCell,
  Scenario,
  WorkspaceSnapshot,
} from './types';

const metric = (label: string, value: string, delta: string, detail: string): Metric => ({
  label,
  value,
  delta,
  detail,
});

const records = (
  key: ModuleKey,
  rows: ReadonlyArray<[string, string, string]>,
): ModuleRecord[] =>
  rows.map(([name, value, status], index) => ({
    id: `${key}-r${index + 1}`,
    name,
    value,
    status,
  }));

export const MODULES: ModuleDetail[] = [
  {
    key: 'overview',
    order: 0,
    title: '经营驾驶舱',
    intent: 'CEO / COO 视角',
    description: '实时汇总城市供给、客户需求、班次履约、毛利与现金流，帮助管理层从指标下钻到动作。',
    metrics: [
      metric('活跃员工', '12,480', '+8.2%', '12 个城市供给稳定'),
      metric('本周履约工时', '18,426', '+12.8%', '仓配与客服贡献 71%'),
      metric('项目毛利率', '23.6%', '+2.1%', '低毛利项目剩余 3 个'),
      metric('待处理异常', '17', '-31%', '高危异常 3 条'),
    ],
    actions: ['补齐上海仓配夜班 42 人', '审批 6 个超预算班次', '跟进 3 个低毛利项目'],
    pipeline: ['客户需求', '人才匹配', '班次履约', '薪酬对账'],
    records: records('overview', [
      ['上海仓配夜班', '缺口 42 人', '高优先级'],
      ['华南客服项目', '毛利 18.2%', '需复盘'],
      ['杭州零售门店', '到岗率 99.1%', '健康'],
    ]),
  },
  {
    key: 'demand',
    order: 1,
    title: '客户与需求',
    intent: '销售 / 客成 / 交付协同',
    description: '沉淀客户、门店、项目、岗位、报价、SLA 与用工计划，形成从商机到交付的需求中台。',
    metrics: [
      metric('活跃客户', '286', '+12%', 'A 级客户 42 个'),
      metric('开放需求', '1,842', '+21%', '未来 14 天预测'),
      metric('SLA 达成率', '97.4%', '+1.6%', '低于阈值客户 5 个'),
      metric('待报价项目', '19', '-8%', '平均响应 2.1 小时'),
    ],
    actions: ['将华东 3 个仓配项目拆分为城市需求包', '提醒客户确认 12 个岗位报价', '预测下周新增客服需求 228 人'],
    pipeline: ['客户档案', '需求预测', '报价审批', '交付 SLA'],
    records: records('demand', [
      ['盒马华东仓', '新增 320 人需求', '报价待确认'],
      ['连锁茶饮 A', '周末峰值 186 人', 'SLA 关注'],
      ['制造客户 B', '短期扩产 94 人', '待拆班'],
    ]),
  },
  {
    key: 'talent',
    order: 2,
    title: '人才与入职',
    intent: '招聘 / 入职 / 员工运营',
    description: '统一候选人来源、证照校验、电子签、培训与入职资料，沉淀可复用人才池。',
    metrics: [
      metric('候选人入库', '3,284', '+18%', '去重命中 312 人'),
      metric('证照待校验', '86', '-9%', '健康证占比 64%'),
      metric('电子签完成率', '94%', '+4%', '平均签署 11 分钟'),
      metric('平均入职周期', '1.8 天', '-42%', '批量入职提速明显'),
    ],
    actions: ['AI 解析 240 份新简历', '提醒 18 人补充健康证', '批量发起 73 份劳务协议'],
    pipeline: ['多渠道招聘', 'AI 解析', '证照审核', '电子签入职'],
    records: records('talent', [
      ['李明', '叉车证已验证', '可立即上岗'],
      ['王雨', '健康证 7 天到期', '需提醒'],
      ['赵强', '夜班偏好', '高匹配'],
    ]),
  },
  {
    key: 'schedule',
    order: 3,
    title: '智能排班',
    intent: '运营主管 / 调度中心',
    description: '按技能、距离、偏好、成本、法规与客户 SLA 生成排班建议，并支持抢单、换班与审批。',
    metrics: [
      metric('班次覆盖率', '96%', '+5%', '夜班缺口 42 人'),
      metric('可替补人员', '418', '+11%', '10 公里内 281 人'),
      metric('预计迟到风险', '2.4%', '-1.3%', '天气影响低'),
      metric('单小时成本', '¥42.8', '-6%', '低于预算 ¥3.1'),
    ],
    actions: ['推荐 58 名高匹配骑手', '自动发布 126 个开放班次', '拦截 4 个超时用工安排'],
    pipeline: ['需求拆班', '智能匹配', '抢单确认', '换班审批'],
    records: records('schedule', [
      ['仓配夜班 A', '58 人推荐池', '待发布'],
      ['客服早班 B', '覆盖率 92%', '需替补'],
      ['门店周末班', '成本低于预算', '可确认'],
    ]),
  },
  {
    key: 'time',
    order: 4,
    title: '工时履约',
    intent: '现场主管 / 客户验收',
    description: '连接移动打卡、设备考勤、主管确认、客户验收和异常申诉，保证履约数据可信。',
    metrics: [
      metric('今日到岗率', '98.1%', '+0.8%', '迟到 23 人'),
      metric('异常打卡', '34', '-22%', '跨区域 12 条'),
      metric('客户待验收', '112', '+6%', '超 24h 7 条'),
      metric('申诉平均处理', '3.2 小时', '-38%', 'SLA 内处理'),
    ],
    actions: ['复核 12 条跨区域打卡', '推送 38 个班次给客户确认', '自动合并 7 条重复考勤'],
    pipeline: ['移动打卡', '主管确认', '客户验收', '异常申诉'],
    records: records('time', [
      ['上海仓 A-031', '跨区域打卡', '待复核'],
      ['客服 C-118', '客户未验收', '超 20h'],
      ['门店 M-022', '重复考勤', '可合并'],
    ]),
  },
  {
    key: 'payroll',
    order: 5,
    title: '薪酬结算',
    intent: '薪酬 / 财务 / 税务',
    description: '连接工时、合同、客户账单、服务费、薪税规则和发票，降低人工对账成本。',
    metrics: [
      metric('待结算工时', '8,912', '+7%', '本周新增 1,204 单'),
      metric('对账准确率', '99.9%', '+0.3%', '自动匹配 98.6%'),
      metric('员工应发', '¥2.18M', '+11%', '覆盖 4,820 人'),
      metric('异常薪资单', '12', '-46%', '规则冲突 5 条'),
    ],
    actions: ['生成 1,204 份工资单', '核对 9 个薪资规则差异', '导出本月个税申报明细'],
    pipeline: ['工时归集', '规则计算', '工资单确认', '发薪归档'],
    records: records('payroll', [
      ['6 月第一批工资', '1,204 份工资单', '待确认'],
      ['华东仓配薪资', '9 条规则差异', '需核对'],
      ['个税申报包', '4,820 人', '可导出'],
    ]),
  },
  {
    key: 'billing',
    order: 6,
    title: '客户对账',
    intent: '财务应收 / 客户成功',
    description: '按客户合同、项目费率、工时验收、服务费和发票状态自动生成应收账单。',
    metrics: [
      metric('客户应收', '¥4.82M', '+14%', '本周预计回款 ¥1.1M'),
      metric('待开票', '¥1.36M', '+9%', '已验收未开票'),
      metric('账单差异', '9', '-40%', '主要来自费率变更'),
      metric('回款预测', '¥3.74M', '+18%', '置信度 91%'),
    ],
    actions: ['生成 28 份客户账单', '标记 3 个逾期回款风险', '同步 16 张发票到财务系统'],
    pipeline: ['合同费率', '客户验收', '账单生成', '开票回款'],
    records: records('billing', [
      ['盒马华东账单', '¥1.12M', '待开票'],
      ['茶饮周末项目', '3 条费率差异', '需确认'],
      ['客服中心账单', '回款风险', '需跟进'],
    ]),
  },
  {
    key: 'risk',
    order: 7,
    title: '合规风控',
    intent: '法务 / 风控 / 审计',
    description: '对合同、证照、工时、劳动规则、数据权限和敏感操作进行持续审计与预警。',
    metrics: [
      metric('高危预警', '3', '-25%', '需今日处理'),
      metric('证照过期风险', '21', '-18%', '7 天内到期'),
      metric('审计事件', '1,482', '+33%', '敏感操作 16 条'),
      metric('权限异常', '0', '稳定', 'SSO 正常'),
    ],
    actions: ['冻结 2 个异常打卡记录', '提醒 21 人更新证照', '复核 3 条跨区域用工规则'],
    pipeline: ['规则引擎', '异常识别', '处置工单', '审计留痕'],
    records: records('risk', [
      ['跨区域用工', '3 条规则冲突', '高危'],
      ['证照过期', '21 人即将到期', '需提醒'],
      ['敏感导出', '16 条审计事件', '待复核'],
    ]),
  },
  {
    key: 'analytics',
    order: 8,
    title: 'AI 分析',
    intent: '数据团队 / 业务负责人',
    description: '提供需求预测、人岗匹配、流失风险、毛利分析、自然语言报表和知识库 RAG。',
    metrics: [
      metric('预测缺口', '312 人', '+24%', '华东仓配为主'),
      metric('流失风险', '8.4%', '-1.2%', '重点关注 96 人'),
      metric('AI 命中率', '91%', '+6%', '排班推荐采纳率'),
      metric('知识库问答', '2,416', '+37%', '可追溯率 100%'),
    ],
    actions: ['生成华东仓配供需预测', '解释 5 个低毛利项目原因', '推荐 42 名低流失风险员工'],
    pipeline: ['数据汇聚', '预测模型', 'RAG 问答', '行动建议'],
    records: records('analytics', [
      ['华东供需预测', '缺口 312 人', '置信度 91%'],
      ['低毛利解释', '5 个项目', '已生成'],
      ['流失风险名单', '96 人', '需运营跟进'],
    ]),
  },
  {
    key: 'admin',
    order: 9,
    title: '组织权限',
    intent: 'IT / 安全 / 平台管理员',
    description: '支持多租户、组织架构、角色权限、字段级权限、SSO、API Key、Webhook 与审计策略。',
    metrics: [
      metric('租户数量', '42', '+5', '含 3 个私有化客户'),
      metric('角色模板', '18', '+3', '行业模板可复用'),
      metric('API 调用', '1.2M', '+29%', '错误率 0.03%'),
      metric('SSO 成功率', '99.99%', '稳定', 'MFA 覆盖 91%'),
    ],
    actions: ['为新客户复制零售行业权限模板', '轮换 2 个即将过期 API Key', '导出本周敏感操作审计'],
    pipeline: ['多租户', 'RBAC/ABAC', '集成配置', '安全审计'],
    records: records('admin', [
      ['零售权限模板', '可复用', '待发布'],
      ['API Key 轮换', '2 个到期', '需处理'],
      ['SSO 策略', 'MFA 91%', '健康'],
    ]),
  },
];

const scenarios: Scenario[] = [
  { id: 'scn-618', label: '618 电商仓配高峰', need: '缺口 312 人', sla: 'SLA 风险 低' },
  { id: 'scn-tea', label: '连锁茶饮周末峰值', need: '缺口 186 人', sla: 'SLA 风险 中' },
  { id: 'scn-mfg', label: '制造短期扩产项目', need: '缺口 94 人', sla: 'SLA 风险 低' },
  { id: 'scn-cs', label: '客服中心大促支援', need: '缺口 228 人', sla: 'SLA 风险 中' },
];

const matchingMatrix: MatchRow[] = [
  { name: '张伟', role: '仓配夜班', score: 96, reason: '距离 3.2km · 夜班偏好 · 到岗稳定' },
  { name: '刘洋', role: '客服早班', score: 91, reason: '普通话认证 · 近 30 天零迟到' },
  { name: '陈晨', role: '门店周末班', score: 88, reason: '同门店经验 · 成本低于预算' },
];

const deliveryPlanner: DeliverySlot[] = [
  { window: '08:00-12:00', label: '客服早班', coverage: 92, note: '缺 18 人' },
  { window: '12:00-18:00', label: '门店午晚高峰', coverage: 97, note: '健康' },
  { window: '20:00-02:00', label: '仓配夜班', coverage: 84, note: '缺 42 人' },
];

const employeeProfiles: EmployeeProfile[] = [
  { code: 'E-1024', name: '张伟', role: '仓配夜班', matchScore: 96, note: '已签约 · 证照齐全 · 可上岗' },
  { code: 'E-1188', name: '刘洋', role: '客服早班', matchScore: 91, note: '培训完成 · 低流失风险' },
  { code: 'E-1290', name: '陈晨', role: '门店周末班', matchScore: 88, note: '同店经验 · 成本优势' },
];

const loops: LoopCard[] = [
  { group: 'advanced', code: 'Loop 6', title: '组织编制与预算', metric: '编制 1,280 / 在岗 1,214', note: '预算消耗 82% · 缺口 66' },
  { group: 'advanced', code: 'Loop 7', title: '合同与文档金库', metric: '合同 12,480 份', note: '过期风险 21 · 归档完整率 99.2%' },
  { group: 'advanced', code: 'Loop 8', title: '培训认证学院', metric: '完成率 94%', note: '待补训 73 人 · 高危岗位 100% 覆盖' },
  { group: 'advanced', code: 'Loop 9', title: '客户 SLA 门户', metric: '验收及时率 97.4%', note: '待客户确认 112 单' },
  { group: 'advanced', code: 'Loop 10', title: '成本分摊与毛利', metric: '项目毛利 23.6%', note: '低毛利项目 3 个 · 可优化 ¥82k' },
  { group: 'enterprise', code: 'Loop 11', title: '绩效与服务质量', metric: 'NPS 68 · 投诉率 0.8%', note: '按客户、门店、班组追踪服务质量' },
  { group: 'enterprise', code: 'Loop 12', title: '留存与员工关怀', metric: '流失风险 8.4%', note: '收入波动、排班稳定性与反馈联动' },
  { group: 'enterprise', code: 'Loop 13', title: '灵活用工市场', metric: '可用供给 4,186 人', note: '支持抢单、候补池与城市调剂' },
  { group: 'enterprise', code: 'Loop 14', title: '全球化与多主体', metric: '42 租户 · 6 主体', note: '多币种、多法人、多税务口径' },
  { group: 'enterprise', code: 'Loop 15', title: '安全运营中心', metric: '0 权限异常', note: 'SSO、MFA、API Key 与敏感导出监控' },
];

const riskHeatmap: RiskHeatCell[] = [
  { label: '合同缺失', level: '低', count: 2 },
  { label: '超时用工', level: '中', count: 7 },
  { label: '证照过期', level: '中', count: 21 },
  { label: '跨区域派工', level: '高', count: 3 },
];

const integrationHealth: IntegrationStatus[] = [
  { name: '电子签', uptime: '99.99%', status: '正常' },
  { name: '财务 ERP', uptime: '99.95%', status: '正常' },
  { name: '短信/IM', uptime: '99.90%', status: '关注' },
  { name: '考勤设备', uptime: '99.80%', status: '关注' },
];

const executiveMetrics: ExecutiveMetric[] = [
  { label: '活跃员工', value: '12,480', delta: '+8.2%' },
  { label: '本周履约工时', value: '18,426', delta: '+12.8%' },
  { label: '项目毛利率', value: '23.6%', delta: '+2.1%' },
  { label: '自动化对账准确率', value: '99.9%', delta: '稳定' },
];

export const WORKSPACE: WorkspaceSnapshot = {
  automationSavingsHours: 486,
  executiveMetrics,
  scenarios,
  matchingMatrix,
  deliveryPlanner,
  complianceRules: ['连续工时 ≤ 10 小时', '证照有效且实名一致', '跨区域派工需主管复核', '客户 SLA 验收时限 24h'],
  approvalFlow: ['客户需求确认', '预算与报价审批', '合规规则校验', '排班发布', '客户验收'],
  employeeProfiles,
  loops,
  riskHeatmap,
  integrationHealth,
  commandSuggestions: [
    '补齐上海仓配夜班 42 人',
    '生成华东供需预测报告',
    '打开 6 月第一批工资单',
    '排查 3 条跨区域用工风险',
    '创建连锁茶饮周末峰值需求',
    '导出本周敏感操作审计',
  ],
};

export const INITIAL_AUDIT_MESSAGES: string[] = [
  '系统初始化：已加载多租户策略',
  'AI 风控：完成今日证照扫描',
  '排班引擎：刷新候选人可用性',
];
