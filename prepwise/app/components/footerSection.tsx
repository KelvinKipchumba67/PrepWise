"use client"
import Link from "next/link";
import React from "react";

type SocialLink = {
    label: string;
    href: string;
    icon: React.ReactNode;
};

export default function Footer() {
    const navLinks = ["Home", "Features", "Support", "About"];

    const socialLinks: SocialLink[] = [
        {
            label: "Facebook",
            href: "#",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
            ),
        },
        {
            label: "Twitter",
            href: "#",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
            ),
        },
        {
            label: "Instagram",
            href: "#",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
            ),
        },
        {
            label: "LinkedIn",
            href: "#",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                </svg>
            ),
        },
        {
            label: "Twitch",
            href: "#",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                    <path d="M21 2H3v16h5v4l4-4h5l4-4V2zM11 11V7M16 11V7" />
                </svg>
            ),
        },
    ];

    const circleStyle: React.CSSProperties = {
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#111111",
        textDecoration: "none",
    };

    return (
        <footer
            style={{ backgroundColor: "black", color: "#111111" }}
            className="w-full py-16 px-6 flex flex-col items-center text-center gap-8"
        >
            <nav style={{ display: "flex", gap: "2rem" }}>
                {navLinks.map((link) => (
                    <Link
                        key={link}
                        href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                        style={{ color: "white", fontWeight: 500, fontSize: "1.1rem", textDecoration: "none" }}
                    >
                        {link}
                    </Link>
                ))}
            </nav>

            <div style={{ display: "flex", gap: "1rem" }}>
                {socialLinks.map((social) => {
                    return (
                        <a key={social.label} href={social.href} aria-label={social.label} style={circleStyle}>
                            {social.icon}
                        </a>
                    );
                })}
            </div>

            <p style={{ color: "#374151", fontSize: "0.875rem", margin:"20px" }}>
                © 2026 PrepWise Lite. All rights reserved.
            </p>
        </footer>
    );
}