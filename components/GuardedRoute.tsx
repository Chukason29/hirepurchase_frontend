"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const authRoutes = ["/login", "/register"]; // Routes accessible without login

export default function GuardedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated && !authRoutes.includes(pathname)) {
      router.replace("/login");
    }
  }, [isAuthenticated, pathname, router]);

  return <>{children}</>;
}
