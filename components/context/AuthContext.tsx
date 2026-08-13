"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api, token } from "@/lib/api";

type User = { id: string; name: string; email: string; mobile?: string; role: string };
type AuthMode = "login" | "signup";
type OtpPurpose = "auth" | "password_reset";
type OtpResponse = { message: string; cooldownSeconds?: number };
type AuthResponse = { token: string; user: User; message?: string };
type RegisterPayload = { name: string; email: string; mobile: string; password: string };
type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  isAuthOpen: boolean;
  authMode: AuthMode;
  openAuth: (mode: AuthMode) => void;
  closeAuth: () => void;
  login: (email: string, password: string) => Promise<void>;
  requestRegisterOtp: (payload: RegisterPayload) => Promise<OtpResponse>;
  requestLoginOtp: (email: string) => Promise<OtpResponse>;
  resendOtp: (email: string, purpose: OtpPurpose) => Promise<OtpResponse>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  requestForgotOtp: (email: string) => Promise<OtpResponse>;
  verifyForgotOtp: (email: string, otp: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  useEffect(() => {
    const auth = token();
    if (!auth) return;

    api<{ user: User }>("/api/auth/profile", { token: auth })
      .then((data) => {
        setUser(data.user);
        setIsLoggedIn(true);
      })
      .catch(() => localStorage.removeItem("token"));
  }, []);

  const finish = (data: AuthResponse) => {
    localStorage.setItem("token", data.token);
    setUser(data.user);
    setIsLoggedIn(true);
    setIsAuthOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        isAuthOpen,
        authMode,
        openAuth: (mode) => {
          setAuthMode(mode);
          setIsAuthOpen(true);
        },
        closeAuth: () => setIsAuthOpen(false),
        login: async (email, password) =>
          finish(
            await api<AuthResponse>("/api/auth/password/login", {
              method: "POST",
              body: JSON.stringify({ email, password })
            })
          ),
        requestRegisterOtp: (payload) =>
          api<OtpResponse>("/api/auth/register/request", {
            method: "POST",
            body: JSON.stringify(payload)
          }),
        requestLoginOtp: (email) =>
          api<OtpResponse>("/api/auth/login/otp/request", {
            method: "POST",
            body: JSON.stringify({ email })
          }),
        resendOtp: (email, purpose) =>
          api<OtpResponse>("/api/auth/otp/resend", {
            method: "POST",
            body: JSON.stringify({ email, purpose })
          }),
        verifyOtp: async (email, otp) =>
          finish(
            await api<AuthResponse>("/api/auth/otp/verify", {
              method: "POST",
              body: JSON.stringify({ email, otp })
            })
          ),
        requestForgotOtp: (email) =>
          api<OtpResponse>("/api/auth/forgot/request", {
            method: "POST",
            body: JSON.stringify({ email })
          }),
        verifyForgotOtp: async (email, otp, password) =>
          finish(
            await api<AuthResponse>("/api/auth/forgot/verify", {
              method: "POST",
              body: JSON.stringify({ email, otp, password })
            })
          ),
        logout: async () => {
          const auth = token();
          if (auth) await api("/api/auth/logout", { method: "POST", token: auth }).catch(() => undefined);
          localStorage.removeItem("token");
          setUser(null);
          setIsLoggedIn(false);
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error("useAuth must be used within AuthProvider"); return context; }
