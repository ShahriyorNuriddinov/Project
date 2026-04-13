import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/product";

// cart items: [{ _id, quantity }]
export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { items } = await req.json();

        for (const item of items) {
            const product = await Product.findById(item._id);
            if (!product) continue;
            const newStock = Math.max(0, product.stock - item.quantity);
            await Product.findByIdAndUpdate(item._id, { stock: newStock });
        }

        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
