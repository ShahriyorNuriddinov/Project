"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const links = [
    { label: "Product Support" },
    { label: "FAQ" },
    { label: "Our Buyer Guide" },
];

const Support = () => {
    return (
        <div className="w-full my-16">
            <div className="container-xl flex flex-col md:flex-row items-center min-h-[280px]">
                <div className="flex-1 flex flex-col gap-4 py-12 px-4">
                    {links.map((link) => (
                        <Button
                            key={link.label}
                            variant="outline"
                            className="w-72 justify-between text-sm font-medium hover:border-blue-400 hover:text-blue-500"
                        >
                            {link.label}
                            <ArrowRight size={16} className="text-[#01a4ff]" />
                        </Button>
                    ))}
                </div>

                <div className="flex-1 flex justify-end items-end overflow-hidden h-full">
                    <img
                        src="/support.png"
                        alt="Support"
                        className="max-h-[280px] object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default Support;
