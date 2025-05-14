import { GalleryVerticalEnd } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ThemeSelector } from '@/components/ui/theme-selector';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <Link href={'#'} className='flex items-center gap-2 font-medium'>
            <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
              <GalleryVerticalEnd className='size-4' />
            </div>
            Acme Inc.
          </Link>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>{children}</div>
        </div>
      </div>

      <div className='bg-[#040404] relative hidden lg:block'>
        <Image
          src='/images/login-image.jpg'
          alt='Login Image'
          className='absolute inset-0 h-full w-full object-cover block dark:hidden'
          width={2560 / 2}
          height={1440}
          priority
        />
        <Image
          src='/images/login-image.dark.jpg'
          alt='Login Image'
          className='absolute inset-0 h-full w-full object-cover hidden dark:block '
          width={2560 / 2}
          height={1440}
          priority
        />
      </div>

      <div className='fixed top-0 right-0 p-4'>
        <ThemeSelector />
      </div>
    </div>
  );
}
