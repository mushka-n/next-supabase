'use server';

import { ROUTES } from '@/constants/routes';
import { createDatabaseServerClient } from '@/server/db/create-server-client';
import { redirect } from 'next/navigation';

export const signOutAction = async () => {
  const supabase = await createDatabaseServerClient();
  await supabase.auth.signOut();
  return redirect(ROUTES.SIGN_IN);
};
