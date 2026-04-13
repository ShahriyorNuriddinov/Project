import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/product";
import { verifyToken } from "@/lib/auth";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ message: "Mahsulot topilmadi" }, { status: 404 });
        }
        return NextResponse.json(product, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Xatolik yuz berdi" }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const payload = await verifyToken(req);
    if (!payload || (payload.role !== "seller" && payload.role !== "admin")) {
        return NextResponse.json({ message: "error" }, { status: 403 });
    }
    try {
        await connectDB();
        const { id } = await params;
        const body = await req.json();
        const updated = await Product.findByIdAndUpdate(id, body, { new: true });
        return NextResponse.json(updated, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const payload = await verifyToken(req);
    if (!payload || (payload.role !== "seller" && payload.role !== "admin")) {
        return NextResponse.json({ message: "Ruxsat yo'q" }, { status: 403 });
    }
    try {
        await connectDB();
        const { id } = await params;
        await Product.findByIdAndDelete(id);
        return NextResponse.json({ message: "O'chirildi" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
