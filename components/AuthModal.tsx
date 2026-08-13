"use client";

import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/components/context/AuthContext";

type Step = "form" | "otp" | "forgot";
type OtpPurpose = "auth" | "password_reset";

export default function AuthModal() {
  const {
    isAuthOpen,
    authMode,
    closeAuth,
    login,
    requestRegisterOtp,
    requestLoginOtp,
    resendOtp,
    verifyOtp,
    requestForgotOtp,
    verifyForgotOtp,
    openAuth
  } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<Step>("form");
  const [otpPurpose, setOtpPurpose] = useState<OtpPurpose>("auth");
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">("password");
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cooldownSeconds <= 0) return undefined;

    const timer = setInterval(() => {
      setCooldownSeconds((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldownSeconds]);

  if (!isAuthOpen) return null;

  const resetLocalState = () => {
    setStep("form");
    setOtp("");
    setError("");
    setMessage("");
    setCooldownSeconds(0);
  };

  const handleClose = () => {
    resetLocalState();
    closeAuth();
  };

  const setOtpResponse = (data: { message?: string; cooldownSeconds?: number }) => {
    setMessage(data.message || "OTP sent to your email");
    setCooldownSeconds(data.cooldownSeconds ?? 120);
    setStep("otp");
  };

  const run = async (callback: () => Promise<void>) => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await callback();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  async function submit(event: FormEvent) {
    event.preventDefault();

    await run(async () => {
      if (step === "otp") {
        if (otpPurpose === "password_reset") {
          await verifyForgotOtp(email, otp, newPassword);
        } else {
          await verifyOtp(email, otp);
        }
        return;
      }

      if (step === "forgot") {
        setOtpPurpose("password_reset");
        setOtpResponse(await requestForgotOtp(email));
        return;
      }

      if (authMode === "signup") {
        setOtpPurpose("auth");
        setOtpResponse(await requestRegisterOtp({ name, email, mobile, password }));
        return;
      }

      if (loginMethod === "otp") {
        setOtpPurpose("auth");
        setOtpResponse(await requestLoginOtp(email));
        return;
      }

      await login(email, password);
    });
  }

  const handleResend = () =>
    run(async () => {
      setOtpResponse(await resendOtp(email, otpPurpose));
    });

  const switchMode = () => {
    resetLocalState();
    openAuth(authMode === "login" ? "signup" : "login");
  };

  const title =
    step === "otp"
      ? otpPurpose === "password_reset"
        ? "Reset with OTP"
        : "Check your email"
      : step === "forgot"
        ? "Forgot password"
        : authMode === "login"
          ? "Welcome back"
          : "Create account";

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[#312820]/35 p-4 backdrop-blur">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-[#fffdfa] p-7 shadow-2xl">
        <button type="button" onClick={handleClose} className="float-right text-lg">
          x
        </button>

        <p className="text-[10px] tracking-[.25em] text-[#b88962]">WELCOME TO DARNERA</p>
        <h2 className="mt-2 font-serif text-3xl">{title}</h2>

        {step === "form" && authMode === "login" && (
          <div className="mt-5 grid grid-cols-2 rounded-xl bg-[#f1e8df] p-1 text-xs font-semibold text-[#735847]">
            <button
              type="button"
              onClick={() => setLoginMethod("password")}
              className={`rounded-lg py-2 ${loginMethod === "password" ? "bg-white shadow-sm" : ""}`}
            >
              Password
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod("otp")}
              className={`rounded-lg py-2 ${loginMethod === "otp" ? "bg-white shadow-sm" : ""}`}
            >
              Email OTP
            </button>
          </div>
        )}

        {step === "form" && authMode === "signup" && (
          <>
            <Input label="Your name" value={name} set={setName} />
            <Input label="Mobile number" value={mobile} set={setMobile} />
          </>
        )}

        {step !== "otp" && <Input label="Email" value={email} set={setEmail} type="email" />}

        {step === "form" && authMode === "signup" && (
          <Input label="Password" value={password} set={setPassword} type="password" />
        )}

        {step === "form" && authMode === "login" && loginMethod === "password" && (
          <Input label="Password" value={password} set={setPassword} type="password" />
        )}

        {step === "forgot" && (
          <Input label="New password" value={newPassword} set={setNewPassword} type="password" />
        )}

        {step === "otp" && (
          <>
            <p className="mt-4 text-sm text-[#806f63]">
              OTP sent on <span className="font-medium text-[#312820]">{email}</span>
            </p>
            <Input label="6-digit OTP" value={otp} set={setOtp} inputMode="numeric" />
            {otpPurpose === "password_reset" && (
              <Input label="New password" value={newPassword} set={setNewPassword} type="password" />
            )}
            <button
              type="button"
              disabled={loading || cooldownSeconds > 0}
              onClick={handleResend}
              className="mt-4 text-sm text-[#967052] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {cooldownSeconds > 0 ? `Resend OTP in ${cooldownSeconds}s` : "Resend OTP"}
            </button>
          </>
        )}

        {message && <p className="mt-4 rounded-lg bg-[#eff7ed] p-3 text-xs text-[#55704f]">{message}</p>}
        {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-xs text-red-700">{error}</p>}

        <button disabled={loading} className="mt-5 w-full rounded-xl bg-[#312820] py-3 text-sm text-white">
          {loading
            ? "Please wait..."
            : step === "otp"
              ? otpPurpose === "password_reset"
                ? "Reset password"
                : "Verify and continue"
              : step === "forgot"
                ? "Send reset OTP"
                : authMode === "login"
                  ? loginMethod === "otp"
                    ? "Send login OTP"
                    : "Sign in"
                  : "Send email OTP"}
        </button>

        {authMode === "login" && step === "form" && (
          <button type="button" onClick={() => setStep("forgot")} className="mt-4 block text-sm text-[#967052]">
            Forgot password?
          </button>
        )}

        <button type="button" onClick={switchMode} className="mt-4 text-sm text-[#967052]">
          {authMode === "login" ? "New here? Create account" : "Already have an account? Sign in"}
        </button>
      </form>
    </div>
  );
}

function Input({
  label,
  value,
  set,
  type = "text",
  inputMode
}: {
  label: string;
  value: string;
  set: (value: string) => void;
  type?: string;
  inputMode?: "numeric";
}) {
  return (
    <label className="mt-4 block text-xs text-[#796b60]">
      {label}
      <input
        required
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(event) => set(event.target.value)}
        className="mt-1.5 w-full rounded-xl border border-[#dfd4c9] bg-white p-3"
      />
    </label>
  );
}
