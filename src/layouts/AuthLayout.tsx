import GuestGuard from "@/utils/route-guard/GuestGuard";
import * as React from "react";
import { Outlet } from "react-router-dom";
const AuthLayout: React.FC = () => {
  return (
    <GuestGuard>
      <div className="flex flex-col h-[100dvh]">
        {/* Konten halaman */}
        <div className="flex-1 overflow-auto max-w-xl mx-auto w-full h-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </GuestGuard>
  );
};

export default AuthLayout;
