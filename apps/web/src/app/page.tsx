'use client';

import { Sidebar } from '@/components/Sidebar';
import { WorkspaceHeader } from '@/components/WorkspaceHeader';
import { ExecutiveGrid } from '@/components/ExecutiveGrid';
import { ScenarioStrip } from '@/components/ScenarioStrip';
import { ModuleView } from '@/components/ModuleView';
import { CommandCenter } from '@/components/CommandCenter';
import { CreateDemandDrawer } from '@/components/CreateDemandDrawer';
import { InsightDrawer } from '@/components/InsightDrawer';
import { Toaster } from '@/components/Toaster';

export default function WorkspacePage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1640px] flex-col lg:flex-row">
      <div className="border-b border-[var(--border)] lg:sticky lg:top-0 lg:h-screen lg:w-[264px] lg:shrink-0 lg:border-b-0 lg:border-r">
        <Sidebar />
      </div>

      <main className="flex min-w-0 flex-1 flex-col gap-6 px-5 py-6 lg:px-8 lg:py-8">
        <WorkspaceHeader />
        <ExecutiveGrid />
        <ScenarioStrip />
        <ModuleView />
      </main>

      <CommandCenter />
      <CreateDemandDrawer />
      <InsightDrawer />
      <Toaster />
    </div>
  );
}
