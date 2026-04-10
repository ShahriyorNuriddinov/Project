"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRegisterMutation } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";

interface RegisterFormProps {
  onBack: () => void;
}

type FormFields = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm({ onBack }: RegisterFormProps) {
  const { mutate, isPending } = useRegisterMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    mutate(data, {
      onSuccess: () => {
        setTimeout(() => router.push("/login"), 1500);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="bg-[#eef2f7] ring-0 border-0 shadow-none rounded-xl">
        <CardContent className="p-8 flex flex-col gap-5">
          <div>
            <h2 className="text-lg font-semibold  text-black mb-1">
              Create An Account
            </h2>
            <p className="font-light text-sm leading-[143%] text-black">
              Fill in the details below.
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-semibold text-black leading-[210%]">
              Name
            </Label>
            <Input
              {...register("name", { required: "Ismingizni kiriting" })}
              placeholder="Your Name"
              className="bg-white border-gray-200"
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-semibold text-black leading-[210%]">
              Email
            </Label>
            <Input
              {...register("email", {
                required: "Emailingizni kiriting",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email hato yozilgan",
                },
              })}
              type="email"
              placeholder="Your Email"
              className="bg-white border-gray-200"
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
              {...register("password", {
                required: "Parol kiriting",
                minLength: {
                  value: 8,
                  message: "Kamida 8 ta belgi bo'lishi kerak",
                },
              })}
              type="password"
              placeholder="Your Password"
              className="bg-white border-gray-200"
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
              {isPending ? "loggin in..." : "Loggin in"}
            </Button>
            <button
              type="button"
              onClick={onBack}
              className="text-sm text-primary hover:underline"
            >
              Back
            </button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
