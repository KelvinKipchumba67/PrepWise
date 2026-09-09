export default function AboutPage() {
    return (
        <main
            style={{
                backgroundColor: "#ffffff",
                minHeight: "100vh",
                padding: "80px 64px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    gap: "64px",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    alignItems: "flex-start",
                }}
            >
                {/* Left column: text content */}
                <div style={{ flex: "1 1 50%" }}>
                    <h1
                        style={{
                            fontSize: "3rem",
                            fontWeight: 800,
                            color: "#0B2410",
                            margin: "0 0 24px 0",
                            lineHeight: 1.1,
                        }}
                    >
                        About
                    </h1>

                    <p
                        style={{
                            fontSize: "1.05rem",
                            color: "#6b7280",
                            margin: "0 0 28px 0",
                        }}
                    >
                        Prep Study Planner
                    </p>

                    <p
                        style={{
                            fontSize: "0.95rem",
                            color: "#111827",
                            lineHeight: 1.7,
                            margin: "0 0 20px 0",
                        }}
                    >
                        Your Study Partner
                    </p>

                    <p
                        style={{
                            fontSize: "0.95rem",
                            color: "#374151",
                            lineHeight: 1.7,
                        }}
                    >
                        PrepWise is an AI-powered study planner that helps students build personalized revision schedules based on their subject, topics, and exam date.

                        Features:

                        Personalized Study Plans
                        Generate custom schedules tailored to your subject and topic list.

                        Exam-Focused Planning
                        Build timelines backward from your exam date for efficient preparation.

                        Saved Plans
                        Store generated schedules for future access and progress tracking.

                        Simple User Experience
                        Lightweight and easy-to-use interface for quick planning.

                        How It Works;
                        Enter your subject,
                        Add the topics you want to study,
                        Set your exam date,
                        Prep generates a structured, personalized study plan.
                        Save and revisit your plan anytime.
                    </p>
                </div>
                <div style={{ flex: "1 1 50%" }}>
                    <img
                        src="/assets/images/about.jpg"
                        alt="About"
                        style={{
                            width: "100%",
                            height: "100%",
                            aspectRatio: "4 / 3",
                            objectFit: "cover",
                            borderRadius: "4px",
                        }}
                    />
                </div>
            </div>
        </main>
    );
}