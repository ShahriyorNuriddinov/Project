"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProducts } from "@/services/product.price";
import ProductCard from "../Product/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const params = {
        category: searchParams.get("category") || undefined,
        minPrice: searchParams.get("minPrice")
          ? Number(searchParams.get("minPrice"))
          : undefined,
        maxPrice: searchParams.get("maxPrice")
          ? Number(searchParams.get("maxPrice"))
          : undefined,
      };
      const data = await getProducts(params);
      setProducts(data);
      setLoading(false);
    };
    fetchData();
  }, [searchParams]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {loading ? (
        Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3 p-4">
            <Skeleton className="w-16 h-5 rounded-full" />
            <Skeleton className="w-full h-40 rounded-md" />
            <Skeleton className="w-24 h-3" />
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-3/4 h-3" />
            <Skeleton className="w-16 h-5 mt-1" />
          </div>
        ))
      ) : products.length > 0 ? (
        products.map((item: any) => (
          <ProductCard key={item._id} product={item} />
        ))
      ) : (
        <p className="col-span-4 text-center py-20 text-gray-400 font-medium"></p>
                
      )}
    </div>
  );
}
