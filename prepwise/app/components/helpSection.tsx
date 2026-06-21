'use client'
import { useState } from "react";
export default function SupportPage() {
    const [formData, setFormData] = useState({
        name: "", school: "", email: "", phone: "", message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async () => {
        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", school: "", email: "", phone: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const inputStyle: React.CSSProperties = {
        backgroundColor: "transparent",
        border: "none",
        borderBottom: "1px solid #4a5568",
        color: "#ffffff",
        fontSize: "1rem",
        padding: "0.5rem 0",
        width: "100%",
        outline: "none",
    };

    const labelStyle: React.CSSProperties = {
        color: "#ffffff",
        fontSize: "0.875rem",
        fontWeight: 700,
        marginBottom: "0.5rem",
        display: "block",
    };

    return (
        <>
            <div style={{ backgroundColor: "#0a1a0a", minHeight: "100vh", paddingTop: "140px", paddingBottom: "4rem" }}>
                <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 2rem" }}>
                    <h2 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.5rem" }}>
                        Reach Out{" "}
                        <span style={{ color: "#4a7c59" }}>for</span>{" "}
                        <span style={{ color: "#4a7c59" }}>Help</span>
                    </h2>
                    <h3 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#ffffff", marginBottom: "2.5rem" }}>
                        We're Here
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                        <div className="form-row" style={{ display: "flex", gap: "2rem" }}>
                            <div style={{ flex: 1 }}>
                                <label style={labelStyle}>Your Name</label>
                                <input name="name" placeholder="Name Here" style={inputStyle} onChange={handleChange} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={labelStyle}>Your School</label>
                                <input name="school" placeholder="School Name" style={inputStyle} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-row" style={{ display: "flex", gap: "2rem" }}>
                            <div style={{ flex: 1 }}>
                                <label style={labelStyle}>Email Address</label>
                                <input name="email" type="email" placeholder="Email Here" style={inputStyle} onChange={handleChange} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={labelStyle}>Phone Number</label>
                                <input name="phone" type="tel" placeholder="Phone Here" style={inputStyle} onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>Your Message</label>
                            <textarea
                                name="message"
                                placeholder="Message Here"
                                rows={4}
                                style={{ ...inputStyle, resize: "vertical" }}
                                onChange={handleChange}
                            />
                        </div>
                        <div>

                            {status === "success" && (
                                <p style={{ color: "#4ade80", marginBottom: "1rem" }}>
                                    Message sent successfully!
                                </p>
                            )}
                            {status === "error" && (
                                <p style={{ color: "#f87171", marginBottom: "1rem" }}>
                                    Failed to send. Please try again.
                                </p>
                            )}


                            <button
                                onClick={handleSubmit}
                                disabled={status === "sending"}
                                style={{
                                    backgroundColor: "#3d6b4f",
                                    color: "#ffffff",
                                    border: "none",
                                    padding: "0.875rem 3rem",
                                    fontSize: "1rem",
                                    fontWeight: 600,
                                    cursor: status === "sending" ? "not-allowed" : "pointer",
                                    opacity: status === "sending" ? 0.7 : 1,
                                    transition: "background-color 0.2s ease, transform 0.2s ease",
                                }}
                            >
                                {status === "sending" ? "Sending..." : "Send Message"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}