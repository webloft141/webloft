export const ADMIN_SESSION_COOKIE = "admin_session";
export const ADMIN_SESSION_VALUE = "authenticated";

export function isAdminSession(value?: string | null) {
  return value === ADMIN_SESSION_VALUE;
}
