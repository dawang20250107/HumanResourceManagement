const iconSet = {
  overview: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 35V13l16-7 16 7v22l-16 7-16-7Z"/><path d="M16 33V20m8 13V15m8 18v-9"/></svg>',
  demand: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 14h24l8 8v18H8V14Z"/><path d="M32 14v9h8M15 25h18M15 32h12"/></svg>',
  talent: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 24a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M10 40c2.2-8 8-12 14-12s11.8 4 14 12"/><path d="M35 11l5 2-5 2-2 5-2-5-5-2 5-2 2-5 2 5Z"/></svg>',
  schedule: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 12h28v28H10V12Z"/><path d="M16 8v8m16-8v8M10 20h28M17 28h6v6h-6zM28 28h4"/></svg>',
  time: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 42a18 18 0 1 0 0-36 18 18 0 0 0 0 36Z"/><path d="M24 14v12l8 5"/><path d="M13 10l-5 5m27-5 5 5"/></svg>',
  payroll: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 14h28v24H10V14Z"/><path d="M14 20h20M16 29h7m4 0h5M24 34c4 0 7-2 7-5s-3-5-7-5-7 2-7 5 3 5 7 5Z"/></svg>',
  billing: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 8h20l4 6v26l-4-2-4 2-4-2-4 2-4-2-4 2V8Z"/><path d="M18 18h12M18 25h14M18 32h8"/></svg>',
  risk: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 6 40 13v11c0 10-6.5 16-16 18C14.5 40 8 34 8 24V13l16-7Z"/><path d="M24 15v12m0 7v.2"/></svg>',
  analytics: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 36c7-18 13 0 20-16 4-9 8-8 12-6"/><path d="M10 40h30M15 30l5 5 8-12 6 4 6-13"/><path d="M36 7l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z"/></svg>',
  admin: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 18 24 8l14 10v20H10V18Z"/><path d="M18 38V26h12v12M16 19h16M24 8v10"/></svg>'
};

const modules = {
  overview: {
    title: '经营驾驶舱', intent: 'CEO / COO 视角',
    description: '实时汇总城市供给、客户需求、班次履约、毛利与现金流，帮助管理层从指标下钻到动作。',
    metrics: [['活跃员工', '12,480', '+8.2%', '12 个城市供给稳定'], ['本周履约工时', '18,426', '+12.8%', '仓配与客服贡献 71%'], ['项目毛利率', '23.6%', '+2.1%', '低毛利项目剩余 3 个'], ['待处理异常', '17', '-31%', '高危异常 3 条']],
    actions: ['补齐上海仓配夜班 42 人', '审批 6 个超预算班次', '跟进 3 个低毛利项目'],
    pipeline: ['客户需求', '人才匹配', '班次履约', '薪酬对账']
  },
  demand: {
    title: '客户与需求', intent: '销售 / 客成 / 交付协同',
    description: '沉淀客户、门店、项目、岗位、报价、SLA 与用工计划，形成从商机到交付的需求中台。',
    metrics: [['活跃客户', '286', '+12%', 'A 级客户 42 个'], ['开放需求', '1,842', '+21%', '未来 14 天预测'], ['SLA 达成率', '97.4%', '+1.6%', '低于阈值客户 5 个'], ['待报价项目', '19', '-8%', '平均响应 2.1 小时']],
    actions: ['将华东 3 个仓配项目拆分为城市需求包', '提醒客户确认 12 个岗位报价', '预测下周新增客服需求 228 人'],
    pipeline: ['客户档案', '需求预测', '报价审批', '交付 SLA']
  },
  talent: {
    title: '人才与入职', intent: '招聘 / 入职 / 员工运营',
    description: '统一候选人来源、证照校验、电子签、培训与入职资料，沉淀可复用人才池。',
    metrics: [['候选人入库', '3,284', '+18%', '去重命中 312 人'], ['证照待校验', '86', '-9%', '健康证占比 64%'], ['电子签完成率', '94%', '+4%', '平均签署 11 分钟'], ['平均入职周期', '1.8 天', '-42%', '批量入职提速明显']],
    actions: ['AI 解析 240 份新简历', '提醒 18 人补充健康证', '批量发起 73 份劳务协议'],
    pipeline: ['多渠道招聘', 'AI 解析', '证照审核', '电子签入职']
  },
  schedule: {
    title: '智能排班', intent: '运营主管 / 调度中心',
    description: '按技能、距离、偏好、成本、法规与客户 SLA 生成排班建议，并支持抢单、换班与审批。',
    metrics: [['班次覆盖率', '96%', '+5%', '夜班缺口 42 人'], ['可替补人员', '418', '+11%', '10 公里内 281 人'], ['预计迟到风险', '2.4%', '-1.3%', '天气影响低'], ['单小时成本', '¥42.8', '-6%', '低于预算 ¥3.1']],
    actions: ['推荐 58 名高匹配骑手', '自动发布 126 个开放班次', '拦截 4 个超时用工安排'],
    pipeline: ['需求拆班', '智能匹配', '抢单确认', '换班审批']
  },
  time: {
    title: '工时履约', intent: '现场主管 / 客户验收',
    description: '连接移动打卡、设备考勤、主管确认、客户验收和异常申诉，保证履约数据可信。',
    metrics: [['今日到岗率', '98.1%', '+0.8%', '迟到 23 人'], ['异常打卡', '34', '-22%', '跨区域 12 条'], ['客户待验收', '112', '+6%', '超 24h 7 条'], ['申诉平均处理', '3.2 小时', '-38%', 'SLA 内处理']],
    actions: ['复核 12 条跨区域打卡', '推送 38 个班次给客户确认', '自动合并 7 条重复考勤'],
    pipeline: ['移动打卡', '主管确认', '客户验收', '异常申诉']
  },
  payroll: {
    title: '薪酬结算', intent: '薪酬 / 财务 / 税务',
    description: '连接工时、合同、客户账单、服务费、薪税规则和发票，降低人工对账成本。',
    metrics: [['待结算工时', '8,912', '+7%', '本周新增 1,204 单'], ['对账准确率', '99.9%', '+0.3%', '自动匹配 98.6%'], ['员工应发', '¥2.18M', '+11%', '覆盖 4,820 人'], ['异常薪资单', '12', '-46%', '规则冲突 5 条']],
    actions: ['生成 1,204 份工资单', '核对 9 个薪资规则差异', '导出本月个税申报明细'],
    pipeline: ['工时归集', '规则计算', '工资单确认', '发薪归档']
  },
  billing: {
    title: '客户对账', intent: '财务应收 / 客户成功',
    description: '按客户合同、项目费率、工时验收、服务费和发票状态自动生成应收账单。',
    metrics: [['客户应收', '¥4.82M', '+14%', '本周预计回款 ¥1.1M'], ['待开票', '¥1.36M', '+9%', '已验收未开票'], ['账单差异', '9', '-40%', '主要来自费率变更'], ['回款预测', '¥3.74M', '+18%', '置信度 91%']],
    actions: ['生成 28 份客户账单', '标记 3 个逾期回款风险', '同步 16 张发票到财务系统'],
    pipeline: ['合同费率', '客户验收', '账单生成', '开票回款']
  },
  risk: {
    title: '合规风控', intent: '法务 / 风控 / 审计',
    description: '对合同、证照、工时、劳动规则、数据权限和敏感操作进行持续审计与预警。',
    metrics: [['高危预警', '3', '-25%', '需今日处理'], ['证照过期风险', '21', '-18%', '7 天内到期'], ['审计事件', '1,482', '+33%', '敏感操作 16 条'], ['权限异常', '0', '稳定', 'SSO 正常']],
    actions: ['冻结 2 个异常打卡记录', '提醒 21 人更新证照', '复核 3 条跨区域用工规则'],
    pipeline: ['规则引擎', '异常识别', '处置工单', '审计留痕']
  },
  analytics: {
    title: 'AI 分析', intent: '数据团队 / 业务负责人',
    description: '提供需求预测、人岗匹配、流失风险、毛利分析、自然语言报表和知识库 RAG。',
    metrics: [['预测缺口', '312 人', '+24%', '华东仓配为主'], ['流失风险', '8.4%', '-1.2%', '重点关注 96 人'], ['AI 命中率', '91%', '+6%', '排班推荐采纳率'], ['知识库问答', '2,416', '+37%', '可追溯率 100%']],
    actions: ['生成华东仓配供需预测', '解释 5 个低毛利项目原因', '推荐 42 名低流失风险员工'],
    pipeline: ['数据汇聚', '预测模型', 'RAG 问答', '行动建议']
  },
  admin: {
    title: '组织权限', intent: 'IT / 安全 / 平台管理员',
    description: '支持多租户、组织架构、角色权限、字段级权限、SSO、API Key、Webhook 与审计策略。',
    metrics: [['租户数量', '42', '+5', '含 3 个私有化客户'], ['角色模板', '18', '+3', '行业模板可复用'], ['API 调用', '1.2M', '+29%', '错误率 0.03%'], ['SSO 成功率', '99.99%', '稳定', 'MFA 覆盖 91%']],
    actions: ['为新客户复制零售行业权限模板', '轮换 2 个即将过期 API Key', '导出本周敏感操作审计'],
    pipeline: ['多租户', 'RBAC/ABAC', '集成配置', '安全审计']
  }
};


const recordTemplates = {
  overview: [['上海仓配夜班', '缺口 42 人', '高优先级'], ['华南客服项目', '毛利 18.2%', '需复盘'], ['杭州零售门店', '到岗率 99.1%', '健康']],
  demand: [['盒马华东仓', '新增 320 人需求', '报价待确认'], ['连锁茶饮 A', '周末峰值 186 人', 'SLA 关注'], ['制造客户 B', '短期扩产 94 人', '待拆班']],
  talent: [['李明', '叉车证已验证', '可立即上岗'], ['王雨', '健康证 7 天到期', '需提醒'], ['赵强', '夜班偏好', '高匹配']],
  schedule: [['仓配夜班 A', '58 人推荐池', '待发布'], ['客服早班 B', '覆盖率 92%', '需替补'], ['门店周末班', '成本低于预算', '可确认']],
  time: [['上海仓 A-031', '跨区域打卡', '待复核'], ['客服 C-118', '客户未验收', '超 20h'], ['门店 M-022', '重复考勤', '可合并']],
  payroll: [['6 月第一批工资', '1,204 份工资单', '待确认'], ['华东仓配薪资', '9 条规则差异', '需核对'], ['个税申报包', '4,820 人', '可导出']],
  billing: [['盒马华东账单', '¥1.12M', '待开票'], ['茶饮周末项目', '3 条费率差异', '需确认'], ['客服中心账单', '回款风险', '需跟进']],
  risk: [['跨区域用工', '3 条规则冲突', '高危'], ['证照过期', '21 人即将到期', '需提醒'], ['敏感导出', '16 条审计事件', '待复核']],
  analytics: [['华东供需预测', '缺口 312 人', '置信度 91%'], ['低毛利解释', '5 个项目', '已生成'], ['流失风险名单', '96 人', '需运营跟进']],
  admin: [['零售权限模板', '可复用', '待发布'], ['API Key 轮换', '2 个到期', '需处理'], ['SSO 策略', 'MFA 91%', '健康']]
};






const enterpriseLoops = [
  ['Loop 11', '绩效与服务质量', 'NPS 68 · 投诉率 0.8%', '按客户、门店、班组追踪服务质量'],
  ['Loop 12', '留存与员工关怀', '流失风险 8.4%', '收入波动、排班稳定性与反馈联动'],
  ['Loop 13', '灵活用工市场', '可用供给 4,186 人', '支持抢单、候补池与城市调剂'],
  ['Loop 14', '全球化与多主体', '42 租户 · 6 主体', '多币种、多法人、多税务口径'],
  ['Loop 15', '安全运营中心', '0 权限异常', 'SSO、MFA、API Key 与敏感导出监控']
];

const advancedLoops = [
  ['Loop 6', '组织编制与预算', '编制 1,280 / 在岗 1,214', '预算消耗 82% · 缺口 66'],
  ['Loop 7', '合同与文档金库', '合同 12,480 份', '过期风险 21 · 归档完整率 99.2%'],
  ['Loop 8', '培训认证学院', '完成率 94%', '待补训 73 人 · 高危岗位 100% 覆盖'],
  ['Loop 9', '客户 SLA 门户', '验收及时率 97.4%', '待客户确认 112 单'],
  ['Loop 10', '成本分摊与毛利', '项目毛利 23.6%', '低毛利项目 3 个 · 可优化 ¥82k']
];

const employeeProfiles = [
  ['E-1024', '张伟', '仓配夜班', '96', '已签约 · 证照齐全 · 可上岗'],
  ['E-1188', '刘洋', '客服早班', '91', '培训完成 · 低流失风险'],
  ['E-1290', '陈晨', '门店周末班', '88', '同店经验 · 成本优势']
];

const approvalFlow = ['客户需求确认', '预算与报价审批', '合规规则校验', '排班发布', '客户验收'];
const riskHeatmap = [['合同缺失', '低', '2'], ['超时用工', '中', '7'], ['证照过期', '中', '21'], ['跨区域派工', '高', '3']];
const integrationHealth = [['电子签', '99.99%', '正常'], ['财务 ERP', '99.95%', '正常'], ['短信/IM', '99.90%', '关注'], ['考勤设备', '99.80%', '关注']];

const deliveryPlanner = [
  ['08:00-12:00', '客服早班', '92%', '缺 18 人'],
  ['12:00-18:00', '门店午晚高峰', '97%', '健康'],
  ['20:00-02:00', '仓配夜班', '84%', '缺 42 人']
];

const complianceRules = ['连续工时 ≤ 10 小时', '证照有效且实名一致', '跨区域派工需主管复核', '客户 SLA 验收时限 24h'];

const matchingMatrix = [
  ['张伟', '仓配夜班', '96', '距离 3.2km · 夜班偏好 · 到岗稳定'],
  ['刘洋', '客服早班', '91', '普通话认证 · 近 30 天零迟到'],
  ['陈晨', '门店周末班', '88', '同门店经验 · 成本低于预算']
];

const commandSuggestions = ['补齐上海仓配夜班 42 人', '生成华东供需预测报告', '打开 6 月第一批工资单', '排查 3 条跨区域用工风险', '创建连锁茶饮周末峰值需求', '导出本周敏感操作审计'];

const scenarios = [
  ['618 电商仓配高峰', '缺口 312 人', 'SLA 风险 低'],
  ['连锁茶饮周末峰值', '缺口 186 人', 'SLA 风险 中'],
  ['制造短期扩产项目', '缺口 94 人', 'SLA 风险 低'],
  ['客服中心大促支援', '缺口 228 人', 'SLA 风险 中']
];

const content = document.querySelector('#moduleContent');
const tabs = document.querySelectorAll('.module-tab');
let scenarioIndex = 0;
let activeModule = 'overview';

function decorateTabs() {
  tabs.forEach(tab => {
    const icon = iconSet[tab.dataset.module] || iconSet.overview;
    tab.innerHTML = `<span class="nav-icon">${icon}</span><span>${tab.textContent}</span>`;
  });
}

function renderModule(key) {
  activeModule = key;
  const module = modules[key];
  content.innerHTML = `
    <div class="module-hero">
      <div>
        <p class="eyebrow">${module.intent}</p>
        <h2>${iconSet[key]}${module.title}</h2>
        <p>${module.description}</p>
      </div>
      <div class="ai-card">
        <span>AI Copilot 建议</span>
        <strong>${module.actions[0]}</strong>
        <p>已结合供需预测、成本约束、履约历史与合规规则生成。</p>
      </div>
    </div>
    <div class="process-rail">
      ${module.pipeline.map((step, index) => `<button type="button"><b>${index + 1}</b><span>${step}</span></button>`).join('')}
    </div>
    <div class="workbench-grid">
      ${module.metrics.map(([label, value, delta, detail], index) => `
        <article class="metric-card interactive-card" tabindex="0" role="button" data-metric="${index}">
          <span>${label}</span>
          <strong>${value}</strong>
          <p>${delta}</p>
          <small>${detail}</small>
        </article>
      `).join('')}
    </div>
    <div class="operations-panel">
      <div>
        <h3>下一步推荐动作</h3>
        <p>系统按影响范围、时效、毛利和风险自动排序，运营主管可一键派发。</p>
      </div>
      <ul>
        ${module.actions.map((action, index) => `<li><button type="button" class="action-check" aria-label="完成动作 ${index + 1}"></button><span>${action}</span></li>`).join('')}
      </ul>
    </div>
    <div class="data-board">
      <div class="data-board-header">
        <div>
          <h3>实战数据工作区</h3>
          <p>可选择记录、批量派发、联动 AI 建议与审计日志。</p>
        </div>
        <button type="button" id="bulkAction">批量派发</button>
      </div>
      <div class="record-list">
        ${(recordTemplates[key] || []).map((row, index) => `<label class="record-row"><input type="checkbox" data-record="${index}"><span>${row[0]}</span><strong>${row[1]}</strong><em>${row[2]}</em></label>`).join('')}
      </div>
      <p class="bulk-status" id="bulkStatus">请选择需要处理的业务记录。</p>
    </div>
    <div class="decision-matrix">
      <div class="data-board-header">
        <div>
          <h3>AI 人岗匹配矩阵</h3>
          <p>按技能、距离、偏好、历史履约、成本和合规约束生成可解释匹配分。</p>
        </div>
        <button type="button" id="simulatePlan">模拟最优方案</button>
      </div>
      ${matchingMatrix.map(row => `<div class="match-row"><span>${row[0]}</span><strong>${row[1]}</strong><b>${row[2]}</b><em>${row[3]}</em></div>`).join('')}
      <p class="bulk-status" id="simulationStatus">点击模拟后，将评估成本、覆盖率与 SLA 风险。</p>
    </div>
    <div class="delivery-planner">
      <div class="data-board-header">
        <div>
          <h3>履约计划编排器</h3>
          <p>把需求、人员、班次、规则和客户 SLA 放到同一张作战图中。</p>
        </div>
        <button type="button" id="generatePlan">一键生成履约计划</button>
      </div>
      <div class="shift-timeline">
        ${deliveryPlanner.map(row => `<div class="shift-row"><span>${row[0]}</span><strong>${row[1]}</strong><i style="--coverage:${row[2]}"></i><em>${row[2]} · ${row[3]}</em></div>`).join('')}
      </div>
      <div class="rule-chips">${complianceRules.map(rule => `<span>${rule}</span>`).join('')}</div>
      <p class="bulk-status" id="planStatus">等待生成跨模块履约计划。</p>
    </div>
    <div class="five-loop-grid">
      <section class="loop-card">
        <div class="loop-title"><span>Loop 1</span><h3>员工 360 画像</h3></div>
        ${employeeProfiles.map(row => `<button type="button" class="profile-row" data-profile="${row[1]}"><b>${row[0]}</b><strong>${row[1]} · ${row[2]}</strong><em>匹配 ${row[3]} · ${row[4]}</em></button>`).join('')}
      </section>
      <section class="loop-card">
        <div class="loop-title"><span>Loop 2</span><h3>审批流编排</h3></div>
        <ol class="approval-flow">${approvalFlow.map(step => `<li>${step}</li>`).join('')}</ol>
        <button type="button" id="advanceApproval">推进下一审批节点</button><p id="approvalStatus" class="bulk-status">当前等待客户需求确认。</p>
      </section>
      <section class="loop-card">
        <div class="loop-title"><span>Loop 3</span><h3>薪酬规则沙盘</h3></div>
        <div class="payroll-sandbox"><label>时薪<input id="hourRate" type="number" value="42" /></label><label>工时<input id="workHours" type="number" value="168" /></label><strong id="payrollResult">¥7,056</strong></div>
      </section>
      <section class="loop-card">
        <div class="loop-title"><span>Loop 4</span><h3>合规风险热力图</h3></div>
        <div class="risk-heatmap">${riskHeatmap.map(row => `<span data-risk="${row[1]}"><b>${row[0]}</b><strong>${row[2]}</strong><em>${row[1]}</em></span>`).join('')}</div>
      </section>
      <section class="loop-card">
        <div class="loop-title"><span>Loop 5</span><h3>集成健康监控</h3></div>
        ${integrationHealth.map(row => `<div class="integration-row"><span>${row[0]}</span><strong>${row[1]}</strong><em>${row[2]}</em></div>`).join('')}
      </section>
    </div>
    <div class="advanced-loop-grid">
      ${advancedLoops.map((loop, index) => `<button type="button" class="advanced-loop-card" data-loop="${loop[1]}"><span>${loop[0]}</span><strong>${loop[1]}</strong><b>${loop[2]}</b><em>${loop[3]}</em><i style="--p:${62 + index * 7}%"></i></button>`).join('')}
    </div>
    <div class="enterprise-loop-grid">
      ${enterpriseLoops.map(loop => `<article class="enterprise-loop-card" data-enterprise-loop="${loop[1]}"><span>${loop[0]}</span><h3>${loop[1]}</h3><strong>${loop[2]}</strong><p>${loop[3]}</p><button type="button">下钻分析</button></article>`).join('')}
    </div>
    <aside class="insight-drawer" id="insightDrawer" aria-live="polite">
      <span>指标详情</span>
      <strong>点击任一指标查看根因分析</strong>
      <p>会展示该指标的业务解释、推荐动作和可追溯上下文。</p>
    </aside>
  `;
}

function openInsight(metricIndex) {
  const [label, value, delta, detail] = modules[activeModule].metrics[metricIndex];
  const drawer = document.querySelector('#insightDrawer');
  drawer.classList.add('open');
  drawer.innerHTML = `<span>指标详情</span><strong>${label} · ${value}</strong><p>${detail}，趋势 ${delta}。AI 建议优先处理与「${modules[activeModule].actions[0]}」相关的任务，并同步记录到审计日志。</p>`;
}

decorateTabs();
renderModule(activeModule);

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(item => item.classList.remove('active'));
    tab.classList.add('active');
    renderModule(tab.dataset.module);
  });
});

content.addEventListener('click', event => {
  const card = event.target.closest('[data-metric]');
  const action = event.target.closest('.action-check');
  if (card) openInsight(Number(card.dataset.metric));
  if (action) action.closest('li').classList.toggle('done');
});

content.addEventListener('keydown', event => {
  if (event.key === 'Enter' && event.target.matches('[data-metric]')) {
    openInsight(Number(event.target.dataset.metric));
  }
});

document.querySelector('#scenarioButton').addEventListener('click', () => {
  scenarioIndex = (scenarioIndex + 1) % scenarios.length;
  const [label, need, sla] = scenarios[scenarioIndex];
  document.querySelector('#scenarioLabel').textContent = label;
  document.querySelector('#scenarioNeed').textContent = need;
  document.querySelector('#scenarioSla').textContent = sla;
});


function renderCommandResults(keyword = '') {
  const results = commandSuggestions.filter(item => item.includes(keyword.trim()) || !keyword.trim());
  document.querySelector('#commandResults').innerHTML = results.map((item, index) => `<button type="button"><span>0${index + 1}</span>${item}</button>`).join('');
}

document.querySelector('#commandButton').addEventListener('click', () => {
  document.querySelector('#commandOverlay').classList.add('open');
  document.querySelector('#commandOverlay').setAttribute('aria-hidden', 'false');
  renderCommandResults();
  document.querySelector('#commandInput').focus();
});

document.querySelector('#closeCommand').addEventListener('click', () => {
  document.querySelector('#commandOverlay').classList.remove('open');
  document.querySelector('#commandOverlay').setAttribute('aria-hidden', 'true');
});

document.querySelector('#commandInput').addEventListener('input', event => renderCommandResults(event.target.value));

content.addEventListener('click', event => {
  if (event.target.matches('#bulkAction')) {
    const checked = content.querySelectorAll('[data-record]:checked').length;
    content.querySelector('#bulkStatus').textContent = checked ? `已选择 ${checked} 条记录，AI 已生成批量派发草案。` : '请先选择至少一条业务记录。';
  }
  if (event.target.matches('#simulatePlan')) {
    content.querySelector('#simulationStatus').textContent = '模拟完成：覆盖率 +3.8%，小时成本 -¥2.4，SLA 风险降低到低。';
    appendAudit(`模拟「${modules[activeModule].title}」最优匹配方案`);
  }
  if (event.target.matches('#generatePlan')) {
    content.querySelector('#planStatus').textContent = '已生成履约计划：补员 42 人、主管复核 3 条、客户验收节点 12 个、预计毛利 +1.6%。';
    appendAudit(`生成「${modules[activeModule].title}」跨模块履约计划`);
  }
  if (event.target.closest('.profile-row')) {
    const name = event.target.closest('.profile-row').dataset.profile;
    openInsight(0);
    document.querySelector('#insightDrawer').innerHTML = `<span>员工 360</span><strong>${name} · 全链路画像</strong><p>已汇总合同、证照、培训、偏好、到岗、薪酬、风控与客户反馈，可直接进入排班或续签动作。</p>`;
    appendAudit(`查看 ${name} 员工 360 画像`);
  }
  if (event.target.matches('#advanceApproval')) {
    content.querySelector('#approvalStatus').textContent = '已推进：预算与报价审批完成，正在进行合规规则校验。';
    appendAudit(`推进「${modules[activeModule].title}」审批流`);
  }
  if (event.target.closest('.advanced-loop-card')) {
    const name = event.target.closest('.advanced-loop-card').dataset.loop;
    document.querySelector('#insightDrawer').classList.add('open');
    document.querySelector('#insightDrawer').innerHTML = `<span>高级实战模块</span><strong>${name}</strong><p>已联动组织、合同、培训、SLA、成本与审计数据，可继续下钻到责任人、规则、预算和客户影响。</p>`;
    appendAudit(`打开高级模块「${name}」`);
  }
  if (event.target.closest('.enterprise-loop-card')) {
    const name = event.target.closest('.enterprise-loop-card').dataset.enterpriseLoop;
    document.querySelector('#insightDrawer').classList.add('open');
    document.querySelector('#insightDrawer').innerHTML = `<span>企业级能力</span><strong>${name}</strong><p>已进入顶级 HR 系统的企业治理视角：质量、留存、市场供给、全球主体与安全运营统一联动。</p>`;
    appendAudit(`下钻企业级能力「${name}」`);
  }
});



const auditEvents = ['系统初始化：已加载多租户策略', 'AI 风控：完成今日证照扫描', '排班引擎：刷新候选人可用性'];

function appendAudit(message) {
  auditEvents.unshift(`${new Date().toLocaleTimeString('zh-CN', { hour12: false })} · ${message}`);
  const timeline = document.querySelector('#auditTimeline');
  if (timeline) timeline.innerHTML = auditEvents.slice(0, 5).map(event => `<li>${event}</li>`).join('');
}

function injectAuditTimeline() {
  const existing = document.querySelector('#auditTimeline');
  if (existing) return;
  content.insertAdjacentHTML('beforeend', `
    <div class="audit-panel">
      <div>
        <h3>实时审计与协同动态</h3>
        <p>所有 AI 建议、批量派发、需求创建和敏感操作都会记录，满足企业级追溯。</p>
      </div>
      <ol id="auditTimeline">${auditEvents.map(event => `<li>${event}</li>`).join('')}</ol>
    </div>
  `);
}

const originalRenderModule = renderModule;
renderModule = function patchedRenderModule(key) {
  originalRenderModule(key);
  injectAuditTimeline();
};
renderModule(activeModule);

content.addEventListener('click', event => {
  if (event.target.matches('#bulkAction')) {
    const checked = content.querySelectorAll('[data-record]:checked').length;
    if (checked) appendAudit(`批量派发 ${checked} 条「${modules[activeModule].title}」记录`);
  }
  if (event.target.closest('.action-check')) appendAudit(`更新「${modules[activeModule].title}」推荐动作状态`);
});

document.querySelector('#createDemandButton').addEventListener('click', () => {
  document.querySelector('#createDrawer').classList.add('open');
  document.querySelector('#createDrawer').setAttribute('aria-hidden', 'false');
});

document.querySelector('#closeCreate').addEventListener('click', () => {
  document.querySelector('#createDrawer').classList.remove('open');
  document.querySelector('#createDrawer').setAttribute('aria-hidden', 'true');
});

document.querySelector('#demandForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  document.querySelector('#createResult').textContent = `已创建 ${data.city} · ${data.client} · ${data.role} ${data.count} 人需求，AI 已生成候选池与排班草案。`;
  appendAudit(`创建 ${data.client} ${data.role} ${data.count} 人需求`);
});


content.addEventListener('input', event => {
  if (event.target.matches('#hourRate, #workHours')) {
    const rate = Number(content.querySelector('#hourRate').value || 0);
    const hours = Number(content.querySelector('#workHours').value || 0);
    content.querySelector('#payrollResult').textContent = `¥${(rate * hours).toLocaleString('zh-CN')}`;
  }
});
