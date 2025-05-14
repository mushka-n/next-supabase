'use server';

import { AUTH_PREFIX, ROUTES } from '@/constants/routes';
import { createDatabaseServerClient } from '@/server/db/create-server-client';
import { encodedRedirect } from '@/utils/encoded-redirect';
import { Provider } from '@supabase/supabase-js';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signInWithOAuthAction = async (provider: Provider) => {
  const origin = (await headers()).get('origin');
  const supabase = await createDatabaseServerClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}${AUTH_PREFIX}/callback`,
    },
  });

  if (error) {
    return encodedRedirect('error', ROUTES.SIGN_IN, error.message);
  }

  if (data.url) {
    redirect(data.url);
  }

  return redirect(ROUTES.HOME);
};
