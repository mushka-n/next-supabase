'use server';

import { ROUTES } from '@/constants/routes';
import { createDatabaseServerClient } from '@/server/db/create-server-client';
import { encodedRedirect } from '@/utils/encoded-redirect';
import { redirect } from 'next/navigation';

export const signInAction = async (data: {
  email: string;
  password: string;
}) => {
  const { email, password } = data;
  const supabase = await createDatabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect('error', ROUTES.SIGN_IN, error.message);
  }

  return redirect(ROUTES.HOME);
};
