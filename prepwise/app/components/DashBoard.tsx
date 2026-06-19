'use client'

import { useState } from "react"
import StudyForm from "./StudyForm"
import PlanCard from "./PlanCard"

export default function DashboardClient() {
    const [plan, setPlan] = useState(null)
    const [loading, setLoading] = useState(false)

    return (
        <div className="min-h-screen bg-[#F8F9FA] p-8 md:p-16">
            <div className="mx-auto max-w-5xl">
                <header className="mb-12">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">PrepWise Dashboard</h1>
                    <p className="text-slate-600">Enter your syllabus and let AI map out your success.</p>
                </header>

                <div className="grid gap-8 md:grid-cols-3">
                    <div className="col-span-1 h-fit">
                        <StudyForm onPlanGenerated={setPlan} setGlobalLoading={setLoading} />
                    </div>

                    <div className="col-span-2">
                        {!plan && !loading && (
                            <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white/50">
                                <p className="text-sm text-slate-500">Your generated study plan will appear here.</p>
                            </div>
                        )}
                        {loading && (
                            <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
                            </div>
                        )}
                        {plan && <PlanCard plan={plan} />}
                    </div>
                </div>
            </div>
        </div>
    )
}