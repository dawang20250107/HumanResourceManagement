/**
 * FlexForce HR Cloud — shared domain contract.
 *
 * This file is the single source of truth for the shapes exchanged between the
 * NestJS API and the Next.js web app. Both sides import from `@flexforce/shared`
 * so the wire format can never drift.
 */

export const MODULE_KEYS = [
  'overview',
  'demand',
  'talent',
  'schedule',
  'time',
  'payroll',
  'billing',
  'risk',
  'analytics',
  'admin',
] as const;

export type ModuleKey = (typeof MODULE_KEYS)[number];

/** A KPI tile rendered on a module workbench. */
export interface Metric {
  label: string;
  value: string;
  /** Trend descriptor, e.g. "+8.2%" or "稳定". */
  delta: string;
  /** Supporting context shown under the value. */
  detail: string;
}

/** A row in a module's "data work area" record list. */
export interface ModuleRecord {
  id: string;
  name: string;
  value: string;
  status: string;
}

/** Lightweight module descriptor used by the navigation / module index. */
export interface ModuleSummary {
  key: ModuleKey;
  title: string;
  /** Persona / point of view, e.g. "CEO / COO 视角". */
  intent: string;
  description: string;
  order: number;
}

/** Full module payload powering a workbench view. */
export interface ModuleDetail extends ModuleSummary {
  metrics: Metric[];
  /** AI-recommended next actions, highest impact first. */
  actions: string[];
  /** Ordered process-rail steps. */
  pipeline: string[];
  records: ModuleRecord[];
}

/** Peak-demand scenario shown in the header strip + switcher. */
export interface Scenario {
  id: string;
  label: string;
  need: string;
  sla: string;
}

/** AI person-to-post matching row. */
export interface MatchRow {
  name: string;
  role: string;
  score: number;
  reason: string;
}

/** A shift window in the delivery planner timeline. */
export interface DeliverySlot {
  window: string;
  label: string;
  /** Coverage percentage 0-100. */
  coverage: number;
  note: string;
}

/** Employee 360 profile card. */
export interface EmployeeProfile {
  code: string;
  name: string;
  role: string;
  matchScore: number;
  note: string;
}

export type LoopGroup = 'advanced' | 'enterprise';

/** Advanced / enterprise capability loop card. */
export interface LoopCard {
  group: LoopGroup;
  code: string;
  title: string;
  metric: string;
  note: string;
}

export type RiskLevel = '低' | '中' | '高';

export interface RiskHeatCell {
  label: string;
  level: RiskLevel;
  count: number;
}

export interface IntegrationStatus {
  name: string;
  uptime: string;
  status: string;
}

/** Executive header KPI. */
export interface ExecutiveMetric {
  label: string;
  value: string;
  delta: string;
}

export interface AuditEvent {
  id: string;
  /** ISO-8601 timestamp. */
  at: string;
  message: string;
}

/** A created flexible-staffing demand (real transactional entity). */
export interface Demand {
  id: string;
  client: string;
  role: string;
  headcount: number;
  city: string;
  status: string;
  slaRisk: RiskLevel;
  createdAt: string;
}

/** Aggregate workspace payload — everything the shell needs in one call. */
export interface WorkspaceSnapshot {
  automationSavingsHours: number;
  executiveMetrics: ExecutiveMetric[];
  scenarios: Scenario[];
  matchingMatrix: MatchRow[];
  deliveryPlanner: DeliverySlot[];
  complianceRules: string[];
  approvalFlow: string[];
  employeeProfiles: EmployeeProfile[];
  loops: LoopCard[];
  riskHeatmap: RiskHeatCell[];
  integrationHealth: IntegrationStatus[];
  commandSuggestions: string[];
}

/* ── Request DTO shapes (mirrored by class-validator DTOs in the API) ── */

export interface CreateDemandInput {
  client: string;
  role: string;
  headcount: number;
  city: string;
}

export interface CreateAuditInput {
  message: string;
}

export interface PayrollEstimateInput {
  rate: number;
  hours: number;
}

export interface PayrollEstimateResult {
  rate: number;
  hours: number;
  amount: number;
  /** Localised currency string, e.g. "¥7,056". */
  formatted: string;
}

export interface PlanSimulationResult {
  coverageDelta: string;
  costDelta: string;
  slaRisk: string;
  summary: string;
}
