"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";

export function SidebarFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const Min = Number(searchParams.get("minPrice")) || 0;
  const Max = Number(searchParams.get("maxPrice")) || 1000;
  
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handlePriceChange = (values: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", values[0].toString());
    params.set("maxPrice", values[1].toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const categories = [
    "all",
    "Laptops",
    "Phones",
    "Ipads",
    "accessories",
  ];

  return (
    <div className="w-64 space-y-8 p-6 bg-[#fbfbfb] rounded-sm h-full">
      <div>
        <h3 className="font-bold text-lg mb-4">Categories</h3>
        <ul className="space-y-4">
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => updateFilter("category", cat)}
              className={`cursor-pointer capitalize text-sm hover:text-green-600 transition ${
                (searchParams.get("category") || "all") === cat
                  ? "text-green-600 font-bold"
                  : "text-gray-600"
              }`}
            >
              {cat.replace("-", " ")}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-4">Price Range</h3>
        <Slider
          defaultValue={[Min, Max]}
          max={1000}
          step={10}
          onValueCommit={handlePriceChange}
          className="my-6"
        />
        <div className="text-sm">
          Price:
          <span className="text-green-600 font-bold">
            ${Min} - ${Max}
          </span>
        </div>
      </div>
    </div>
  );
}
