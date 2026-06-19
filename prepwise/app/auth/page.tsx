"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const body: Record<string, string> = {
      email: fd.get("email") as string,
      password: fd.get("password") as string,
    };

    if (mode === "signup") body.name = fd.get("name") as string;

    try {
      const res = await fetch(`/api/auth?action=${mode}`, {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify(body),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        const data = await res.json().catch(async () => {
          const textData = await res.text();
          console.error("RAW BACKEND RESPONSE:", textData);
          return null;
        });

        setError(
          data?.error ??
            `Server Error (${res.status}). Check your VS Code terminal!`,
        );
      }
    } catch (err) {
      setError("Network error. Is the development server running?");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex min-h-screen w-full bg-[#F8F9FA]">
      <div className="flex w-full flex-col justify-center px-8 md:w-1/2 md:px-16 lg:px-24">
        <div className="absolute left-8 top-8 md:left-16 lg:left-24">
          <h1 className="text-2xl font-bold tracking-tighter text-slate-900">
            PREPWISE.
          </h1>
        </div>

        <div className="mx-auto w-full max-w-md">
          <h2 className="text-5xl font-extrabold tracking-tight text-slate-900">
            Hi there
          </h2>
          <p className="mt-4 text-slate-600">
            Welcome to PrepWise. AI-Powered Study Dashboard
          </p>

          <div className="relative mt-12 flex items-center justify-center">
            <div className="absolute w-full border-t border-slate-200"></div>
            <span className="relative bg-[#F8F9FA] px-4 text-sm text-slate-400">
              {mode === "login"
                ? "Log in with your email"
                : "Sign up with your email"}
            </span>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {mode === "signup" && (
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                />
              </div>
            )}

            <div>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Your Password"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            {mode === "login" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-xl bg-[#1C1C1C] py-3.5 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-70"
            >
              {loading
                ? "Processing..."
                : mode === "login"
                  ? "Log In"
                  : "Sign Up"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-600">
            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError("");
              }}
              className="font-semibold text-blue-600 hover:underline"
            >
              {mode === "login" ? "Sign up" : "Log in"}
            </button>
          </div>
        </div>
      </div>
      <div className="hidden w-1/2 p-4 md:block">
        <div className="relative h-full w-full overflow-hidden rounded-4xl bg-slate-900">
          <Image
            src="/assets/images/signuploginhero.jpg"
            alt="Space Hero"
            fill
            className="object-cover opacity-80"
            priority
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-12 left-12 right-12 text-white">
            <h2 className="text-4xl font-bold leading-tight">
              Master your subjects in a <br /> Universe full of knowledge
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
