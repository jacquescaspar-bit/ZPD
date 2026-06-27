"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui";
import { LockKeyhole } from "lucide-react";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error ?? "Login failed");
        return;
      }

      const from = searchParams.get("from") ?? "/admin/stats";
      router.push(from);
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg font-bold text-slate-950">
            ZPD
          </div>
          <h1 className="text-2xl font-semibold text-white">Admin Console</h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to manage enrollments, promos, and referrals.
          </p>
        </div>

        <form className="space-y-5" onSubmit={(e) => void handleSubmit(e)}>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-300"
              htmlFor="password"
            >
              Admin password
            </label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-white placeholder:text-slate-500 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
                id="password"
                placeholder="Enter your admin password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
              {error}
            </p>
          )}

          <Button
            className="w-full cursor-pointer"
            disabled={loading}
            size="lg"
            type="submit"
            variant="primary"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
};

const LoginPage = () => (
  <Suspense
    fallback={
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-sm text-slate-400">
        Loading...
      </div>
    }
  >
    <LoginForm />
  </Suspense>
);

export default LoginPage;
