import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

import { ForgotPasswordForm } from '@/components/forms/auth/forgot-password-form';
import { AuthMessage } from '@/components/forms/auth/types';

export default async function ForgotPassword(props: {
  searchParams: Promise<AuthMessage>;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className='flex flex-col h-full w-full items-center justify-center gap-6'>
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-2xl font-bold'>Forgot Password</h1>
        <p className='text-muted-foreground text-sm text-balance'>
          Enter your email address to receive a password reset link
        </p>
      </div>

      <ForgotPasswordForm searchParams={searchParams} />

      <div className='text-center text-sm'>
        Remember your password?{' '}
        <Link
          href={ROUTES.SIGN_IN}
          className='underline underline-offset-4'
          tabIndex={3}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
