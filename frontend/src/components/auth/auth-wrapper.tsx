"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const publicPaths = ['/login'];

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (publicPaths.includes(pathname) && token) {
      router.push('/');
      return;
    }

    if (!publicPaths.includes(pathname) && !token) {
      router.push('/login');
      return;
    }
  }, [pathname, router]);

  return <>{children}</>;
} 