export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.darnera.in";
export type ApiOptions = RequestInit & { token?: string };
export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { token, headers, ...request } = options;
  const response = await fetch(`${API_URL}${path}`, { ...request, headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...headers } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Something went wrong. Please try again.");
  return data as T;
}
export const token = () => typeof window === "undefined" ? "" : localStorage.getItem("token") || "";
