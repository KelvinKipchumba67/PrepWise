import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, cookieOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get(cookieOptions.name || "token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        let payload;
        try {
            payload = await verifyToken(token);
        } catch {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
        }
        const userId = payload.sub as string;
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json() as {
            subject?: unknown;
            topics?: unknown;
            examDate?: unknown;
            schedule?: unknown;
        };
        const { subject, topics, examDate, schedule } = body;

        if (typeof subject !== "string" || subject.trim().length === 0) {
            return NextResponse.json({ error: "Subject is required" }, { status: 400 });
        }

        if (typeof topics !== "string" || topics.trim().length === 0) {
            return NextResponse.json({ error: "Topics are required" }, { status: 400 });
        }

        if (typeof examDate !== "string") {
            return NextResponse.json({ error: "Exam date is required" }, { status: 400 });
        }

        const parsedExamDate = new Date(examDate);
        if (Number.isNaN(parsedExamDate.getTime())) {
            return NextResponse.json({ error: "Invalid exam date" }, { status: 400 });
        }

        if (schedule === undefined || schedule === null) {
            return NextResponse.json({ error: "Schedule is required" }, { status: 400 });
        }

        const savedPlan = await prisma.studyPlan.create({
            data: {
                userId,
                subject: subject.trim(),
                topics: topics.trim(),
                examDate: parsedExamDate,
                schedule,
            }
        });

        return NextResponse.json({ success: true, plan: savedPlan });

    } catch (error) {
        console.error("\n FAILED TO SAVE PLAN TO DATABASE:\n", error, "\n");
        const message = error instanceof Error ? error.message : "Failed to save plan";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}