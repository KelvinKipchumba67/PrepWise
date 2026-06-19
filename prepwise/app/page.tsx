import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken, cookieOptions } from "@/lib/auth";
import DashboardClient from "@/app/components/DashBoard";

export default async function HomePage() {
  // 1. Get the cookies safely on the server
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieOptions.name || "token")?.value;
  if (!token) {
    redirect("/auth");
  }

  try {
    await verifyToken(token);
  } catch (error) {
    redirect("/auth");
  }
  return <DashboardClient />;
}
