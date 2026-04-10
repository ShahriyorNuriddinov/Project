import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/product";

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
        console.error("xato", error.message);
        return NextResponse.json({ message: "Xatolik yuz berdi" }, { status: 500 });
    }
}
