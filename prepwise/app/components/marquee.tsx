'use client'
import { useEffect, useRef } from "react";

export default function MarqueeSection() {
    return (
        <div style={{ backgroundColor: "#F5E06E", overflow: "hidden", paddingBottom: "4rem" }}>

            {/* Image Marquee */}
            <div style={{ overflow: "hidden", marginBottom: "2rem" }}>
                <div className="marquee-track">
                    {[
                        "/assets/images/study1.jpg",
                        "/assets/images/study2.jpg",
                        "/assets/images/study3.jpg",
                        "/assets/images/study1.jpg",
                        "/assets/images/study2.jpg",
                        "/assets/images/study3.jpg",
                    ].map((src, i) => (
                        <div key={i} className="marquee-item">
                            <img
                                src={src}
                                alt={`study ${i}`}
                                style={{
                                    width: "350px",
                                    height: "220px",
                                    objectFit: "cover",
                                    borderRadius: "1rem",
                                    flexShrink: 0,
                                }}
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