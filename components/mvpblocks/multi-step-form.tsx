"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function MultiStepRegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const next = () => setStep((s) => Math.min(2, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      let data, text;
      const raw = await res.text();
      try {
        data = JSON.parse(raw);
      } catch (err) {
        setError(raw || "Registration failed");
        return;
      }
      if (!res.ok) {
        setError(data?.error || "Registration failed");
        return;
      }
      // Redirect to OTP entry UI with email param
      router.push(`/verify?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err?.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-6">
      <div className="w-full max-w-md rounded-lg bg-white/80 p-8 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Create your account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 0 && (
            <div>
              <label className="block text-sm font-medium">Full name</label>
              <input
                className="mt-1 w-full rounded border px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                required
              />
            </div>
          )}

          {step === 1 && (
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                className="mt-1 w-full rounded border px-3 py-2"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                className="mt-1 w-full rounded border px-3 py-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a secure password"
                minLength={8}
                required
              />
              <p className="mt-2 text-sm text-slate-500">Password must be at least 8 characters.</p>
            </div>
          )}

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex items-center justify-between">
            <div>
              {step > 0 && (
                <button type="button" className="mr-3 text-sm" onClick={back}>
                  Back
                </button>
              )}
            </div>

            <div className="flex items-center">
              {step < 2 ? (
                <button
                  type="button"
                  className="rounded bg-blue-600 px-4 py-2 text-sm text-white"
                  onClick={next}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="rounded bg-green-600 px-4 py-2 text-sm text-white"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create account"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
