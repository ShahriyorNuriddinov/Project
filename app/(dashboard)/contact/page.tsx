"use client";

import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <div className="container px-6 py-12">
      <h1 className="font-semibold text-3xl text-black">Contact Us</h1>
      <p className="font-light text-base leading-[188%] text-black">
        We love hearing from you, our Shop customers.
      </p>
      <p className="font-light text-base leading-[188%] text-black">
        Please contact us and we will make sure to get back to you as soon as we
        possibly can.
      </p>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Your Name <span className="text-red-500">*</span>
              </Label>
              <Input id="name" placeholder="Your Name" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Your Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Your Name"
                className="h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Your Phone Number
            </Label>
            <Input
              id="phone"
              placeholder="Your Phone"
              className="h-11 max-w-[48%]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              What&apos;s on your mind? <span className="text-red-500">*</span>
            </Label>
            <textarea
              id="message"
              placeholder="Jot us a note and we'll get back to you as quickly as possible"
              className="w-full min-h-[180px] rounded-md border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <Button className="cursor-pointer rounded-full px-10 h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
            Submit
          </Button>
        </div>

        <div className="w-full bg-[#f5f7ff]  lg:w-[300px] shrink-0 bg-slate-100 dark:bg-muted rounded-xl p-7 space-y-6 h-fit">
          <div className="flex gap-3 items-start">
            <MapPin size={20} className="mt-0.5 shrink-0 text-foreground" />
            <div>
              <p className="font-semibold text-lg mb-0.5 text-black">
                Address:
              </p>
              <p className="text-sm font-normal text-black">
                1234 Street Adress City Address, 1234
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <Phone size={20} className="mt-0.5 shrink-0 text-foreground" />
            <div>
              <p className="font-semibold text-lg mb-0.5 text-black">Phone:</p>
              <p className="text-sm font-normal text-black">(00)1234 5678</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <Clock size={20} className="mt-0.5 shrink-0 text-foreground" />
            <div>
              <p className="font-semibold text-lg mb-0.5 text-black">
                We are open:
              </p>
              <p className="text-sm font-normal text-black">
                Monday - Thursday: 9:00 AM – 5:30 PM
              </p>
              <p className="text-sm font-normal text-black">
                Friday 9:00 AM – 6:00 PM
              </p>
              <p className="text-sm font-normal text-black">
                Saturday: 11:00 AM – 5:00 PM
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <Mail size={20} className="mt-0.5 shrink-0 text-foreground" />
            <div>
              <p className="font-bold text-sm mb-0.5">E-mail:</p>
              <a
                href="mailto:shop@email.com"
                className="text-sm text-blue-500 hover:underline"
              >
                shop@email.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
