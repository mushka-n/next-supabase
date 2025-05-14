'use client';

import { PROTECTED_PREFIX } from '@/constants/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function NavHeader() {
  const pathname = decodeURIComponent(usePathname() || '/');
  const breadcrumbs = pathname
    .split('/')
    .filter((crumb) => crumb && `/${crumb}` !== PROTECTED_PREFIX)
    .map((crumb) => ({
      title: crumb.charAt(0).toUpperCase() + crumb.slice(1),
      url: `${PROTECTED_PREFIX}/${crumb}`,
    }));

  return (
    <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator
          orientation='vertical'
          className='mr-2 data-[orientation=vertical]:h-4'
        />

        {breadcrumbs.length < 2 ? (
          <h1 className='text-foreground text-base font-medium'>
            {breadcrumbs[0]?.title}
          </h1>
        ) : (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.slice(0, 1).map((crumb) => [
                <BreadcrumbItem key={crumb.title} className='hidden md:block'>
                  <BreadcrumbLink href={crumb.url}>
                    <Link href={crumb.url}>{crumb.title}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>,
                <BreadcrumbSeparator
                  key={`${crumb.title}_sep`}
                  className='hidden md:block'
                />,
              ])}
              <BreadcrumbItem
                key={breadcrumbs.at(-1)!.title}
                className='hidden md:block'
              >
                <BreadcrumbPage>{breadcrumbs.at(-1)!.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>
    </header>
  );
}
