import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footerSection";
import FeatureSection from "@/app/components/featureSection";

export default function FeaturesPage() {
    return (
        <>
            <Navbar />
            <div style={{ paddingTop: "120px" }}>
                <FeatureSection />
            </div>
            <Footer />
        </>
    );
}