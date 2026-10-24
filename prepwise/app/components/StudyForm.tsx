"use client";
import { useState } from "react";
import { Sparkles } from "lucide-react";

interface StudyFormProps {
  onPlanGenerated: (plan: any) => void;
  setGlobalLoading: (loading: boolean) => void;
}

const inputClass =
    "w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-blue-500 focus:bg-white";

export default function StudyForm({
                                    onPlanGenerated,
                                    setGlobalLoading,
                                  }: StudyFormProps) {
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setGlobalLoading(true);
    setError("");

    onPlanGenerated(null);
    const fd = new FormData(e.currentTarget);
    const plan = JSON.stringify({
      subject: fd.get("subject"),
      topics: fd.get("topics"),
      examDate: fd.get("examDate"),
    });
    try {
      const generateRes = await fetch("/api/generate", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const generateData = await generateRes.json();
      if (!generateRes.ok) throw new Error(generateData.error);

      const generatedSchedule = generateData.subplan;
      const saveRes = await fetch("/api/plans", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: fd.get("subject"),
          topics: fd.get("topics"),
          examDate: fd.get("examDate"),
          schedule: generatedSchedule,
        }),
      });

      if (!saveRes.ok) {
        const saveData = await saveRes.json().catch(() => ({}));
        throw new Error(
            saveData.error || "Plan generated, but failed to save to database.",
        );
      }
      const saveData = await saveRes.json().catch(() => ({}));
      onPlanGenerated(saveData.plan ?? { schedule: generatedSchedule });
    } catch (err: any) {
      setError(err.message || "Failed to generate plan.");
    } finally {
      setGlobalLoading(false);
    }
  }

  return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-3.5">
          <Sparkles size={16} className="text-slate-500" />
          <h2 className="text-sm font-semibold text-slate-900">New Study Plan</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Subject
            </label>
            <input
                type="text"
                name="subject"
                placeholder="e.g., Data Structures"
                required
                className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Core Topics
            </label>
            <textarea
                name="topics"
                rows={3}
                placeholder="Trees, Graphs, Dynamic Programming..."
                required
                className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Exam Date
            </label>
            <input type="date" name="examDate" required className={inputClass} />
          </div>

          <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
          >
            Generate Schedule
          </button>

          {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
          )}
        </form>
      </div>
  );
}