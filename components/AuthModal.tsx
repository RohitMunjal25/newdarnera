"use client";

import { useState } from "react";
import { useAuth } from "@/components/context/AuthContext";

export default function AuthModal() {
  const { isAuthOpen, authMode, closeAuth, login, openAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (authMode === "login") {
      const success = login(email, password);
      if (!success) {
        setError("Invalid credentials! Use sample@gmail.com / sample");
      }
    } else {
      // For signup demo, just log them in directly
      login(email, password);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in" onClick={closeAuth} />

      {/* Modal Box */}
      <div className="relative w-full max-w-md bg-[#080808] border border-gray-800 text-white p-8 rounded-sm shadow-2xl z-10">
        <div className="flex justify-between items-center mb-6 border-b border-gray-900 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[#d4af37]">✦</span>
            <h2 className="font-serif tracking-[0.2em] text-sm uppercase">
              {authMode === "login" ? "MEMBER LOGIN" : "CREATE ACCOUNT"}
            </h2>
          </div>
          <button onClick={closeAuth} className="text-gray-400 hover:text-[#d4af37] transition-colors">
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950/40 border border-red-900/50 text-red-400 text-xs tracking-wider text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sample@gmail.com"
              className="w-full bg-black border border-gray-800 rounded-sm px-4 py-3 text-xs text-white focus:border-[#d4af37] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="sample"
              className="w-full bg-black border border-gray-800 rounded-sm px-4 py-3 text-xs text-white focus:border-[#d4af37] focus:outline-none transition-colors"
            />
          </div>

          {authMode === "login" && (
            <p className="text-[10px] text-gray-500 tracking-wider">
              Hint: Use <span className="text-[#d4af37]">sample@gmail.com</span> / <span className="text-[#d4af37]">sample</span>
            </p>
          )}

          <button 
            type="submit"
            className="w-full bg-[#d4af37] text-black font-bold text-xs tracking-[0.2em] py-4 hover:bg-white transition-colors duration-300 rounded-sm uppercase mt-4"
          >
            {authMode === "login" ? "SIGN IN" : "REGISTER"}
          </button>
        </form>

        <div className="mt-6 text-center border-t border-gray-900 pt-4">
          {authMode === "login" ? (
            <p className="text-xs text-gray-400">
              New to Darnera?{" "}
              <button onClick={() => openAuth("signup")} className="text-[#d4af37] underline tracking-wider ml-1">
                Create an account
              </button>
            </p>
          ) : (
            <p className="text-xs text-gray-400">
              Already have an account?{" "}
              <button onClick={() => openAuth("login")} className="text-[#d4af37] underline tracking-wider ml-1">
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}