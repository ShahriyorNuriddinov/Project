
import { Suspense } from "react";
import { SidebarFilter } from "./filter";
import ProductList from "./sidebar";

export default function ShopPage() {
  return (
    <main className="container py-10">
      <div className="flex flex-col grid-col-[40%_60%] md:flex-row gap-10">
        <aside className="shrink-0">
          <Suspense fallback={<div className="w-64 h-96 bg-muted rounded-sm animate-pulse" />}>
            <SidebarFilter />
          </Suspense>
        </aside>
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-6 border-b pb-4">All Products</h2>
          <Suspense fallback={<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-60 bg-muted rounded-md animate-pulse" />)}</div>}>
            <ProductList />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
