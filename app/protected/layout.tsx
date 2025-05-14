import { createDatabaseServerClient } from '@/server/db/create-server-client';

import { AppSidebar } from '@/components/layout/app-sidebar';
import NavHeader from '@/components/layout/nav-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createDatabaseServerClient();
  const user = await supabase.auth.getUser()!;

  return (
    <SidebarProvider>
      <AppSidebar user={user.data.user!} collapsible='icon' />
      <SidebarInset>
        <NavHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
