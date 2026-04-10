import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NewCustomerCardProps {
    onCreateAccount: () => void;
}

export default function NewCustomerCard({ onCreateAccount }: NewCustomerCardProps) {
    return (
      <Card className="bg-[#eef2f7] ring-0 border-0 shadow-none rounded-xl">
        <CardContent className="p-8 flex flex-col gap-5">
          <div>
            <h2 className="text-lg font-semibold  text-black mb-1">
              New Customer?
            </h2>
            <p className="font-light text-sm leading-[143%] text-black">
              Creating an account has many benefits:
            </p>
          </div>
          <ul className="font-light text-sm leading-[143%] text-black space-y-1">
            <li>• Check out faster</li>
            <li>• Keep more than one address</li>
            <li>• Track orders and more</li>
          </ul>
          <Button
            className="rounded-[50px] px-8 w-fit mt-2 bg-[#0156ff] cursor-pointer"
            onClick={onCreateAccount}
          >
            Create An Account
          </Button>
        </CardContent>
      </Card>
    );
}
