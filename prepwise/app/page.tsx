import Navbar from "./components/navbar";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cookieOptions } from "@/lib/auth";
import FeatureSection from "@/app/components/featureSection";
import Footer from "@/app/components/footerSection";

export default async function LandingPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieOptions.name || "token")?.value;
  if (token) {
    redirect("/dashboard");
  }

  return (
      <div className="bg-white">
        <Navbar />
          <main
              style={{
                  position: "relative",
                  minHeight: "100vh",
                  paddingTop: "120px",
                  backgroundColor: "#0f172a",
                  backgroundImage: `linear-gradient(to bottom right, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.7)), url('/hero-bg.jpg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
              }}
          >
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
                      href="/auth"
                      className="hero-btn"
                      style={{
                          backgroundColor: "#334155",
                          color: "#ffffff",
                          borderRadius: "9999px",
                          padding: "1rem 2.5rem",
                          fontSize: "1.25rem",
                          fontWeight: 700,
                          textDecoration: "none",
                          boxShadow: "0 20px 25px rgba(0,0,0,0.3)",
                      }}
                  >
                      Get Started
                  </Link>
              </div>
          </main>
          <FeatureSection />
          <Footer/>
      </div>
  );
}