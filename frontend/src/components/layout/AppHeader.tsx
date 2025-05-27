"use client";

// import Image from 'next/image'; // Remove Image import
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react"; // Import signOut
import { LogOut } from "lucide-react"; // Import LogOut icon
import { Button } from "@/components/ui/button"; // Import Button component
import { useRouter } from "next/navigation"; // Import useRouter

export function AppHeader() {
  const { data: session, status } = useSession(); // Get session data
  const router = useRouter(); // Initialize useRouter

  // Use session data for user name and image, with fallbacks
  const userName = session?.user?.name || "User"; // Default name if session data is not available
  const userImage = session?.user?.image || ""; // Default empty image if session data is not available

  const firstChar = userName ? userName.charAt(0).toUpperCase() : "U"; // Default to 'U' if name is empty

  const handleLogout = async () => {
    localStorage.removeItem('token');
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <header className="bg-white border-b">
      <div className="container mx-2 px-4 sm:px-6 lg:px-8 max-w-[100%]">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Replace with actual logo if available */}
            {/* <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center mr-2"></div> */}
            <span className="text-xl font-semibold text-gray-800">Data Mapping Web</span>
          </div>

          <div className="flex justify-end items-center gap-4">
            {status !== "loading" && (
              <Avatar>
                <AvatarImage src={userImage} alt={userName} />
                <AvatarFallback>{firstChar}</AvatarFallback>
              </Avatar>
            )}

            {/* Logout Button */}
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