export type AuthMessage =
  | { success: string }
  | { error: string }
  | { message: string };
