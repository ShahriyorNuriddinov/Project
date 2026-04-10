"use client";

import { memo, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { SlBasket } from "react-icons/sl";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MainHeader = () => {
  const pathname = usePathname();
  const activeCategory = pathname.startsWith("/category/") ? pathname.split("/")[2] : null;
  const [profileLink, setProfileLink] = useState("/login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setProfileLink(token ? "/profile" : "/login");
  }, [pathname]);

  const items = [
    { name: "Laptops", slug: "laptops" },
    { name: "Desktop PCs", slug: "desktop-pcs" },
    { name: "Networking Devices", slug: "networking" },
    { name: "Printers & Scanners", slug: "printers" },
    { name: "PC Parts", slug: "pc-parts" },
    { name: "All Other Products", slug: "others" },
    { name: "Repairs", slug: "repairs" },
  ];

  return (
    <header className="bg-background sticky top-0 z-40 border-b shadow-sm">
      <nav className="container p-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/">
            <Image src="/1.png" alt="TechFix Logo" width={50} height={50} priority className="object-contain" />
          </Link>
          <ul className="hidden xl:flex items-center gap-6">
            {items.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/category/${item.slug}`}
                  className={`text-sm font-bold transition-all ${activeCategory === item.slug
                    ? "text-primary underline decoration-2"
                    : "text-foreground hover:text-primary"
                    }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Button variant="outline" className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold text-sm px-5">
                Our Deals
              </Button>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hover:text-primary">
            <CiSearch size={22} strokeWidth={1} />
          </Button>
          <Link href="/shoping-cart" className="relative">
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <SlBasket size={22} />
            </Button>
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] rounded-full">
              1
            </Badge>
          </Link>
          <Link href={profileLink}>
            <div className="w-8 h-8 rounded-full border bg-muted flex items-center justify-center ml-1">
              <span className="text-xs font-bold text-muted-foreground">U</span>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default memo(MainHeader);
