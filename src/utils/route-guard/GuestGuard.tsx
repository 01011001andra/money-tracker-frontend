import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// project-imports
import type { GuardProps } from "@/types/auth";
import { useUserStore } from "@/stores/user";

// ==============================|| GUEST GUARD ||============================== //

export default function GuestGuard({ children }: GuardProps) {
  const { user } = useUserStore();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate(location?.state?.from ? location?.state?.from : "/", {
        state: { from: "" },
        replace: true,
      });
    }
  }, [user, navigate, location]);

  return children;
}
