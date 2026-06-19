"use client";
import { useState } from "react";

interface StudyFormProps {
  onPlanGenerated: (plan: any) => void;
  setGlobalLoading: (loading: boolean) => void;
}
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const generateData = await generateRes.json();
      if (!generateRes.ok) throw new Error(generateData.error);

      const generatedSchedule = generateData.subplan;
      const saveRes = await fetch("/api/plans", {
        method: "POST",
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
      onPlanGenerated(generatedSchedule);
    } catch (err: any) {
      setError(err.message || "Failed to generate plan.");
    } finally {
      setGlobalLoading(false);
    }
  }
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            placeholder="e.g., Data Structures"
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Core Topics
          </label>
          <textarea
            name="topics"
            rows={3}
            placeholder="Trees, Graphs, Dynamic Programming..."
            required
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Exam Date
          </label>
          <input
            type="date"
            name="examDate"
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
          Generate Schedule
        </button>
      </form>
      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
    </div>
  );
}
