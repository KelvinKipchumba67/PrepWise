"use client"
import Link from "next/link";


export default function FeatureSection() {
    const features = ["Smart", "Flexible", "Personalized"];

    return (
        <section
            style={{ backgroundColor: "#F5E06E", color: "#111111" }}
            className="w-full py-24 px-6 flex flex-col items-center text-center"
        >
            <p className="features-heading" style={{ color: "#374151", fontSize: "0.875rem", letterSpacing: "0.05em", marginBottom: "1rem", margin:"20px" }}>
                Features Galore
            </p>
            <h2 style={{ color: "#111111", fontSize: "3.75rem", fontWeight: 800, marginBottom: "1rem" }}>
                Awesome Features
            </h2>
            <p style={{ color: "#374151", fontSize: "1rem", marginBottom: "4rem", maxWidth: "28rem" }}>
                A planner that adapts to your craziness with study schedules
            </p>
            <div className="features-circles" style={{ display: "flex", flexDirection: "row", gap: "1.5rem", marginBottom: "4rem" }}>
                {features.map((feature) => (
                    <div
                        key={feature}
                        className="features-circle-effects features-circles"
                        style={{
                            width: "200px",
                            height: "200px",
                            borderRadius: "50%",
                            backgroundColor: "#0a1a0a",
                            boxShadow: "inset -8px 0 16px rgba(0,0,0,0.18)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
            <span style={{ color: "white", fontSize: "1rem", fontWeight: 500 }}>
              {feature}
            </span>
                    </div>
                ))}
            </div>
            <Link href="/auth">
                <button
                    className="join-btn"
                    style={{
                        backgroundColor: "#0a1a0a",
                        color: "white",
                        fontWeight: 600,
                        padding: "0.75rem 2rem",
                        borderRadius: "9999px",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        margin:"20px auto",
                    }}
                >
                    Join Now
                </button>
            </Link>
        </section>
    );
}