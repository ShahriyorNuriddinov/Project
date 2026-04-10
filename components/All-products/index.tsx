
import { Suspense } from "react";
import { SidebarFilter } from "./filter";
import ProductList from "./sidebar";

export default function ShopPage() {
  return (
    <main className="container py-10">
      <div className="flex flex-col grid-col-[40%_60%] md:flex-row gap-10">
        <aside className="shrink-0">
          <SidebarFilter />
        </aside>
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-6 border-b pb-4">All Products</h2>
          <ProductList />
        </div>
      </div>
    </main>
  );
}
