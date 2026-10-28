import { BookOpen } from "lucide-react";

export default function PlanCard({ plan }: { plan: any }) {
    const normalizedPlan = plan?.schedule ? plan.schedule : plan;
    const planDays = normalizedPlan?.days || [];

    return (
        <div className="min-w-0 space-y-5">
            {/* Title card */}
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <BookOpen size={18} />
                    </div>
                    <h2 className="truncate text-lg font-bold text-slate-900">
                        {normalizedPlan?.title || "Study Plan"}
                    </h2>
                </div>
                <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {planDays.length} {planDays.length === 1 ? "day" : "days"}
        </span>
            </div>

            {/* Day cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {planDays.map((day: any, idx: number) => {
                    const tasks: string[] = day.tasks || day.topics || [];
                    return (
                        <div
                            key={idx}
                            className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white"
                        >
                            <div className="flex items-center justify-between gap-2 border-b border-slate-200 bg-slate-50/70 px-5 py-3">
                <span className="max-w-[70%] truncate rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                  {day.day}
                </span>
                                <span className="text-xs text-slate-500">
                  {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
                </span>
                            </div>

                            <div className="p-5">
                                <p className="mb-3 text-sm font-semibold text-slate-900">
                                    {day.focus}
                                </p>
                                <ul className="space-y-2.5">
                                    {tasks.map((task: string, i: number) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-2.5 text-sm text-slate-600"
                                        >
                                            <span className="min-w-0 break-words mt-0.5 block h-4 w-4 shrink-0 rounded-full border-2 border-slate-300" />
                                            {task}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}