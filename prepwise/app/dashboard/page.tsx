import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken, cookieOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma"; // 1. Import Prisma
import DashboardClient from "@/app/components/DashBoard";

export default async function HomePage() {
    const cookieStore = await cookies();
    const token = cookieStore.get(cookieOptions.name || "token")?.value;

    if (!token) {
        redirect("/auth");
    }

    let userId: string;
    try {
        const payload = await verifyToken(token);
        userId = payload.sub as string;
    } catch (error) {
        redirect("/auth");
    }
    const savedPlans = await prisma.studyPlan.findMany({
        where: { userId: userId },
        orderBy: { createdAt: "desc" }
    });
    return <DashboardClient initialPlans={savedPlans} />;
}