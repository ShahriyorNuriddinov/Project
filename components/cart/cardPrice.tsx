"use client";
import { memo, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { CheckCircle2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

interface Props {
  total: number;
  cartItems: { _id?: string; id?: number; quantity: number }[];
  onCheckoutSuccess: () => void;
}

const CardPrice = ({ total, cartItems, onCheckoutSuccess }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const shipping = 21.0;
  const tax = 1.91;
  const gst = 1.91;
  const orderTotal = total + shipping + tax + gst;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const items = cartItems.map((i) => ({ _id: (i as any)._id || i.id, quantity: i.quantity }));
      await axios.post("/api/checkout", { items });
      setOpen(true);
      onCheckoutSuccess();
    } catch {
      toast.error("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-[340px] shrink-0">
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />

          <Accordion type="multiple" className="w-full">
            <AccordionItem value="shipping" className="border-none">
              <AccordionTrigger className="text-sm font-semibold py-0 hover:no-underline">
                Estimate Shipping and Tax
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-0">
                <p className="text-xs text-muted-foreground mb-3">
                  Enter your destination to get a shipping estimate.
                </p>
                <div className="space-y-2">
                  <Input placeholder="Country" />
                  <Input placeholder="State / Province" />
                  <Input placeholder="Zip / Postal Code" />
                  <Button size="sm" className="w-full">Estimate</Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <Separator className="my-2" />

            <AccordionItem value="discount" className="border-none">
              <AccordionTrigger className="text-sm font-semibold py-0 hover:no-underline">
                Apply Discount Code
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-0">
                <div className="flex gap-2">
                  <Input placeholder="Enter discount code" />
                  <Button size="sm">Apply</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Separator />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-semibold">Subtotal</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <div>
                <p>Shipping</p>
                <p className="text-[11px] leading-tight max-w-[160px] opacity-70">
                  (Standard Rate - Price may vary depending on the item/destination.)
                </p>
              </div>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>GST (10%)</span>
              <span>${gst.toFixed(2)}</span>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between text-base font-bold">
            <span>Order Total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>

          <Button className="w-full rounded-full" size="lg" onClick={handleCheckout} disabled={loading || cartItems.length === 0}>
            {loading ? "Processing..." : "Proceed to Checkout"}
          </Button>

          <Button
            className="w-full rounded-full bg-[#FFC439] hover:bg-yellow-400 text-[#003087] font-bold italic"
            size="lg"
            variant="outline"
          >
            Check out with
            <span className="ml-1">
              <span className="text-[#003087]">Pay</span>
              <span className="text-[#009cde]">Pal</span>
            </span>
          </Button>

          <Button variant="outline" className="w-full rounded-full" size="lg">
            Check Out with Multiple Addresses
          </Button>
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm text-center">
          <DialogHeader>
            <DialogTitle className="text-center">Order
              seccucfully
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <CheckCircle2 size={64} className="text-green-500" />
            <p className="text-muted-foreground text-sm">
            Seccesfull
            </p>
            <p className="font-bold text-lg">Total: ${orderTotal.toFixed(2)}</p>
            <Button className="w-full rounded-full" onClick={() => { setOpen(false); window.location.href = "/"; }}>
              Home
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default memo(CardPrice);
