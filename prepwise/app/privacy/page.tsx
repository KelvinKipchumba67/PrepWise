import type { Metadata } from "next";
import LegalPage from "@/app/components/legalPage";

export const metadata: Metadata = { title: "Privacy Policy | Prep" };

export default function PrivacyPage() {
    return (
        <LegalPage
            title="Privacy Policy"
            updated="October 24, 2026"
            intro="Prep is an AI-powered study planner. This policy explains what information we collect, how we use it, and the choices you have."
            sections={[
                {
                    heading: "Information we collect",
                    body: ["We collect only what we need to run the service:"],
                    list: [
                        "Account information, such as your email and a securely stored password or sign-in credential.",
                        "Study details you enter: your subject, core topics, and exam date.",
                        "The study plans generated for you and saved to your account.",
                        "A login cookie that keeps you signed in.",
                    ],
                },
                {
                    heading: "How we use your information",
                    body: ["We use your information to:"],
                    list: [
                        "Create your account and keep you signed in.",
                        "Generate and save personalized study schedules.",
                        "Maintain, secure, and improve the service.",
                    ],
                },
                {
                    heading: "AI processing",
                    body: [
                        "To build your schedule, the subject, topics, and exam date you submit are sent to an AI service that generates the plan. Please don't include sensitive personal information in these fields.",
                    ],
                },
                {
                    heading: "Cookies",
                    body: [
                        "We use a cookie to keep you logged in. It is essential for the dashboard to work. We don't use it for advertising.",
                    ],
                },
                {
                    heading: "Sharing your information",
                    body: [
                        "We don't sell your personal information. We share data only with service providers that help us run Prep (such as hosting, database, and AI providers), or when the law requires it.",
                    ],
                },
                {
                    heading: "Data retention and deletion",
                    body: [
                        "We keep your account and saved plans until you ask us to delete them. To request deletion, contact us using the details below.",
                    ],
                },
                {
                    heading: "Security",
                    body: [
                        "We use reasonable safeguards to protect your information, but no online service can guarantee absolute security.",
                    ],
                },
                {
                    heading: "Children",
                    body: [
                        "Prep is intended for students who can agree to these terms under their local law. If you're a parent and believe your child has given us information, contact us and we'll remove it.",
                    ],
                },
                {
                    heading: "Changes to this policy",
                    body: [
                        "We may update this policy from time to time. The date at the top shows when it last changed.",
                    ],
                },
                {
                    heading: "Contact us",
                    body: ["Questions about your privacy? Email us at your-email@example.com."],
                },
            ]}
        />
    );
}