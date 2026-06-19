import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyToken, cookieOptions } from "@/lib/auth";
import PlanCard from "@/app/components/PlanCard";

export default async function PlansPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieOptions.name || "token")?.value;

  if (!token) {
    redirect("/auth");
  }

  let userId: string;
  try {
    const payload = await verifyToken(token);
    userId = payload.sub as string;
  } catch (error) {
    redirect("/auth");
  }

  const savedPlans = await prisma.studyPlan.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 md:p-16">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              My Study Plans
            </h1>
            <p className="mt-2 text-slate-600">
              Review your previously generated schedules.
            </p>
          </div>
          <a
            href="/"
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            + New Plan
          </a>
        </header>

        {savedPlans.length === 0 ? (
          <div className="flex h-100 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white/50 text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              No plans yet
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Generate your first study schedule to see it here.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {savedPlans.map((plan) => (
              <div key={plan.id} className="relative">
                {/* Plan Metadata Header */}
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-blue-600">
                      Subject
                    </span>
                    <span className="font-semibold text-slate-900">
                      {plan.subject}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-blue-600">
                      Exam Date
                    </span>
                    <span className="font-semibold text-slate-900">
                      {new Date(plan.examDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="hidden md:block">
                    <span className="block text-xs font-bold uppercase tracking-wider text-blue-600">
                      Created On
                    </span>
                    <span className="font-semibold text-slate-900">
                      {new Date(plan.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <PlanCard plan={plan.schedule as any} />

                <div className="mt-12 h-px w-full bg-slate-200"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
