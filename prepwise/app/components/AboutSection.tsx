import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft,
    ArrowRight,
    BookmarkCheck,
    CalendarClock,
    Sparkles,
    MousePointerClick,
} from "lucide-react";

const features = [
    {
        icon: Sparkles,
        title: "Personalized Study Plans",
        text: "Generate custom schedules tailored to your subject and topic list.",
    },
    {
        icon: CalendarClock,
        title: "Exam-Focused Planning",
        text: "Build timelines backward from your exam date for efficient preparation.",
    },
    {
        icon: BookmarkCheck,
        title: "Saved Plans",
        text: "Store generated schedules for future access and progress tracking.",
    },
    {
        icon: MousePointerClick,
        title: "Simple User Experience",
        text: "A lightweight, easy-to-use interface for quick planning.",
    },
];

const steps = [
    "Enter your subject",
    "Add the topics you want to study",
    "Set your exam date",
    "Prep generates a structured, personalized study plan",
    "Save and revisit your plan anytime",
];

export default function AboutSection({
                                         isLoggedIn = false,
                                         showBackLink = false,
                                     }: {
    isLoggedIn?: boolean;
    showBackLink?: boolean;
}) {
    return (
        <div className="w-full bg-white">
            {/* Hero */}
            <section className="grid min-h-[80vh] w-full lg:grid-cols-2">
                <div className="flex flex-col justify-center px-6 py-16 md:px-16 lg:px-20">
                    {showBackLink && (
                        <Link
                            href="/"
                            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
                        >
                            <ArrowLeft size={16} />
                            Back to home
                        </Link>
                    )}
                    <span className="inline-block w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800">
            About Prep
          </span>
                    <h2 className="mt-5 text-5xl font-extrabold leading-tight tracking-tight text-[#0B2410] md:text-6xl">
                        Your study partner
                    </h2>
                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                        PrepWise is an AI-powered study planner that helps students build
                        personalized revision schedules based on their subject, topics, and
                        exam date.
                    </p>
                    <Link
                        href={isLoggedIn ? "/dashboard" : "/auth"}
                        className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-slate-800 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-700"
                    >
                        {isLoggedIn ? "Go to Dashboard" : "Get Started"}
                        <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="relative min-h-[50vh] w-full lg:min-h-[80vh]">
                    <Image
                        src="/assets/images/about.jpg"
                        alt="A student holding notebooks and pointing"
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                    />
                </div>
            </section>

            {/* Features */}
            <section className="w-full px-6 py-20 md:px-16 lg:px-20">
                <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                    What you get
                </h3>
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map(({ icon: Icon, title, text }) => (
                        <div
                            key={title}
                            className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                                <Icon size={20} />
                            </div>
                            <h4 className="mt-4 font-semibold text-slate-900">{title}</h4>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How it works */}
            <section className="w-full bg-slate-50 px-6 py-20 md:px-16 lg:px-20">
                <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                    How it works
                </h3>
                <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    {steps.map((step, i) => (
                        <li key={step} className="flex flex-col gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B2410] text-sm font-bold text-white">
                {i + 1}
              </span>
                            <p className="text-sm leading-relaxed text-slate-700">{step}</p>
                        </li>
                    ))}
                </ol>
            </section>
        </div>
    );
}