"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  userEmail: string;
  isAuthOpen: boolean;
  authMode: "login" | "signup";
  openAuth: (mode: "login" | "signup") => void;
  closeAuth: () => void;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuth = () => setIsAuthOpen(false);

  const login = (email: string, pass: string) => {
    if (email === "sample@gmail.com" && pass === "sample") {
      setIsLoggedIn(true);
      setUserEmail(email);
      setIsAuthOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, isAuthOpen, authMode, openAuth, closeAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}