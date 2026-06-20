import { createHmac, timingSafeEqual } from "crypto";

export const cookieOptions = {
	name: "token",
	httpOnly: true,
	sameSite: "lax" as const,
	path: "/",
	secure: process.env.NODE_ENV === "production",
};

type TokenPayload = {
	sub: string;
	name?: string;
	email?: string;
	exp?: number;
};

const secret = process.env.AUTH_SECRET || process.env.JWT_SECRET || process.env.JWT_TOKEN || "prepwise-secret";

function base64UrlEncode(value: string) {
	return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value: string) {
	return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string) {
	return createHmac("sha256", secret).update(value).digest("base64url");
}

export async function signToken(payload: TokenPayload) {
	const body = {
		...payload,
		exp: payload.exp ?? Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
	};
	const encoded = base64UrlEncode(JSON.stringify(body));
	return `${encoded}.${sign(encoded)}`;
}

export async function verifyToken(token: string): Promise<TokenPayload> {
	const [encoded, signature] = token.split(".");

	if (!encoded || !signature) {
		throw new Error("Invalid token");
	}

	const expectedSignature = sign(encoded);
	const actualBuffer = Buffer.from(signature);
	const expectedBuffer = Buffer.from(expectedSignature);

	if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) {
		throw new Error("Invalid token");
	}

	const payload = JSON.parse(base64UrlDecode(encoded)) as TokenPayload;

	if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
		throw new Error("Token expired");
	}

	return payload;
}
