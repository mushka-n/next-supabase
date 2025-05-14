import { ResetPasswordForm } from '@/components/forms/auth/reset-password-form';
import { AuthMessage } from '@/components/forms/auth/types';

export default async function ResetPassword(props: {
  searchParams: Promise<AuthMessage>;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className='flex flex-1 items-center justify-center'>
      <div className='w-full max-w-xs'>
        <div className='flex flex-col h-full w-full items-center justify-center gap-6'>
          <div className='flex flex-col items-center gap-2 text-center'>
            <h1 className='text-2xl font-bold'>Reset Password</h1>
            <p className='text-muted-foreground text-sm text-balance'>
              Enter your new password
            </p>
          </div>
          <ResetPasswordForm searchParams={searchParams} />
        </div>
      </div>
    </div>
  );
}
