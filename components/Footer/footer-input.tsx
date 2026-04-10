"use client";
import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FooterInput = () => {

  return (
    <div className="flex items-center justify-between gap-6 py-8">
      <div>
        <h2 className="text-white font-medium leading-[133%] text-4xl">
          Sign Up To Our Newsletter.
        </h2>
        <p className="text-white font-light text-base leading-[133%] opacity-70">
          Be the first to hear about the latest offers.
        </p>
      </div>

      <form className="flex items-center gap-3">
        <Input
          className="border-2 border-white/30 bg-transparent text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:border-white"
          placeholder="Your Email"
          type="email"
        />
        <Button type="submit" className="rounded-full px-6 bg-[#0156ff] hover:bg-blue-700">
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default memo(FooterInput);
