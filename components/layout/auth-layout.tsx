import Image from 'next/image';

import { ThemeSelector } from '@/components/layout/theme-selector';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-3 md:justify-start font-medium'>
          <div className='flex size-6 items-center justify-center '>
            <Image
              src={'/icons/logo.svg'}
              alt='Logo'
              width={24}
              height={24}
              priority
            />
          </div>
          Acme Inc.
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>{children}</div>
        </div>
      </div>

      <div className='bg-[#040404] relative hidden lg:block'>
        <Image
          src='/images/auth-image.jpg'
          alt='Login Image'
          className='absolute inset-0 h-full w-full object-cover block dark:hidden'
          width={2560 / 2}
          height={1440}
          priority
        />
        <Image
          src='/images/auth-image.dark.jpg'
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
