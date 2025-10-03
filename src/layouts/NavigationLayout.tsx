import * as React from "react";
import { Outlet } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Icon } from "@iconify/react";
import AuthGuard from "@/utils/route-guard/AuthGuard";
import useRouter from "@/hooks/apps/useRouter";

const NavigationLayout: React.FC = () => {
  const router = useRouter();

  const tabValue = React.useMemo(() => {
    const p = router.pathname;
    if (p.startsWith("/transaction")) return "/transaction";
    if (p.startsWith("/report")) return "/report";
    if (p.startsWith("/setting")) return "/setting";
    return "/";
  }, [router.pathname]);

  return (
    <AuthGuard>
      <div className="flex flex-col h-[100dvh]">
        {/* Konten halaman */}
        <div className="flex-1 overflow-auto max-w-xl mx-auto w-full h-full overflow-y-auto">
          <Outlet />
          <Icon
            onClick={() => {
              router.setQuery({ sheet: "chat" });
            }}
            icon={"heroicons-outline:chat"}
            className="bg-primary text-white size-14 rounded-full p-2 absolute bottom-23 right-6 w-fit cursor-pointer"
          />
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation
          className="h-18 border-t-gray-500 max-w-xl mx-auto w-full"
          sx={{
            "& .MuiBottomNavigationAction-root": {
              color: "text.secondary",
              minWidth: "auto",
            },
            "& .Mui-selected": {
              color: "var(--color-primary)",
            },
            "& .MuiBottomNavigationAction-label": {
              fontSize: 11,
              transition: "all .2s",
            },
            "& .Mui-selected .MuiBottomNavigationAction-label": {
              fontSize: 12,
              fontWeight: 700,
            },
            "& .Mui-selected .iconify": {
              color: "var(--color-primary)",
            },
          }}
          value={tabValue}
          onChange={(_, v) => router.push(v)}
          showLabels
        >
          <BottomNavigationAction
            label="Home"
            value="/"
            icon={<Icon icon="mdi:home-outline" width="24" height="24" />}
          />
          <BottomNavigationAction
            label="Transaction"
            value="/transaction"
            icon={<Icon icon="mdi:swap-horizontal" width="24" height="24" />}
          />
          <BottomNavigationAction
            label="Report"
            value="/report"
            icon={<Icon icon="mdi:file-chart-outline" width="24" height="24" />}
          />
          <BottomNavigationAction
            label="Setting"
            value="/setting"
            icon={<Icon icon="tdesign:setting-1" width="24" height="24" />}
          />
        </BottomNavigation>
      </div>
    </AuthGuard>
  );
};

export default NavigationLayout;
