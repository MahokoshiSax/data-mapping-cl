import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers";
import { Toaster } from "sonner";
import { AuthWrapper } from "@/components/auth/auth-wrapper";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthWrapper>
          <NextAuthProvider>
            {children}
          </NextAuthProvider>
        </AuthWrapper>
        <Toaster />
      </body>
    </html>
  );
} 