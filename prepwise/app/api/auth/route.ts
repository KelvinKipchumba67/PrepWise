import {NextRequest, NextResponse} from "next/server";
import {hash, compare} from "bcryptjs";
import {prisma} from "@/lib/prisma";
import {signToken, cookieOptions} from "@/lib/auth";
import {randomUUID} from "crypto";

type AuthUserRow = {
    id: string;
    name: string | null;
    email: string;
    password: string;
};

export async function POST (req: NextRequest){
    try{
        const action = req.nextUrl.searchParams.get("action");
        if (action === "logout"){
            const res = NextResponse.redirect(new
            URL("/auth", req.url));
            res.cookies.set({...cookieOptions, maxAge:0, value:""});
            return res;
        }
        let body:{name?:string; email?:string;password?:string};
        try{
            body=await req.json();
        }
        catch{
            return NextResponse.json({error:"Invalid Json"}, {status:400});
        }
        const {name, email, password}=body;
        const normalizedEmail = email?.trim().toLowerCase();
        if(!normalizedEmail || !password){
            return NextResponse.json(
                {error:"Email and Password are required"},
                {status:400}
            );
        }
        //sign up
        if(action === "signup"){
            if(!name){
                return NextResponse.json({error:"Name is required"},
                    {status:400});
            }
            const existing = await prisma.$queryRaw<AuthUserRow[]>`
                SELECT id, name, email, password
                FROM "User"
                WHERE email = ${normalizedEmail}
                LIMIT 1
            `;
            if(existing.length > 0){
                return NextResponse.json({error:"Email already in use"},
                    {status: 409});
            }
            try{
                const hashed=await hash(password, 12);
                const [user] = await prisma.$queryRaw<AuthUserRow[]>`
                    INSERT INTO "User" (id, name, email, password)
                    VALUES (${randomUUID()}, ${name}, ${normalizedEmail}, ${hashed})
                    RETURNING id, name, email, password
                `;
                const token = await signToken({sub:user.id, name:user.name ?? undefined, email:user.email});
                const res =NextResponse.json({ok:true});
                res.cookies.set({...cookieOptions, value:token});
                return res;
            }
            catch(serverError){
                console.error("\nSIGNUP CRASHED REASON:\n", serverError, "\n")
                return NextResponse.json({ error: "Server crashed during signup." }, { status: 500 });
            }
        }
        //login
        if(action === "login"){
            const [user] = await prisma.$queryRaw<AuthUserRow[]>`
                SELECT id, name, email, password
                FROM "User"
                WHERE email = ${normalizedEmail}
                LIMIT 1
            `;
            if(!user){
                return NextResponse.json({error: "Invalid credentials"},
                    {status:401});
            }
            const valid = await compare (password, user.password);
            if(!valid){
                return NextResponse.json({error:"Invalid credentials"},
                    {status:401});
            }
            const token = await signToken ({sub:user.id, name:user.name ?? undefined, email:user.email});
            const res = NextResponse.json({ok:true});
            res.cookies.set({...cookieOptions, value:token});
            return res;
        }

        return NextResponse.json({error:"Unknown error"},
            {status:400});
    }
    catch(error){
        console.error("AUTH ROUTE FAILED:", error);
        return NextResponse.json({error:"Server Error"}, {status:500});
    }
}
