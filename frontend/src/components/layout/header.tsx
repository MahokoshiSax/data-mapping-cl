"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem('token');
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-slate-900">Data Mapping System</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleLogout}
              className="h-9 w-9 border-slate-200 hover:bg-slate-100"
            >
              <LogOut className="h-4 w-4 text-slate-700" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
} 