"use client";
import { memo, useEffect, useState } from "react";
import CartProducts from "./cartProducts";
import CardPrice from "./cardPrice";
import { ProductType } from "@/types/product";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const [total, setTotal] = useState<number>(0);

  const [products, setProducts] = useState<ProductType[]>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });
  const removeProduct = (id: number) => {
    const updateProducts = products.filter((product) => product.id !== id);
    localStorage.setItem("cart", JSON.stringify(updateProducts));
    setProducts(updateProducts);
  };

  const handleIncrement = (id: number) => {
    const updateProducts = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    });
    localStorage.setItem("cart", JSON.stringify(updateProducts));
    setProducts(updateProducts);
  };

  const handleDecrement = (id: number) => {
    const existingProduct = products.find((product) => product.id === id);
    if (existingProduct && existingProduct.quantity === 1) {
      removeProduct(id);
      return;
    }

    const updateProducts = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: product.quantity - 1,
        };
      }
      return product;
    });
    localStorage.setItem("cart", JSON.stringify(updateProducts));
    setProducts(updateProducts);
  };

  useEffect(() => {
    const Total = products.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotal(Total);
  }, [products]);

  return (
    <div className="container">
      <section className="py-8">
        <div className="text-sm text-muted-foreground mb-4">
          Home <span className="mx-1 text-foreground font-bold">›</span>
          Shopping Cart
        </div>
        <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
        <Separator className="mb-6" />
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <CartProducts
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            products={products}
            removeProduct={removeProduct}
          />
          <CardPrice total={total} cartItems={products} onCheckoutSuccess={() => {
            localStorage.removeItem("cart");
            setProducts([]);
          }} />
        </div>
      </section>
    </div>
  );
};

export default memo(Cart);
