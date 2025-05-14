import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

import { SignUpForm } from '@/components/forms/auth/sign-up-form';
import { AuthMessage } from '@/components/forms/auth/types';

export default async function SignUpPage(props: {
  searchParams: Promise<AuthMessage>;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className='flex flex-col h-full w-full items-center justify-center gap-6'>
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-2xl font-bold'>Register</h1>
        <p className='text-muted-foreground text-sm text-balance'>
          Create a new account by filling out the form below.
        </p>
      </div>

      <SignUpForm searchParams={searchParams} />

      <div className='text-center text-sm'>
        Already have an account?{' '}
        <Link
          href={ROUTES.SIGN_IN}
          className='underline underline-offset-4'
          tabIndex={6}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
