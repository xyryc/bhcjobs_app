export const THEME_STORAGE_KEY = "theme-preference";

export type AppTheme = "light" | "dark";

export function isAppTheme(value: string | null): value is AppTheme {
  return value === "light" || value === "dark";
}
