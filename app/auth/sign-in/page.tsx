import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

import { SignInForm } from '@/components/forms/auth/sign-in-form';
import { AuthMessage } from '@/components/forms/auth/types';

export default async function SignInPage(props: {
  searchParams: Promise<AuthMessage>;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className='flex flex-col h-full w-full items-center justify-center gap-6'>
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-2xl font-bold'>Login</h1>
        <p className='text-muted-foreground text-sm text-balance'>
          Fill out the form below to login to your account
        </p>
      </div>

      <SignInForm searchParams={searchParams} />

      <div className='text-center text-sm'>
        Don&apos;t have an account?{' '}
        <Link
          href={ROUTES.SIGN_UP}
          className='underline underline-offset-4'
          tabIndex={5}
        >
          Register
        </Link>
      </div>
    </div>
  );
}
