import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/user";
import { verifyToken } from "@/lib/auth";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const payload = await verifyToken(req);
    if (!payload || payload.role !== "admin") {
        return NextResponse.json({ message: "" }, { status: 403 });
    }

    await connectDB();
    const { id } = await params;
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "detele seller" }, { status: 200 });
}
