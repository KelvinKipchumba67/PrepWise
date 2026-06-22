import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import {signToken} from "@/lib/auth";
import { cookies } from "next/headers";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {
                    let dbUser = await prisma.user.findUnique({
                        where: { email: user.email! },
                    });

                    if (!dbUser) {
                        dbUser = await prisma.user.create({
                            data: {
                                email: user.email!,
                                name: user.name!,
                                password: "", // no password for Google users
                            },
                        });
                    }

                    // Create your JWT token
                    const token = await signToken({ sub: dbUser.id });

                    // Set your cookie
                    const cookieStore = await cookies();
                    cookieStore.set("token", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 60 * 60 * 24 * 7,
                        path: "/",
                    });

                    return true;
                } catch (error) {
                    console.error("Google sign in error:", error);
                    return false;
                }
            }
            return true;
        },
    },
    pages: {
        signIn: "/auth",
    },
});

export { handler as GET, handler as POST };