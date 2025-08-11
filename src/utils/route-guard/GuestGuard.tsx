import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// project-imports
import type { GuardProps } from "@/types/auth";
import { useAuthStore } from "@/stores/auth";

// ==============================|| GUEST GUARD ||============================== //

export default function GuestGuard({ children }: GuardProps) {
  const {
    auth: { isAuthenticated },
  } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(location?.state?.from ? location?.state?.from : "/", {
        state: { from: "" },
        replace: true,
      });
    }
  }, [isAuthenticated, navigate, location]);

  return children;
}
