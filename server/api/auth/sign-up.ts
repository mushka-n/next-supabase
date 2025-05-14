'use server';

import { AUTH_PREFIX, ROUTES } from '@/constants/routes';
import { createDatabaseServerClient } from '@/server/db/create-server-client';
import { encodedRedirect } from '@/utils/encoded-redirect';
import { headers } from 'next/headers';

export const signUpAction = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const { name, email, password } = data;
  const supabase = await createDatabaseServerClient();
  const origin = (await headers()).get('origin');

  if (!email || !password) {
    return encodedRedirect(
      'error',
      ROUTES.SIGN_UP,
      'Email and password are required'
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}${AUTH_PREFIX}/callback`,
      data: {
        display_name: name,
      },
    },
  });

  if (error) {
    console.error(`${error.code} ${error.message}`);
    return encodedRedirect('error', ROUTES.SIGN_UP, error.message);
  } else {
    return encodedRedirect(
      'success',
      ROUTES.SIGN_UP,
      'Thanks for signing up! Please check your email for a verification link.'
    );
  }
};
