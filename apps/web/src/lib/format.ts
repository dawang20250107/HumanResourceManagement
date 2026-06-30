import type { RiskLevel } from '@flexforce/shared';

/** Splits a KPI string like "12,480" / "23.6%" / "¥42.8" / "312 人" into an
 * animatable numeric part plus its prefix/suffix, so we can count up the number
 * while preserving units. Returns null number when there's nothing numeric. */
export function parseMetricValue(raw: string): {
  prefix: string;
  number: number | null;
  decimals: number;
  suffix: string;
} {
  const match = raw.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/s);
  if (!match) return { prefix: raw, number: null, decimals: 0, suffix: '' };
  const [, prefix, digits, suffix] = match;
  const normalized = digits.replace(/,/g, '');
  const decimals = normalized.includes('.') ? normalized.split('.')[1].length : 0;
  return { prefix, number: Number(normalized), decimals, suffix };
}

export function formatNumber(value: number, decimals: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function deltaTone(delta: string): 'up' | 'down' | 'flat' {
  if (delta.includes('+')) return 'up';
  if (delta.includes('-')) return 'down';
  return 'flat';
}

export function riskColor(level: RiskLevel | string): string {
  switch (level) {
    case '高':
      return 'var(--danger)';
    case '中':
      return 'var(--warn)';
    default:
      return 'var(--success)';
  }
}

export function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString('zh-CN', { hour12: false });
}
