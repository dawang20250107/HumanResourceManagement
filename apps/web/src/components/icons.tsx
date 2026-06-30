import type { ModuleKey } from '@flexforce/shared';
import type { SVGProps } from 'react';

const base: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const paths: Record<ModuleKey, JSX.Element> = {
  overview: (
    <>
      <path d="M8 35V13l16-7 16 7v22l-16 7-16-7Z" />
      <path d="M16 33V20m8 13V15m8 18v-9" />
    </>
  ),
  demand: (
    <>
      <path d="M8 14h24l8 8v18H8V14Z" />
      <path d="M32 14v9h8M15 25h18M15 32h12" />
    </>
  ),
  talent: (
    <>
      <path d="M24 24a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="M10 40c2.2-8 8-12 14-12s11.8 4 14 12" />
      <path d="M35 11l5 2-5 2-2 5-2-5-5-2 5-2 2-5 2 5Z" />
    </>
  ),
  schedule: (
    <>
      <path d="M10 12h28v28H10V12Z" />
      <path d="M16 8v8m16-8v8M10 20h28M17 28h6v6h-6zM28 28h4" />
    </>
  ),
  time: (
    <>
      <path d="M24 42a18 18 0 1 0 0-36 18 18 0 0 0 0 36Z" />
      <path d="M24 14v12l8 5" />
      <path d="M13 10l-5 5m27-5 5 5" />
    </>
  ),
  payroll: (
    <>
      <path d="M10 14h28v24H10V14Z" />
      <path d="M14 20h20M16 29h7m4 0h5M24 34c4 0 7-2 7-5s-3-5-7-5-7 2-7 5 3 5 7 5Z" />
    </>
  ),
  billing: (
    <>
      <path d="M14 8h20l4 6v26l-4-2-4 2-4-2-4 2-4-2-4 2V8Z" />
      <path d="M18 18h12M18 25h14M18 32h8" />
    </>
  ),
  risk: (
    <>
      <path d="M24 6 40 13v11c0 10-6.5 16-16 18C14.5 40 8 34 8 24V13l16-7Z" />
      <path d="M24 15v12m0 7v.2" />
    </>
  ),
  analytics: (
    <>
      <path d="M8 36c7-18 13 0 20-16 4-9 8-8 12-6" />
      <path d="M10 40h30M15 30l5 5 8-12 6 4 6-13" />
      <path d="M36 7l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" />
    </>
  ),
  admin: (
    <>
      <path d="M10 18 24 8l14 10v20H10V18Z" />
      <path d="M18 38V26h12v12M16 19h16M24 8v10" />
    </>
  ),
};

export function ModuleIcon({ module, ...props }: { module: ModuleKey } & SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      {paths[module]}
    </svg>
  );
}

const ui = {
  close: <path d="M6 6l12 12M18 6 6 18" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  bolt: <path d="M13 3 4 14h7l-1 7 9-11h-7l1-7Z" />,
  check: <path d="M5 12.5 10 17 19 7" />,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  command: (
    <>
      <path d="M9 3a3 3 0 1 1-3 3h12a3 3 0 1 1-3-3v12a3 3 0 1 1 3 3H6a3 3 0 1 1 3-3" />
    </>
  ),
} as const;

export function Icon({ name, ...props }: { name: keyof typeof ui } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {ui[name]}
    </svg>
  );
}
