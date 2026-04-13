import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose"

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email, password } = await req.json()

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "Error" }, { status: 401 })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return NextResponse.json({ message: "Error" }, { status: 401 })
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new SignJWT({ userId: user._id, email: user.email, role: user.role })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("7d")
            .sign(secret);


        const res = NextResponse.json({
            message: "Success",
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        }, { status: 200 });

        
        res.cookies.set("token", token, {
            httpOnly: false,
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
            sameSite: "lax",
        });

        return res;
    }
    catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}
