# AGENTS.md

本仓库是 FlexForce HR Cloud 的产品化原型。Codex 后续开发请遵守：

1. 保持当前主线为“综合人力资源 SaaS / 灵活用工操作系统”，不要退回官网或纯展示页。
2. 不要删除现有核心模块名称：overview、demand、talent、schedule、time、payroll、billing、risk、analytics、admin。
3. 当前阶段保持零构建静态预览，除非用户明确要求，不要引入 React、Next、npm package 或复杂构建链。
4. 交互必须体现真实业务流：需求、审批、排班、履约、结算、对账、风控、审计之间要能看到数据流动。
5. 新增 UI 必须延续深色玻璃拟态 SaaS 视觉系统，并确保移动端不溢出。
6. 所有弹窗、抽屉和可交互控件应尽量具备基础 aria 状态、键盘 Escape 关闭和明确的状态反馈。
7. 修改后至少运行：`node --check app.js` 和 Python HTMLParser 解析 `index.html`。
