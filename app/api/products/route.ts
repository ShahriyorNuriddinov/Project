import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/product";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const minPrice = searchParams.get("range_min");
    const maxPrice = searchParams.get("range_max");
    const search = searchParams.get("search");

    let query: any = {};

    if (category && category !== "all") {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(query);

    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    console.error("GET error", error.message);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  // Faqat seller yoki admin product qo'sha oladi
  const payload = await verifyToken(req);
  if (!payload || (payload.role !== "seller" && payload.role !== "admin")) {
    return NextResponse.json({ message: "Ruxsat yo'q" }, { status: 403 });
  }

  try {
    await connectDB();
    const body = await req.json();
    const newProduct = await Product.create({ ...body, sellerId: payload.userId });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    console.error("POST error", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
