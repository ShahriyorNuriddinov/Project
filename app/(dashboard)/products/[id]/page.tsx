"use client";
import { useGetProductById } from "@/hooks/useProducts";
import { useParams } from "next/navigation";
import { Heart, Share2, Mail, ChevronUp, ChevronDown } from "lucide-react";
import CustomImage from "@/components/images";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductType } from "@/types/product";
import { toast } from "react-toastify";
import { useState } from "react";
import Link from "next/link";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useGetProductById(id);
  const [qty, setQty] = useState(1);

  const handleclick = () => {
    const products: ProductType[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const productId = (product as any)?._id || product?.id;
    const existingProduct = products.find(
      (c) => String((c as any)._id || c.id) === String(productId)
    );
    if (existingProduct) {
      const updateData = products.map((c) => {
        if (String((c as any)._id || c.id) === String(productId)) {
          return { ...c, quantity: c.quantity + qty };
        }
        return c;
      });
      localStorage.setItem("cart", JSON.stringify(updateData));
    } else {
      localStorage.setItem("cart", JSON.stringify([...products, { ...product, quantity: qty }]));
    }
    toast.success("Adding");
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="border-b px-6 py-3 flex items-center justify-between">
          <div className="flex gap-6">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-14" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-9 w-28 rounded-full" />
            <Skeleton className="h-9 w-24 rounded-full" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 bg-muted p-10 flex flex-col gap-4 min-h-[500px]">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-8 w-32" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="border-b px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 bg-background">
        <nav className="flex items-center gap-6 text-sm font-medium">
          <button className="text-foreground border-b-2 border-foreground pb-1">About Product</button>
          <button className="text-muted-foreground hover:text-foreground transition pb-1">Details</button>
          <button className="text-muted-foreground hover:text-foreground transition pb-1">Specs</button>
        </nav>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm text-muted-foreground">
            On Sale from
            <span className="text-foreground font-bold text-base">${product.price.toFixed(2)}</span>
          </span>

          <Button onClick={handleclick} className="rounded-full px-6" size="sm">
            Add to Cart
          </Button>

          <Button
            className="rounded-full px-6 bg-[#FFC439] hover:bg-yellow-400 text-[#003087] font-bold italic"
            size="sm"
            variant="outline"
          >
            <span className="text-[#003087]">Pay</span>
            <span className="text-[#009cde]">Pal</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-muted px-10 py-10 flex flex-col gap-4 min-h-[500px]">
          <div className="text-xs text-muted-foreground flex items-center gap-1 flex-wrap">
            <Link href="/" className="hover:underline">Home</Link>
            <span>›</span>
            <span>{product.category || "Products"}</span>
            <span>›</span>
            <span className="text-primary truncate max-w-[200px]">{product.name}</span>
          </div>

          <h1 className="text-3xl font-bold leading-tight">{product.name}</h1>

          {product.description && (
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">{product.description}</p>
          )}

          <div className="flex items-center gap-2 mt-1">
            <div className="w-7 h-7 rounded-full bg-foreground ring-2 ring-offset-1 ring-primary cursor-pointer" />
            <div className="w-7 h-7 rounded-full bg-[#e8d5b7] border cursor-pointer" />
            <div className="w-7 h-7 rounded-full bg-[#d4cfc9] border cursor-pointer" />
          </div>

          <Badge
            variant={product.stock > 0 ? "default" : "destructive"}
            className={`w-fit ${product.stock > 0 ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </Badge>

          <div className="flex items-center justify-between mt-auto pt-4 text-xs text-muted-foreground">
            <span>
              Have a Question?
              <a href="#" className="text-primary hover:underline">Contact Us</a>
            </span>
            {(product as any)?._id && (
              <span>SKU {String((product as any)._id).slice(-6).toUpperCase()}</span>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-background flex flex-col items-center justify-center relative px-10 py-10 gap-6 min-h-[500px]">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            <Button variant="outline" size="icon" className="rounded-full h-8 w-8 hover:text-red-500 hover:border-red-300">
              <Heart size={15} />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-8 w-8 hover:text-primary hover:border-primary">
              <Share2 size={15} />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
              <Mail size={15} />
            </Button>
          </div>
          <div className="relative w-72 h-72">
            <CustomImage product={product} fill />
          </div>
        </div>
      </div>

      <Separator />
      <div className="px-10 py-4">
        <Button variant="ghost" className="text-sm font-bold hover:text-primary p-0">
          + MORE INFORMATION
        </Button>
      </div>
    </div>
  );
}
