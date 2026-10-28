import Navbar from "./components/navbar";
import Link from "next/link";
import { cookies } from "next/headers";
import { cookieOptions } from "@/lib/auth";
import FeatureSection from "@/app/components/featureSection";
import Footer from "@/app/components/footerSection";
import HelpSection from "@/app/components/support";
import MarqueeSection from "@/app/components/marquee";
import Image from "next/image";
import AboutSection from "@/app/components/AboutSection";

export default async function LandingPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieOptions.name || "token")?.value;
  const isLoggedIn = Boolean(token);

  return (
      <div className="bg-white">
        <Navbar />
          <main id="home">
              <section
                  style={{
                      position: "relative",
                      minHeight: "100vh",
                      paddingTop: "120px",
                      backgroundColor: "#0a1a0a",
                      scrollMarginTop: "80px",
                      overflow: "hidden",
                  }}
              >
                  {/* Background image */}
                  <Image
                      src="/hero-bg.jpg"
                      alt=""
                      fill
                      priority
                      sizes="100vw"
                      quality={70}
                      className="object-cover object-center"
                  />

                  {/* Gradient overlay */}
                  <div
                      style={{
                          position: "absolute",
                          inset: 0,
                          background:
                              "linear-gradient(to bottom right, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.7))",
                      }}
                  />

                  {/* Your content: needs to sit above the layers */}
                  <div style={{ position: "relative", zIndex: 1 }}>
                      {/* hero content here */}
                  </div>
              </section>

              <div
                  className="hero-content"
                  style={{
                      position: "absolute",
                      bottom: "4rem",
                      left: "4rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      maxWidth: "56rem",
                      padding: "0 1.5rem",
                  }}
              >
                  <h1
                      className="hero-heading"
                      style={{
                          fontSize: "5rem",
                          fontWeight: 900,
                          color: "#ffffff",
                          marginBottom: "1.5rem",
                          letterSpacing: "-0.02em",
                          lineHeight: 1.1,
                          textShadow: "0 4px 6px rgba(0,0,0,0.3)",
                      }}
                  >
                      Study Smarter
                  </h1>

                  <p
                      className="hero-subtext"
                      style={{
                          fontSize: "1.25rem",
                          fontWeight: 300,
                          color: "#cbd5e1",
                          marginBottom: "2.5rem",
                          maxWidth: "42rem",
                          lineHeight: 1.7,
                      }}
                  >
                      Craft your perfect study schedule with our intuitive AI planner. Be ready, and smash that exam
                  </p>

                  <Link
                      href={isLoggedIn ? "/dashboard" : "/auth"}
                      className="hero-btn"
                      style={{
                          backgroundColor: isLoggedIn ? "#2563eb" : "#334155",
                          color: "#ffffff",
                          borderRadius: "9999px",
                          padding: "1rem 2.5rem",
                          fontSize: "1.25rem",
                          fontWeight: 700,
                          textDecoration: "none",
                          boxShadow: "0 20px 25px rgba(0,0,0,0.3)",
                      }}
                  >
                      {isLoggedIn ? "Go to Dashboard" : "Get Started"}
                  </Link>
              </div>
          </main>
          <section id="features" style={{ scrollMarginTop: "80px" }}>
              <FeatureSection />
          </section>

          <MarqueeSection />

          <section id="about" style={{ scrollMarginTop: "80px" }}>
              <AboutSection isLoggedIn={isLoggedIn} />
          </section>

          <section id="support" style={{ scrollMarginTop: "80px" }}>
              <HelpSection />
          </section>

          <Footer />
      </div>
  );
}