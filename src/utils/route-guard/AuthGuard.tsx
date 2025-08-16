import { useEffect } from "react";

// project-imports
import type { GuardProps } from "@/types/auth";
import { useUserStore } from "@/stores/user";
import useRouter from "@/hooks/apps/useRouter";

// ==============================|| AUTH GUARD ||============================== //

export default function AuthGuard({ children }: GuardProps) {
  const router = useRouter();
  const { user, token } = useUserStore();

  useEffect(() => {
    if (!user && !token) {
      router.replace("/login", {
        state: { from: location.pathname },
      });
    }
  }, [user, router]);

  return children;
}
