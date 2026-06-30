# FlexForce HR Cloud

对标硅谷顶尖 SaaS 的人力资源管理系统概念版，重点覆盖灵活用工、人力资源服务商与高波峰企业的一体化运营场景。

## 核心定位

FlexForce HR Cloud 将招聘、人才池、合同电子签、智能排班、工时采集、薪酬结算、客户对账、合规风控与经营分析整合到一个现代化 SaaS 平台中，帮助企业提升交付效率并降低用工风险。

## 当前交付

本仓库当前交付的是 **Vite + React + TypeScript 产品化前端工程**，不再是静态 HTML/app.js demo。首屏即综合 HR SaaS 工作台，聚焦灵活用工与企业 HR 的全产品闭环。

- `index.html`：Vite 应用入口，挂载 React 工作台。
- `src/App.tsx`：产品状态编排，管理用工需求、审批状态、排班计划、工时记录、薪酬结算、客户账单、审计日志与 API 快照同步状态。
- `src/components/`：通用产品组件，包括侧边栏、AI 指挥中心、创建需求抽屉。
- `src/modules/`：核心业务模块工作区，展示需求状态流、AI 匹配、排班/工时/薪酬联动。
- `src/data/`：前端模拟租户、客户、需求、员工、班次、工时、薪酬和账单数据。
- `src/types/`：TypeScript 业务类型模型。
- `src/api/workforceApi.ts`：前端 API client，可通过 `VITE_API_BASE_URL` 对接 NestJS API 快照与核心写操作，并将 Prisma 枚举状态规范化为中文产品状态。
- `src/styles.css`：统一的深色玻璃拟态 SaaS 视觉系统。

当前前端仍以内存模拟数据为主，但已具备 `同步 API 快照` 入口：当 NestJS API 可用时，工作台可读取 `/api/workforce/snapshot` 并将需求、排班、工时、薪酬、账单和审计快照灌入 React state。同步成功后，创建需求、推进状态、生成排班和结算会优先尝试调用 NestJS API；如果 API 不可用，会明确提示并回退到本地模拟状态，便于产品演示不断流。API 返回的 `QUOTING / APPROVAL / SCHEDULING / IN_PROGRESS / COMPLETED` 会在前端规范化为 `待报价 / 待审批 / 待排班 / 履约中 / 已完成`，避免后端枚举直接泄漏到业务 UI。下一阶段需要补齐鉴权、租户隔离、权限控制和完整接口测试。

## 推荐语言栈、数据库与 AI 能力

### 语言栈

- **前端**：TypeScript、React、Next.js、Tailwind CSS，用于管理后台、客户门户和员工自助端。
- **后端**：TypeScript、Node.js、NestJS，按招聘、员工、合同、排班、工时、薪酬、结算、权限等业务域模块化拆分。
- **移动端**：React Native 或 Flutter，用于员工抢单、打卡、换班、资料提交和消息通知。
- **基础设施**：Docker、Kubernetes、OpenTelemetry、CI/CD，支持公有云、专有云与私有化部署。

### 为什么推荐这套语言栈

- **统一 TypeScript 降低协作成本**：HR SaaS 需要快速迭代大量表单、审批流、权限配置和业务规则。前后端统一 TypeScript 后，类型、DTO、API Schema 和校验逻辑可以复用，减少沟通与联调成本。
- **React / Next.js 适合复杂 B2B SaaS 控制台**：招聘漏斗、排班日历、工时表、薪酬账单、权限矩阵和分析仪表盘都属于高交互后台场景，React 生态成熟；Next.js 兼顾管理端路由、服务端渲染、权限保护页面和多租户工作台性能优化。
- **NestJS 更适合企业级模块化后端**：它天然支持模块、依赖注入、Guard、Interceptor、Pipe 和 OpenAPI，便于拆分招聘、合同、排班、薪酬、结算、审计等领域服务，也方便未来演进到微服务或事件驱动架构。
- **Node.js 适合 I/O 密集型 SaaS 集成**：灵活用工系统会频繁对接电子签、短信、IM、财务、税务、考勤设备、客户系统和 Webhook，Node.js 对 API 网关、异步任务、实时通知和连接器开发效率较高。
- **移动端选择 React Native / Flutter 是为了一套业务多端复用**：员工抢单、打卡、换班、证照上传、通知确认等移动场景变化快，跨平台框架能降低 iOS/Android 双端维护成本。
- **该组合利于招聘与长期维护**：TypeScript、React、Node.js、PostgreSQL 都有成熟社区和人才供给，适合从 MVP 逐步扩展到多租户企业级平台。

### 数据库与数据组件

- **PostgreSQL**：核心交易库，承载多租户组织、员工、合同、班次、工时、薪酬、账单和审计数据。
- **Redis**：缓存、分布式锁、排班抢单、验证码、实时状态和轻量队列。
- **对象存储（S3 兼容）**：保存合同、证照、发票、工资单、导入导出文件和审计附件。
- **Elasticsearch / OpenSearch**：用于候选人、员工、合同、客户、岗位和操作日志的全文检索。
- **ClickHouse / BigQuery**：用于经营分析、用工预测、毛利分析和大规模工时明细查询。
- **pgvector / 专用向量数据库**：用于简历、岗位、制度、合同模板和知识库的语义检索。

### AI 能力

- **简历与证照解析**：自动抽取姓名、技能、经验、证照、可上岗时间和风险字段。
- **人岗匹配与排班推荐**：结合技能、距离、偏好、历史到岗率、成本、法规约束和客户 SLA 生成推荐。
- **需求预测**：基于历史订单、季节性、城市供给和客户波动预测未来人员缺口。
- **异常工时与合规风控**：识别超时、重复打卡、跨区域异常、证照过期、合同缺失和薪税规则冲突。
- **HR Copilot**：面向运营、HRBP、财务和客户成功，提供自然语言查询、报表解读、政策问答和待办生成。
- **知识库 RAG**：连接员工手册、劳动法规、客户 SLA、合同模板和内部 SOP，输出可追溯答案。

## 本地运行

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

开发预览默认由 Vite 提供；Cloud 环境如果 npm registry 受限，需要在可访问 npm registry 的环境中执行 `npm install`。



## 后端 API / 数据库底座

本仓库已新增 NestJS + PostgreSQL + Prisma API 雏形：

- `server/prisma/schema.prisma`：定义租户、客户、需求、员工、班次、工时、薪酬批次、账单、审计事件等核心模型。
- `server/src/workforce.controller.ts`：提供 `GET /api/workforce/snapshot`、创建需求、推进需求、生成排班、生成结算批次等接口。
- `server/src/workforce.service.ts`：封装 Prisma 读写、需求状态流转、排班创建、结算与审计写入。
- `src/api/workforceApi.ts`：前端 API client，已封装 snapshot、createDemand、advanceDemand、scheduleDemand、settle 等接口入口。
- `server/src/workforce.dto.ts`：定义创建需求、排班、结算的基础 DTO，避免 Controller 直接吞裸对象。
- `server/src/status-flow.ts`：统一维护需求状态流，后续可升级为状态机/审批引擎。
- `server/prisma/seed.ts`：提供本地 PostgreSQL 初始化数据，便于产品、前端和后端联调。

后端运行计划：

```bash
npm --prefix server install
DATABASE_URL=postgresql://user:password@localhost:5432/flexforce npm run prisma:migrate
DATABASE_URL=postgresql://user:password@localhost:5432/flexforce npm run prisma:seed
VITE_API_BASE_URL=http://localhost:3000/api npm run dev
npm run api:dev
```

API 可用后，在前端工作台点击 `同步 API 快照` 可把 PostgreSQL 中的业务数据同步到当前产品界面。

当前 Cloud 环境 npm registry 受限时，后端依赖安装需要在可访问 npm registry 的环境执行。

## 产品化演进路线

当前已经完成前端工程化底座。下一阶段建议演进为：

1. **前端**：继续拆分模块视图、引入路由、表单校验、API mutation 状态管理、可访问性测试和 Playwright 视觉回归。
2. **后端**：继续将 NestJS API 从单一 WorkforceService 拆分为客户需求、人才、排班、工时、薪酬、结算、风控、审计等领域服务。
3. **数据库**：使用 PostgreSQL + Prisma 承载多租户交易数据，Redis 负责缓存/队列/锁，对象存储保存合同证照。
4. **AI 与数据**：引入 RAG 知识库、人岗匹配模型、需求预测、异常工时检测、薪酬公平分析和自然语言 BI。
5. **工程化**：补充 CI/CD、OpenTelemetry、多租户权限测试、API contract test 和数据迁移流程。

## 后续产品化路线

1. 多租户账号、组织、角色与字段级权限。
2. 员工/候选人/客户/主管多端门户。
3. 招聘漏斗、人才池、电子签与入职流程编排。
4. 智能排班、移动打卡、异常工时与审批流。
5. 薪酬结算、客户对账、发票、毛利与现金流分析。
6. API、Webhook、SSO、审计日志与私有化部署能力。
