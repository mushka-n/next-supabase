'use server';

import { ROUTES } from '@/constants/routes';
import { createDatabaseServerClient } from '@/server/db/create-server-client';
import { encodedRedirect } from '@/utils/encoded-redirect';

export const resetPasswordAction = async (data: {
  password: string;
  confirmPassword: string;
}) => {
  const supabase = await createDatabaseServerClient();

  const { password, confirmPassword } = data;

  if (!password || !confirmPassword) {
    encodedRedirect(
      'error',
      ROUTES.RESET_PASSWORD,
      'Password and confirm password are required'
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect('error', ROUTES.RESET_PASSWORD, 'Passwords do not match');
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect('error', ROUTES.RESET_PASSWORD, 'Password update failed');
  }

  encodedRedirect('success', ROUTES.RESET_PASSWORD, 'Password updated');
};
