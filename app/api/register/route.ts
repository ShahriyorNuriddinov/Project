import connectDB from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { name, email, password } = await req.json();
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Error" },
                { status: 400 }
            );
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return NextResponse.json(
                { message: "Error" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new SignJWT({ userId: user._id, email: user.email })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("7d")
            .sign(secret);

        return NextResponse.json(
            { message: "Succeess", token, user: { id: user._id, name: user.name, email: user.email } },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Error", error.message);
        return NextResponse.json(
            { message: "Error" },
            { status: 500 }
        );
    }
}