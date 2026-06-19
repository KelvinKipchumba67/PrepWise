import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, cookieOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get(cookieOptions.name || "token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 2. We use verifyToken to unlock the cookie and get the user ID
        const payload = await verifyToken(token);
        const userId = payload.sub as string;

        const body = await req.json();
        const { subject, topics, examDate, schedule } = body;

        const savedPlan = await prisma.studyPlan.create({
            data: {
                userId,
                subject,
                topics,
                examDate: new Date(examDate),
                schedule,
            }
        });

        return NextResponse.json({ success: true, plan: savedPlan });

    } catch (error) {
        console.error("\n FAILED TO SAVE PLAN TO DATABASE:\n", error, "\n");
        return NextResponse.json({ error: "Failed to save plan" }, { status: 500 });
    }
}