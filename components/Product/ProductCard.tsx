import React from "react";
import { Star, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import CustomImage from "@/components/images";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ProductProps {
  product: {
    _id: string;
    name: string;
    image: string;
    price: number;
    oldPrice?: number;
    stock: number;
    description: string;
  };
}

const ProductCard = ({ product }: ProductProps) => {
  const isAvailable = product.stock > 1;

  return (
    <Link href={`/products/${product._id}`}>
      <Card className="ring-0 shadow-none border-0 cursor-pointer w-full">
        <CardContent className="flex flex-col p-4">
          <Badge
            variant={isAvailable ? "default" : "destructive"}
            className={`w-fit mb-2 text-[11px] gap-1 ${isAvailable ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}`}
          >
            {isAvailable ? <CheckCircle2 size={11} /> : <AlertCircle size={11} />}
            {isAvailable ? "in stock" : "check availability"}
          </Badge>

          <div className="relative w-full h-30 mb-4 overflow-hidden">
            <CustomImage product={product} fill />
          </div>

          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-[#E9A426]">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} size={14} fill="#E9A426" />
              ))}
              <Star size={14} fill="#CACDD8" stroke="#CACDD8" />
            </div>
            <span className="ml-2 text-muted-foreground text-sm">Reviews (4)</span>
          </div>

          <h3 className="font-normal text-sm line-clamp-2 h-10 mb-2">{product.description}</h3>

          <div className="flex flex-col mt-2">
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.oldPrice}</span>
            )}
            <span className="text-lg font-semibold">${product.price}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
