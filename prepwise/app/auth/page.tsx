"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";

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
            PREP.
          </h1>
        </div>

        <div className="mx-auto w-full max-w-md pt-16">
          <h2 className="text-5xl font-extrabold tracking-tight text-slate-900">
            Hi there
          </h2>
          <p className="mt-4 text-slate-600 ">
            Welcome to Prep. AI-Powered Study Dashboard
          </p>
          {/* Google Sign In Button */}
          <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                backgroundColor: "#ffffff",
                color: "#374151",
                border: "1px solid #d1d5db",
                borderRadius: "0.75rem",
                padding: "0.875rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
                width: "100%",
                marginTop: "2rem",
                transition: "box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative mt-6 flex items-center justify-center">
            <div className="absolute w-full border-t border-slate-200"></div>
            <span className="relative bg-[#F8F9FA] px-4 text-sm text-slate-400">
        or {mode === "login" ? "log in" : "sign up"} with email
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
