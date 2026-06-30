import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'FlexForce HR Cloud｜综合人力资源 SaaS',
  description:
    '灵活用工与企业 HR 的全产品 SaaS 工作台：客户需求、人才入职、智能排班、工时履约、薪酬结算、客户对账、合规风控、AI 分析与组织权限。',
};

export const viewport: Viewport = {
  themeColor: '#05070f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
