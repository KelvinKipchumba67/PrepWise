'use client'
import { useEffect, useRef } from "react";
import Image from "next/image";
const images = [
    "/assets/images/study1.jpg",
    "/assets/images/study2.jpg",
    "/assets/images/study3.jpg",
];

export default function MarqueeSection() {
    return (
        <div style={{ backgroundColor: "#F5E06E", overflow: "hidden", paddingBottom: "4rem" }}>

            {/* Image Marquee */}
            <div style={{ overflow: "hidden", marginBottom: "2rem" }}>
                <div className="marquee-track">
                    {[...images, ...images].map((src, i) => (
                        <div key={i} className="marquee-item">
                            <Image
                                src={src}
                                alt={`Study scene ${(i % images.length) + 1}`}
                                width={350}
                                height={220}
                                sizes="350px"
                                priority={i < 3}
                                className="rounded-2xl object-cover"
                                style={{ width: 350, height: 220, flexShrink: 0 }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Text Marquee */}
            <div style={{ overflow: "hidden", borderTop: "2px solid #111", borderBottom: "2px solid #111", padding: "1rem 0" }}>
                <div className="marquee-track-reverse">
                    {["Smart Scheduling", "AI Powered", "Study Smarter", "Personalized Plans", "Flexible Learning", "Exam Ready", "Smart Scheduling", "AI Powered", "Study Smarter", "Personalized Plans", "Flexible Learning", "Exam Ready"].map((text, i) => (
                        <span key={i} style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111", whiteSpace: "nowrap", paddingRight: "3rem" }}>
                            {text} <span style={{ color: "#9333ea" }}></span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}