import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

export async function verifyToken(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) return null;

    const token = authHeader.split(" ")[1];
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        return payload as { userId: string; email: string; role: string };
    } catch {
        return null;
    }
}
