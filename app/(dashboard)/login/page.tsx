"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import NewCustomerCard from "@/components/auth/NewCustomerCard";
import RegisterForm from "@/components/auth/RegisterForm";

export default function LoginPage() {
    const [showRegister, setShowRegister] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) router.push("/profile");
    }, []);

    return (
        <div className="container py-8">
            <div className="text-sm text-muted-foreground mb-6">
                <Link href="/" className="text-primary hover:underline">Home</Link>
                <span className="mx-1">›</span>
                <span>Login</span>
            </div>

            <h1 className="text-2xl font-bold mb-8">Customer Login</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {showRegister
                    ? <RegisterForm onBack={() => setShowRegister(false)} />
                    : <LoginForm />
                }
                <NewCustomerCard onCreateAccount={() => setShowRegister(true)} />
            </div>
        </div>
    );
}
