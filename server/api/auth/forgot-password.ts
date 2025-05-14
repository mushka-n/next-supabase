'use server';

import { ROUTES } from '@/constants/routes';
import { createDatabaseServerClient } from '@/server/db/create-server-client';
import { encodedRedirect } from '@/utils/encoded-redirect';
import { headers } from 'next/headers';

// import { redirect } from 'next/navigation';

export const forgotPasswordAction = async (data: { email: string }) => {
  const { email } = data;
  // const { callbackUrl } = data;

  const supabase = await createDatabaseServerClient();
  const origin = (await headers()).get('origin');

  if (!email) {
    return encodedRedirect(
      'error',
      ROUTES.FORGOT_PASSWORD,
      'Email is required'
    );
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=${ROUTES.RESET_PASSWORD}`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      'error',
      ROUTES.FORGOT_PASSWORD,
      'Could not reset password'
    );
  }

  // if (callbackUrl) {
  //   return redirect(callbackUrl);
  // }

  return encodedRedirect(
    'success',
    ROUTES.FORGOT_PASSWORD,
    'Check your email for a link to reset your password.'
  );
};
