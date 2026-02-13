"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Mode = "signin" | "signup";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function createAdminSession(accessToken: string) {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken }),
    });

    const payload = (await response.json().catch(() => ({}))) as { error?: string };
    if (!response.ok) {
      throw new Error(payload.error ?? "Admin session create failed.");
    }
  }

  useEffect(() => {
    let mounted = true;
    const syncExistingSession = async () => {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token || !mounted) return;
      try {
        await createAdminSession(token);
        if (!mounted) return;
        router.push("/admin");
        router.refresh();
      } catch {
        // stay on login page when user is not admin
      }
    };
    void syncExistingSession();
    return () => {
      mounted = false;
    };
  }, [router, supabase]);

  async function handleEmailSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setStatus(null);
    setError(null);

    try {
      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;
        if (data.session?.access_token) {
          await createAdminSession(data.session.access_token);
          router.push("/admin");
          router.refresh();
          return;
        }

        setStatus("Signup successful. Check email verification, then sign in.");
        return;
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;
      if (!data.session?.access_token) throw new Error("Missing access token.");

      await createAdminSession(data.session.access_token);
      router.push("/admin");
      router.refresh();
    } catch (authError) {
      const message = authError instanceof Error ? authError.message : "Auth failed.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleAuth() {
    setIsLoading(true);
    setError(null);
    setStatus(null);

    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/admin/login`,
        },
      });
      if (oauthError) throw oauthError;
    } catch (oauthErr) {
      const message = oauthErr instanceof Error ? oauthErr.message : "Google login failed.";
      setError(message);
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#c6ded8] via-[#d9ece7] to-[#b3d9e5] px-4 py-10">
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[36px] bg-white shadow-[0_25px_70px_rgba(25,85,101,0.25)] lg:grid-cols-2">
        <section className="p-8 sm:p-12">
          <h1 className="text-4xl font-semibold text-slate-800">{mode === "signin" ? "Sign in" : "Sign up"}</h1>
          <p className="mt-2 text-sm text-slate-500">
            {mode === "signin" ? "Admin login with Email/Password or Google" : "Create account, then admin access only if role is allowed"}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="h-11 w-11 rounded-full border border-[#48a7cc] text-sm font-semibold text-[#48a7cc] transition hover:bg-[#48a7cc] hover:text-white"
              disabled={isLoading}
              aria-label="Continue with Google"
            >
              G
            </button>
            <button
              type="button"
              className="h-11 w-11 rounded-full border border-[#48a7cc] text-sm font-semibold text-[#48a7cc]"
              disabled
              title="Twitter setup pending"
            >
              X
            </button>
            <button
              type="button"
              className="h-11 w-11 rounded-full border border-[#48a7cc] text-sm font-semibold text-[#48a7cc]"
              disabled
              title="Facebook setup pending"
            >
              f
            </button>
          </div>

          <form onSubmit={handleEmailSubmit} className="mt-6 space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              className="w-full rounded-full bg-slate-100 px-5 py-3 text-sm text-slate-800 outline-none ring-1 ring-transparent transition focus:ring-[#48a7cc]"
            />
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className="w-full rounded-full bg-slate-100 px-5 py-3 text-sm text-slate-800 outline-none ring-1 ring-transparent transition focus:ring-[#48a7cc]"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="mt-1 rounded-full bg-[#2499cc] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#1c87b4] disabled:opacity-60"
            >
              {isLoading ? "Please wait..." : mode === "signin" ? "Sign in" : "Sign up"}
            </button>
          </form>

          {status ? <p className="mt-4 text-sm text-emerald-600">{status}</p> : null}
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        </section>

        <aside className="relative hidden bg-gradient-to-b from-[#2e9fcf] to-[#0f8dc4] p-12 text-white lg:flex lg:flex-col lg:items-center lg:justify-center">
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-r from-white/10 via-white/20 to-white/10" />
          <h2 className="text-center text-5xl font-bold leading-tight">
            {mode === "signin" ? "Create,\nAccount!" : "Welcome\nBack!"}
          </h2>
          <p className="mt-4 max-w-xs text-center text-base text-white/85">
            {mode === "signin"
              ? "Sign up if you still do not have an account."
              : "Already have an account? Sign in and continue."}
          </p>
          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
              setStatus(null);
            }}
            className="mt-8 rounded-full border border-white px-8 py-3 text-sm font-semibold tracking-wide transition hover:bg-white hover:text-[#148ec4]"
          >
            {mode === "signin" ? "SIGN UP" : "SIGN IN"}
          </button>
        </aside>
      </div>
    </main>
  );
}
