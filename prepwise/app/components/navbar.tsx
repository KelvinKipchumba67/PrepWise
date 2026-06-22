"use client"
import Link from "next/link";

interface NavbarProps {
    showLogout?: boolean;
}

export default function PrepWiseNavbar({ showLogout = false }: NavbarProps) {
    return (
        <div
              style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
        >
            <nav className="nav-wrapper  mx-auto max-w-7xl w-full  bg-white/70 backdrop-blur-md px-10 py-5 flex items-center justify-between shadow-lg">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-charcoal-800 border border-slate-200">
                        <span className="text-xl font-bold text-black">P</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">
                        Prep
                    </span>
                </Link>

                <div className="nav-links flex items-center gap-8">
                    {/*<Link href="/features" className="text-base font-medium text-slate-700 hover:text-slate-900 transition-colors">*/}
                    {/*    Features*/}
                    {/*</Link>*/}
                    {/*<Link href="/team" className="text-base font-medium text-slate-700 hover:text-slate-900 transition-colors">*/}
                    {/*    Team*/}
                    {/*</Link>*/}
                    {/*<Link href="/news" className="text-base font-medium text-slate-700 hover:text-slate-900 transition-colors">*/}
                    {/*    News*/}
                    {/*</Link>*/}
                </div>

                {showLogout ? (
                    <LogoutButton />
                ) : (
                    <Link
                        href="/auth"
                        style={{ backgroundColor: "#0a1a0a", color: "#ffffff" }}
                        className="nav-join-btn rounded-full px-8 py-3.5 text-base font-bold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    >
                        Join Now
                    </Link>
                )}
            </nav>
        </div>
    );
}

import { useRouter } from "next/navigation";

function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch("/api/auth?action=logout", { method: "POST" });
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Failed to logout:", error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="rounded-full border border-slate-200 px-8 py-3.5 text-base font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50 hover:text-red-600"
            style={{ backgroundColor: "#0a1a0a", color: "#ffffff" }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#132613"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#0a1a0a"}
        >
            Log out
        </button>
    );
}