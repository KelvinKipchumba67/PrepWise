"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavbarProps {
    showLogout?: boolean;
}

export default function PrepWiseNavbar({ showLogout = false }: NavbarProps) {
    return (
        <header className="w-full bg-white shadow-sm border-b border-gray-100">
            <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white">
                        <span className="text-xl font-bold text-slate-900">P</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">
                        Prep
                    </span>
                </Link>

                <div className="flex items-center gap-8">
                    {showLogout ? (
                        <LogoutButton />
                    ) : (
                        <Link
                            href="/auth"
                            className="rounded-full bg-[#0a1a0a] px-8 py-3 text-sm font-medium text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#132613]"
                        >
                            Join Now
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}

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
            className="rounded-full bg-[#0a1a0a] px-8 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#132613]"
        >
            Log out
        </button>
    );
}