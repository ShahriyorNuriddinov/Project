"use client";
import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import NewCustomerCard from "@/components/auth/NewCustomerCard";
import RegisterForm from "@/components/auth/RegisterForm";
import { ToastContainer } from "react-toastify";

export default function LoginPage() {
    const [showRegister, setShowRegister] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-3xl">
                <h1 className="text-2xl font-bold mb-8 text-center">
                    {showRegister ? "Create Account" : "Customer Login"}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {showRegister
                        ? <RegisterForm onBack={() => setShowRegister(false)} />
                        : <LoginForm />
                    }
                    <NewCustomerCard onCreateAccount={() => setShowRegister(true)} />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
