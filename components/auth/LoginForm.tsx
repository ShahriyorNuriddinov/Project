"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "@/hooks/useProducts";

type LoginFormFields = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { mutate, isPending } = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>();

  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
    mutate(data, {
      onSuccess: (res: any) => {
        const role = res.user?.role;
        if (role === "admin") window.location.href = "/admin";
        else if (role === "seller") window.location.href = "/seller";
        else window.location.href = "/";
      },
      onError: () => {
      },
    });
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="bg-[#eef2f7] ring-0 border-0 shadow-none rounded-xl">
        <CardContent className="p-8 flex flex-col gap-5">
          <div>
            <h2 className="text-lg mb-1 font-semibold  text-black">
              Registered Customers
            </h2>
            <p className="text-sm leading-[214%] text-black font-light ">
              If you have an account, sign in with your email address.
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-semibold text-black leading-[210%]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Your Email"
              className={`text-bl ${errors.email ? "border-red-500" : ""}`}
              {...register("email", {
                required: "write your email",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "error",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-semibold text-black leading-[210%]">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Your Password"
              className={`bg-white border-gray-200 ${errors.password ? "border-red-500" : ""}`}
              {...register("password", {
                required: "Parolni kiriting",
                minLength: {
                  value: 6,
                  message: "Parol 6 ta sondan iborat bo'lsin",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 mt-2">
            <Button
              type="submit"
              className="font-semibold text-sm text-center text-white bg-blue-500"
              disabled={isPending}
            >
              {isPending ? "Signing In..." : "Sign In"}
            </Button>
            <Link
              href="#"
              className="text-sm font-normal leading-[143%] text-[#0156ff]"
            >
              Forgot Your Password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
