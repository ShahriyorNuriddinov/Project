"use client";
import React, { memo } from "react";
import Link from "next/link";
import { FaSquareFacebook, FaSquareInstagram } from "react-icons/fa6";
import { ModeToggle } from "../../components/Togle";


const TopBar = () => {
  return (
    <header className="bg-[#020202]">
      <div className="container py-2 flex items-center justify-between gap-2">
        <div className="flex items-center">
          <p className="font-semibold text-[13px] text-[#a2a6b0]">
            Mon-Thu: <span className="text-white">9:00 AM - 5:30 PM</span>
          </p>
        </div>
        <div className="hidden lg:block">
          <p className="font-semibold text-[13px] text-[#acacac]">
            Visit our showroom in 1234 Street Address City Address, 1234.
            <Link
              href="/contact"
              className="text-white underline underline-offset-4 ml-1"
            >
              Contact Us
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="tel:(00) 1234 5678"
            className="font-semibold text-[13px] text-white"
          >
            Call Us: <span className="text-[#acacac]">(00) 1234 5678</span>
          </a>
          <div className="flex items-center gap-3 ml-2">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-500 transition-colors text-lg"
            >
              <FaSquareFacebook />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-500 transition-colors text-lg"
            >
              <FaSquareInstagram />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(TopBar);
