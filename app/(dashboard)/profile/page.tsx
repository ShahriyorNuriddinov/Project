"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, User, Mail, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string;
  } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; path=/; max-age=0";
    window.location.href = "/login";
  };

  return (
    <div className="container py-12 max-w-md">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <Card className="shadow-sm">
        <CardContent className="p-6 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground">
              {user?.name?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div>
              <p className="font-semibold text-lg">{user?.name ?? "—"}</p>
            </div>
          </div>

          <div className="border-t pt-4 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm">
              <User size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">Name:</span>
              <span className="font-medium">{user?.name ?? "—"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{user?.email ?? "—"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <ShieldCheck size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">Role:</span>
              <span className="font-medium capitalize">
                {user?.role ?? "—"}
              </span>
            </div>
          </div>

          {(user?.role === "admin" || user?.role === "seller") && (
            <div className="border-t pt-4 flex gap-3">
              {user.role === "admin" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/admin")}
                >
                  Admin Panel
                </Button>
              )}
              {(user.role === "seller" || user.role === "admin") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/seller")}
                >
                  Seller Panel
                </Button>
              )}
            </div>
          )}
          <div className="">
            <h2>admin panel</h2>
          </div>
          <div className="border-t pt-4 w-25">
            <Button
              variant="destructive"
              className="gap-2 w-full"
              onClick={handleLogout}
            >
              <LogOut size={16} /> Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
