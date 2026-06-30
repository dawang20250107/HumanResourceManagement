# FlexForce HR Cloud

对标硅谷顶尖 SaaS 的人力资源管理系统,聚焦**灵活用工**、人力资源服务商与高波峰企业的一体化运营。本仓库已从早期的纯前端概念稿,**重构为可运行的真实全栈技术栈**(Next.js + NestJS + PostgreSQL,pnpm monorepo)。

> 旧的单页概念稿保留在 [`legacy/`](./legacy) 目录,便于对照设计与文案。

## 架构总览

```
flexforce-hr-cloud/            # pnpm workspace 根
├── apps/
│   ├── web/                   # @flexforce/web  — Next.js 14 (App Router) 前端工作台
│   └── api/                   # @flexforce/api  — NestJS + Prisma 后端服务
├── packages/
│   └── shared/                # @flexforce/shared — 前后端共享的类型契约与种子数据(单一数据源)
├── legacy/                    # 早期纯前端概念稿(index.html / app.js / styles.css)
├── docker-compose.yml         # 本地 PostgreSQL + Redis
└── pnpm-workspace.yaml
```

**契约优先**:所有领域类型、API DTO 与演示数据都集中在 `@flexforce/shared`。后端用它给数据库播种,前端用它做类型与降级兜底,因此**前后端的数据形状永远一致**。

### 技术栈

| 层 | 选型 |
| --- | --- |
| 前端 | TypeScript · Next.js 14(App Router)· Tailwind CSS · Framer Motion · TanStack Query |
| 后端 | TypeScript · NestJS 10 · Prisma 6 · class-validator · Swagger/OpenAPI |
| 数据库 | PostgreSQL 16(Prisma 迁移)· Redis(为缓存/队列预留) |
| 工程 | pnpm workspaces · Docker Compose |

### 功能模块(10 个)

经营驾驶舱 · 客户与需求 · 人才与入职 · 智能排班 · 工时履约 · 薪酬结算 · 客户对账 · 合规风控 · AI 分析 · 组织权限。

每个模块由数据库驱动,统一渲染:模块简介 + AI Copilot 建议 + 流程轨道 + 指标卡(数字滚动动画 + 根因下钻)+ 推荐动作(可勾选)+ 实战数据工作区(批量派发)+ AI 人岗匹配矩阵 + 履约计划编排器 + 5 个核心 Loop(员工 360 / 审批流 / **实时薪酬沙盘** / 风险热力图 / 集成健康)+ 高级与企业级能力卡 + **实时审计时间线**。

顶层还提供:高峰场景切换、**AI 指挥中心命令面板**、**创建用工需求抽屉**(真实写库 + SLA 风险推断)、指标洞察抽屉、操作 Toast。所有交互均带 Framer Motion 微动效(共享元素高亮、入场错峰、抽屉弹簧、动画进度条等)。

## 快速开始

### 前置依赖

- Node.js ≥ 20、pnpm ≥ 10
- Docker(用于本地 PostgreSQL),或一个可用的 PostgreSQL 16 实例

### 1. 安装依赖

```bash
pnpm install
pnpm --filter @flexforce/shared build      # 构建共享契约包
```

### 2. 启动数据库并初始化

```bash
cp .env.example apps/api/.env              # 配置 DATABASE_URL 等
pnpm db:up                                 # docker compose 起 postgres + redis
pnpm --filter @flexforce/api prisma:generate
pnpm db:migrate                            # 应用迁移
pnpm db:seed                               # 写入 10 个模块 + 工作台种子数据
```

### 3. 启动前后端

```bash
pnpm dev          # 同时启动 api(:4000)与 web(:3000)
# 或分别启动
pnpm dev:api      # NestJS  → http://localhost:4000/api  (Swagger: /api/docs)
pnpm dev:web      # Next.js → http://localhost:3000
```

打开 <http://localhost:3000> 体验综合 SaaS 工作台。若后端未启动,前端会自动降级到 `@flexforce/shared` 的种子快照渲染,保证页面始终可用。

## 常用脚本(根目录)

| 命令 | 作用 |
| --- | --- |
| `pnpm dev` | 并行启动 api + web |
| `pnpm build` | 构建 shared → api → web |
| `pnpm typecheck` | 全仓类型检查 |
| `pnpm db:up` / `db:down` | 启停本地 PostgreSQL + Redis |
| `pnpm db:migrate` / `db:seed` / `db:reset` | 迁移 / 播种 / 重置数据库 |

## API 概览

后端统一前缀 `/api`,Swagger 文档位于 `/api/docs`。

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/health` | 存活探针 + 数据库连通性 |
| GET | `/api/modules` | 模块列表(导航) |
| GET | `/api/modules/:key` | 单模块完整工作台数据 |
| GET | `/api/workspace` | 工作台聚合(指标 / 场景 / 矩阵 / Loop / 风险 / 集成…) |
| GET | `/api/scenarios` | 高峰场景列表 |
| GET / POST | `/api/audit` | 读取 / 追加审计事件 |
| GET / POST | `/api/demands` | 列出 / 创建用工需求(写库 + 审计 + SLA 风险推断) |
| POST | `/api/payroll/estimate` | 薪酬沙盘:时薪 × 工时估算应发 |
| GET | `/api/command/suggestions?q=` | AI 指挥中心命令建议(可过滤) |

## 数据模型(Prisma)

`Tenant`、`Module`(含 `Metric` / `ModuleAction` / `PipelineStep` / `DemoRecord`)、`Client`、`Demand`、`AuditLog`,以及工作台参考数据表(`Scenario`、`MatchRow`、`DeliverySlot`、`LoopCard`、`RiskHeatCell`、`IntegrationStatus`、`ExecutiveMetric`、`CommandSuggestion` 等)。`Demand` 与 `AuditLog` 为真实事务实体,其余为可播种的展示配置数据。

## 后续产品化路线

1. 多租户鉴权(JWT / SSO)与字段级 RBAC/ABAC。
2. 员工 / 候选人 / 客户 / 主管多端门户。
3. 招聘漏斗、电子签与入职流程编排。
4. 智能排班、移动打卡、异常工时与审批流落库。
5. 薪酬结算、客户对账、发票、毛利与现金流分析。
6. Redis 队列、Webhook、审计导出与私有化部署。

---

### 说明

- 本仓库为概念到工程化的演进版本,种子数据为演示数据,AI 能力以接口/交互形态呈现,尚未接入真实模型。
- 在受限网络环境中 `pnpm install` 若无法自动下载 Prisma 引擎,可在能联网时执行 `pnpm --filter @flexforce/api prisma:generate` 重试。
