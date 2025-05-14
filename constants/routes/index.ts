export const AUTH_PREFIX = '/auth';
export const PROTECTED_PREFIX = '/protected';

export const ROUTES = Object.freeze({
  SIGN_IN: `${AUTH_PREFIX}/sign-in`,
  SIGN_UP: `${AUTH_PREFIX}/sign-up`,
  FORGOT_PASSWORD: `${AUTH_PREFIX}/forgot%20Password`,

  HOME: `${PROTECTED_PREFIX}/home`,
  DASHBOARD: `${PROTECTED_PREFIX}/dashboard`,
  SETTINGS: `${PROTECTED_PREFIX}/settings`,
  RESET_PASSWORD: `${PROTECTED_PREFIX}/reset%20Password`,
} as const);

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
