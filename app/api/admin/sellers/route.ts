import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const payload = await verifyToken(req);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ message: "dont" }, { status: 403 });
  }

  await connectDB();
  const sellers = await User.find({ role: "seller" }).select("-password");
  return NextResponse.json(sellers, { status: 200 });
}

export async function POST(req: NextRequest) {
  const payload = await verifyToken(req);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ message: "error" }, { status: 403 });
  }

  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "full pasword input" },
        { status: 400 },
      );
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json({ message: "bu email mavjud" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const seller = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "seller",
    });

    return NextResponse.json(
      {
        message: "Add seller",
        seller: { id: seller._id, name: seller.name, email: seller.email },
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
