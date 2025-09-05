"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface ProtectedProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedProps) => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.replace("/login"); // redirect if no token
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
