"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, LogOut, Search, Layers, Plus } from "lucide-react";
import StudyForm from "./StudyForm";
import PlanCard from "./PlanCard";
import Link from "next/link";
import { Home } from "lucide-react";
const DOT_COLORS = [
  "bg-pink-400",
  "bg-emerald-400",
  "bg-violet-400",
  "bg-amber-400",
  "bg-sky-400",
  "bg-rose-400",
];

export default function DashboardClient({
                                          initialPlans = [],
                                        }: {
  initialPlans?: any[];
}) {
  const [plans, setPlans] = useState<any[]>(initialPlans);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const router = useRouter();

  // set on the client only to avoid hydration mismatch
  useEffect(() => setNow(new Date()), []);

  const greeting = !now
      ? "Welcome back"
      : now.getHours() < 12
          ? "Good Morning"
          : now.getHours() < 17
              ? "Good Afternoon"
              : "Good Evening";

  const dateLabel = now?.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const subjects: string[] = Array.from(
      new Set(plans.filter((p) => p && p.subject).map((p) => p.subject)),
  );
  const uniqueSubjects = ["All", ...subjects];

  const handleNewPlan = (newPlan: any) => {
    if (!newPlan) return;
    setPlans((prev) => [newPlan, ...prev]);
    setSelectedSubject(newPlan.subject ?? "All");
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth?action=logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const visiblePlans = plans.filter((plan) => {
    const matchesSubject =
        selectedSubject === "All" || plan.subject === selectedSubject;
    const haystack = `${plan.subject ?? ""} ${plan.title ?? ""}`.toLowerCase();
    return matchesSubject && haystack.includes(query.toLowerCase());
  });

  return (
      <div className="flex w-full flex-1 bg-white">
        <div className="flex h-full w-full">
          {/* Sidebar */}
          <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 p-5 md:flex">
            <Link href="/" className="mb-8 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-sm font-bold text-slate-900">
                P
              </div>
              <span className="font-serif text-xl font-semibold text-slate-900">
    Prep
  </span>
            </Link>

            <nav className="space-y-1">
              <nav className="space-y-1">
                <Link
                    href="/"
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
                >
                  <Home size={16} />
                  Home
                </Link>

                {/* existing Dashboard button stays here */}
              </nav>

              <button
                  onClick={() => setSelectedSubject("All")}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      selectedSubject === "All"
                          ? "bg-blue-600 text-white"
                          : "text-slate-600 hover:bg-slate-100"
                  }`}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </button>
            </nav>

            <div className="my-5 border-t border-slate-200" />

            <div className="mb-2 flex items-center justify-between px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span>Subjects</span>
              <Plus size={14} />
            </div>
            <div className="space-y-1">
              {subjects.length === 0 && (
                  <p className="px-3 text-xs text-slate-400">No subjects yet</p>
              )}
              {subjects.map((subject, i) => (
                  <button
                      key={subject}
                      onClick={() => setSelectedSubject(subject)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          selectedSubject === subject
                              ? "bg-slate-100 font-medium text-slate-900"
                              : "text-slate-600 hover:bg-slate-50"
                      }`}
                  >
                <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-sm ${DOT_COLORS[i % DOT_COLORS.length]}`}
                />
                    <span className="truncate">{subject}</span>
                  </button>
              ))}
            </div>

            <button
                onClick={handleLogout}
                className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100"
            >
              <LogOut size={16} />
              Log out
            </button>
          </aside>

          {/* Main */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Top bar */}
            <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-3 md:px-8">
              <div className="flex flex-1 items-center gap-2 rounded-lg bg-slate-100 px-3 py-2">
                <Search size={15} className="text-slate-400" />
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search your study plans"
                    className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
              <button
                  onClick={handleLogout}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 md:hidden"
              >
                Log out
              </button>
            </div>

            <div className="flex-1 space-y-6 p-5 md:p-8">
              {/* Greeting */}
              <header>
                {dateLabel && (
                    <p className="text-sm text-slate-500">{dateLabel}</p>
                )}
                <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                  {greeting}
                </h1>
                <p className="mt-1 text-slate-600">
                  Enter your syllabus and let Prep map out your success.
                </p>

                <div className="mt-5 inline-flex flex-wrap items-center gap-x-6 gap-y-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm text-slate-600">
                <span className="flex items-center gap-2">
                  <Layers size={15} className="text-slate-500" />
                  <b className="text-slate-900">{plans.length}</b> Plans
                  generated
                </span>
                  <span className="flex items-center gap-2">
                  <LayoutDashboard size={15} className="text-slate-500" />
                  <b className="text-slate-900">{subjects.length}</b> Subjects
                </span>
                </div>
              </header>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Form card */}
                <div className="h-fit min-w-0 lg:col-span-1">
                  <StudyForm
                      onPlanGenerated={handleNewPlan}
                      setGlobalLoading={setLoading}
                  />
                </div>

                {/* Plans */}
                <div className="flex flex-col gap-5 lg:col-span-2">
                  {/* Mobile subject tabs (sidebar is hidden on mobile) */}
                  {plans.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto border-b border-slate-200 md:hidden">
                        {uniqueSubjects.map((subject) => (
                            <button
                                key={subject}
                                onClick={() => setSelectedSubject(subject)}
                                className={`-mb-px whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                                    selectedSubject === subject
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-slate-500 hover:text-slate-700"
                                }`}
                            >
                              {subject}
                            </button>
                        ))}
                      </div>
                  )}

                  {plans.length > 0 && (
                      <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-slate-900">
                          {selectedSubject === "All"
                              ? "All Plans"
                              : selectedSubject}
                        </h2>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {visiblePlans.length}{" "}
                          {visiblePlans.length === 1 ? "plan" : "plans"}
                    </span>
                      </div>
                  )}

                  {plans.length === 0 && !loading && (
                      <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60">
                        <p className="text-sm text-slate-500">
                          Your generated study plans will appear here.
                        </p>
                      </div>
                  )}

                  {loading && (
                      <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
                      </div>
                  )}

                  {plans.length > 0 && (
                      <div className="grid grid-cols-1 gap-5">
                        {visiblePlans.map((plan, index) => (
                            <PlanCard key={plan.id || index} plan={plan} />
                        ))}
                        {visiblePlans.length === 0 && (
                            <p className="py-10 text-center text-sm text-slate-500">
                              No plans match your search.
                            </p>
                        )}
                      </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}