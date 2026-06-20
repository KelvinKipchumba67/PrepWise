'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"
import StudyForm from "./StudyForm"
import PlanCard from "./PlanCard"

export default function DashboardClient({ initialPlans = [] }: { initialPlans?: any[] }) {
    const [plans, setPlans] = useState<any[]>(initialPlans)
    const [selectedSubject, setSelectedSubject] = useState("All");
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const uniqueSubjects = [
        "All",
        ...Array.from(new Set(plans.filter(p => p && p.subject).map(p => p.subject)))
    ];
    const handleNewPlan = (newPlan: any) => {
        if (!newPlan) return;

        setPlans(prevPlans => [newPlan, ...prevPlans]);
        setSelectedSubject(newPlan.subject ?? "All");
    }
    const handleLogout = async () => {
        try {
            await fetch("/api/auth?action=logout", {
                method: "POST"
            });
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Failed to logout:", error);
        }
    };
    return (
        <div className="min-h-screen bg-[#F8F9FA] p-8 md:p-16">
            <div className="mx-auto max-w-5xl">
                <header className="mb-12 flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">PrepWise Dashboard</h1>
                        <p className="text-slate-600">Enter your syllabus and let AI map out your success.</p>
                    </div>
                </header>

                <div className="grid gap-8 md:grid-cols-3">
                    <div className="col-span-1 h-fit">
                        <StudyForm onPlanGenerated={handleNewPlan} setGlobalLoading={setLoading} />
                    </div>

                    <div className="col-span-2 flex flex-col gap-6">
                        {plans.length > 0 && (
                            <div className="flex gap-2 border-b border-slate-200 pb-0">
                                {uniqueSubjects.map((subject) => (
                                    <button
                                        key={subject}
                                        onClick={() => setSelectedSubject(subject)}
                                        className={`-mb-[1px] px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                                            selectedSubject === subject
                                                ? "border-blue-600 text-blue-600"
                                                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                                        }`}
                                    >
                                        {subject}
                                    </button>
                                ))}
                            </div>
                        )}

                        {plans.length === 0 && !loading && (
                            <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white/50">
                                <p className="text-sm text-slate-500">Your generated study plans will appear here.</p>
                            </div>
                        )}

                        {loading && (
                            <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
                            </div>
                        )}
                        {plans.length > 0 && (
                            <div className="grid grid-cols-1 gap-6">
                                {plans
                                    .filter(plan => selectedSubject === "All" || plan.subject === selectedSubject)
                                    .map((plan, index) => (
                                        <PlanCard key={plan.id || index} plan={plan} />
                                    ))
                                }
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}