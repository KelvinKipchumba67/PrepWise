import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    const { name, school, email, phone, message } = await req.json();

    try {
        await resend.emails.send({
            from: "PrepWise Support <onboarding@resend.dev>",
            to: "devkelvin95@gmail.com",
            subject: `New message from ${name}`,
            html: `
                <h2>New Support Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>School:</strong> ${school}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong> ${message}</p>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}