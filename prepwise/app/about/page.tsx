import { cookies } from "next/headers";
import { cookieOptions } from "@/lib/auth";
import AboutSection from "@/app/components/AboutSection";

export default async function AboutPage() {
    const cookieStore = await cookies();
    const isLoggedIn = Boolean(cookieStore.get(cookieOptions.name || "token")?.value);

    return (
        <main>
            <AboutSection isLoggedIn={isLoggedIn} showBackLink />
        </main>
    );
}