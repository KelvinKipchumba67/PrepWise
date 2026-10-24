import type { Metadata } from "next";
import LegalPage from "@/app/components/legalPage";

export const metadata: Metadata = { title: "Terms of Service | Prep" };

export default function TermsPage() {
    return (
        <LegalPage
            title="Terms of Service"
            updated="October 24, 2026"
            intro="By creating an account or using Prep, you agree to these terms. If you don't agree, please don't use the service."
            sections={[
                {
                    heading: "The service",
                    body: [
                        "Prep generates personalized study schedules from the subject, topics, and exam date you provide, and lets you save and revisit them.",
                    ],
                },
                {
                    heading: "Your account",
                    body: [
                        "You're responsible for your account and for keeping your login details secure. Provide accurate information and tell us if you think your account has been accessed without permission.",
                    ],
                },
                {
                    heading: "Acceptable use",
                    body: ["You agree not to:"],
                    list: [
                        "Use Prep for anything unlawful or harmful.",
                        "Attempt to break, overload, or gain unauthorized access to the service.",
                        "Submit content that infringes others' rights or contains malicious code.",
                    ],
                },
                {
                    heading: "AI-generated content",
                    body: [
                        "Study plans are produced by AI and may contain mistakes or may not suit your situation. Treat them as a starting point and check them against your syllabus and your instructor's guidance. We don't guarantee any exam result.",
                    ],
                },
                {
                    heading: "Your content",
                    body: [
                        "You keep ownership of what you submit. You give us permission to process it and store it so we can provide the service to you.",
                    ],
                },
                {
                    heading: "Our property",
                    body: [
                        "The Prep name, design, and software belong to us. You may not copy or resell them without permission.",
                    ],
                },
                {
                    heading: "Availability and changes",
                    body: [
                        "We may change, pause, or end features at any time, and we don't promise the service will always be uninterrupted or error-free.",
                    ],
                },
                {
                    heading: "Termination",
                    body: [
                        "You can stop using Prep at any time. We may suspend or close accounts that break these terms.",
                    ],
                },
                {
                    heading: "Disclaimer and liability",
                    body: [
                        "Prep is provided \"as is\" without warranties. To the extent the law allows, we aren't liable for indirect or consequential losses arising from your use of the service.",
                    ],
                },
                {
                    heading: "Changes to these terms",
                    body: [
                        "We may update these terms. Continuing to use Prep after a change means you accept the new version.",
                    ],
                },
                {
                    heading: "Contact us",
                    body: ["Questions about these terms? Email us at your-email@example.com."],
                },
            ]}
        />
    );
}