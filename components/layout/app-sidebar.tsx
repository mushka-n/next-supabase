'use client';

import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';
import { UserResponse } from '@supabase/supabase-js';
import { HomeIcon, LayoutDashboardIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { NavUser } from '@/components/layout/nav-user';
import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';

const data = {
  main: [
    {
      title: 'Home',
      url: ROUTES.HOME,
      icon: HomeIcon,
    },
    {
      title: 'Dashboard',
      url: ROUTES.DASHBOARD,
      icon: LayoutDashboardIcon,
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: {
  user: NonNullable<UserResponse['data']['user']>;
} & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenuButton size='lg' asChild>
          <Link href={ROUTES.HOME} className='flex items-center gap-3'>
            <div className='flex aspect-square size-8 items-center justify-center min-h-8 min-w-8 [[data-state=collapsed]_&]:-ml-2 transition-[margin]'>
              <Image
                src={'/icons/logo.svg'}
                alt='Logo'
                width={32}
                height={32}
                priority
              />
            </div>
            <span className='text-[16px] font-semibold'>Acme. Inc</span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {data.main.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    pathname === item.url && 'bg-muted pointer-events-none'
                  )}
                >
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarFooter className='mt-auto'>
        <NavUser
          user={{
            name: user.user_metadata.display_name,
            email: user.email!,
            avatar: undefined,
          }}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
