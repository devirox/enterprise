"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { InputOTPForm } from "@/components/components/ui/input-otp-form";

export default function VerifyClient({ email }: { email: string }) {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState<string | null>(null);

  async function handleVerify({ pin }: { pin: string }) {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: pin }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult("success");
      } else {
        setResult(data?.error || "Verification failed");
      }
    } catch (err: any) {
      setResult(err?.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setResending(true);
    setResendMsg(null);
    try {
      const res = await fetch("/api/auth/request-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setResendMsg("Verification code resent to your email.");
        toast.success("Verification code resent to your email.");
        // In dev, show the code in a toast for easier debugging
        if (process.env.NODE_ENV !== "production" && data?.code) {
          toast("[DEV] Code: " + data.code);
        }
      } else {
        setResendMsg("Failed to resend code. Try again later.");
        toast.error("Failed to resend code. Try again later.");
      }
    } catch (err: any) {
      setResendMsg("Network error. Try again later.");
      toast.error("Network error. Try again later.");
    } finally {
      setResending(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Verify your email</h1>
      <p className="mt-2">We sent a verification code to your email. Enter the code below to verify your account.</p>
      <div className="mt-6 max-w-md">
        <InputOTPForm
          onSubmit={handleVerify}
          description="Please enter the one-time password sent to your email."
          loading={loading}
        />
        <button
          type="button"
          className="mt-4 w-full py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
          onClick={handleResend}
          disabled={resending}
        >
          {resending ? "Resending..." : "Resend Code"}
        </button>
        {resendMsg && (
          <div className="mt-2 text-sm text-blue-700">{resendMsg}</div>
        )}
        {result === "success" ? (
          <div className="mt-4 text-green-600">Your email has been verified. You can now <a href="/login" className="underline">sign in</a>.</div>
        ) : result ? (
          <div className="mt-4 text-red-600">{result}</div>
        ) : null}
      </div>
    </div>
  );
}
