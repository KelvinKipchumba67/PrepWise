import PrepWiseNavbar from "@/app/components/navbar";
import Footer from "@/app/components/footerSection";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <PrepWiseNavbar showLogout={true} />
            <div>
                {children}
            </div>
            <Footer />
        </>
    );
}