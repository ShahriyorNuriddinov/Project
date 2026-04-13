"use client";
import { ProductType } from "@/types/product";
import { memo } from "react";
import CustomImage from "../images";
import { X, Pencil, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface Props {
  products: ProductType[];
  removeProduct: (id: number) => void;
  handleIncrement: (id: number) => void;
  handleDecrement: (id: number) => void;
}

const CartProducts = ({ products, removeProduct, handleIncrement, handleDecrement }: Props) => {
  return (
    <div className="flex-1 min-w-0">
      <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b">
        <span>Item</span>
        <span>Price</span>
        <span>Qty</span>
        <span />
      </div>
      {products.map((product, index) => (
        <div key={(product as any)._id || product.id}>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center py-5">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 shrink-0 bg-muted rounded-lg border overflow-hidden">
                <CustomImage product={product} fill />
              </div>
              <p className="text-sm text-foreground leading-snug line-clamp-4">
                {product.description}
              </p>
            </div>
            <div className="text-sm font-semibold">
              <span className="md:hidden text-muted-foreground mr-1">Price:</span>
              ${product.price.toFixed(2)}
            </div>
            <div className="flex items-center gap-1">
              <span className="md:hidden text-sm text-muted-foreground mr-1">Qty:</span>
              <div className="flex items-center border rounded-md overflow-hidden w-fit">
                <input
                  type="text"
                  className="w-9 text-center text-sm font-medium bg-background border-0 outline-none py-1"
                  value={product.quantity}
                  onChange={() => { }}
                  readOnly
                />
                <div className="flex flex-col border-l">
                  <button
                    type="button"
                    onClick={() => handleIncrement(product.id)}
                    className="px-1 py-0.5 hover:bg-muted transition"
                  >
                    <ChevronUp size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDecrement(product.id)}
                    className="px-1 py-0.5 hover:bg-muted transition border-t"
                  >
                    <ChevronDown size={12} />
                  </button>
                </div>
              </div>
            </div>
            <div className="text-sm font-semibold">
              <span className="md:hidden text-muted-foreground mr-1">Subtotal:</span>
              ${(product.price * product.quantity).toFixed(2)}
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={() => removeProduct(product.id)}
                aria-label="Remove"
              >
                <X size={15} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-primary"
                aria-label="Edit"
              >
                <Pencil size={13} />
              </Button>
            </div>
          </div>
          {index < products.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
};

export default memo(CartProducts);
