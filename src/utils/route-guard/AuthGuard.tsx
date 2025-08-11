import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// project-imports
import type { GuardProps } from "@/types/auth";
import { useAuthStore } from "@/stores/auth";

// ==============================|| AUTH GUARD ||============================== //

export default function AuthGuard({ children }: GuardProps) {
  const {
    auth: { isAuthenticated },
  } = useAuthStore();

  const navigate = useNavigate();
  const location = useLocation();
  const allowedPath = ["/"];

  useEffect(() => {
    if (!allowedPath.includes(location.pathname) && !isAuthenticated) {
      navigate("/login", {
        state: {
          from: location.pathname,
        },
        replace: true,
      });
    }
  }, [isAuthenticated, navigate, location]);

  return children;
}
