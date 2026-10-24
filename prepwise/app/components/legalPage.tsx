import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footerSection";

export type LegalSection = {
    heading: string;
    body: string[]; // each string is a paragraph
    list?: string[];
};

export default function LegalPage({
                                      title,
                                      updated,
                                      intro,
                                      sections,
                                  }: {
    title: string;
    updated: string;
    intro: string;
    sections: LegalSection[];
}) {
    return (
        <div className="bg-white">
            <Navbar />
            <main className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
                >
                    <ArrowLeft size={16} />
                    Back to home
                </Link>

                <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-[#0B2410] md:text-5xl">
                    {title}
                </h1>
                <p className="mt-3 text-sm text-slate-500">Last updated: {updated}</p>
                <p className="mt-6 text-lg leading-relaxed text-slate-600">{intro}</p>

                <div className="mt-10 space-y-10">
                    {sections.map((s, i) => (
                        <section key={s.heading}>
                            <h2 className="text-xl font-bold text-slate-900">
                                {i + 1}. {s.heading}
                            </h2>
                            {s.body.map((p) => (
                                <p key={p} className="mt-3 leading-relaxed text-slate-600">
                                    {p}
                                </p>
                            ))}
                            {s.list && (
                                <ul className="mt-3 list-disc space-y-1.5 pl-6 text-slate-600">
                                    {s.list.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}