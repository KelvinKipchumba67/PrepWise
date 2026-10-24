"use client";
import Link from "next/link";

export default function Footer() {
    const navLinks = [
        { label: "Home", href: "/#home" },
        { label: "Features", href: "/#features" },
        { label: "Support", href: "/#support" },
        { label: "About", href: "/#about" },
    ];

    return (
        <footer
            style={{ backgroundColor: "black" }}
            className="flex w-full flex-col items-center gap-8 px-6 py-12 text-center"
        >
            <nav style={{ display: "flex", gap: "2rem" }}>
                {navLinks.map(({ label, href }) => (
                    <Link
                        key={label}
                        href={href}
                        style={{ color: "white", fontWeight: 500, fontSize: "1.1rem", textDecoration: "none" }}
                    >
                        {label}
                    </Link>
                ))}
            </nav>

            <div style={{ display: "flex", gap: "1.5rem" }}>
                <Link href="/privacy" style={{ color: "#9ca3af", fontSize: "0.875rem", textDecoration: "none" }}>
                    Privacy Policy
                </Link>
                <Link href="/terms" style={{ color: "#9ca3af", fontSize: "0.875rem", textDecoration: "none" }}>
                    Terms of Service
                </Link>
            </div>

            <p style={{ color: "#9ca3af", fontSize: "0.875rem", margin: 0 }}>
                © 2026 Prep Lite. All rights reserved.
            </p>
        </footer>
    );
}