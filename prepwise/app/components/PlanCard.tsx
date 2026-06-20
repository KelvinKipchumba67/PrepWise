interface PlanData{
    title: string;
    days:{
        day: string;
        focus: string;
        tasks: string[];
    }
}
export default function PlanCard({ plan }: { plan: any }) {
    const normalizedPlan = plan?.schedule ? plan.schedule : plan;
    const planDays = normalizedPlan?.days || [];
    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">{normalizedPlan?.title || "Study Plan"}</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {planDays.map((day: any, idx: number) => (
                    <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="font-bold text-blue-600">{day.day}</h3>
                        <p className="mb-3 text-sm font-medium text-slate-900">{day.focus}</p>
                        <ul className="space-y-2">
                            {(day.tasks || day.topics || []).map((task: string, i: number) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                    <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300"></span>
                                    {task}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}