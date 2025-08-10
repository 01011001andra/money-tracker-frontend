import * as React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Icon } from "@iconify/react";

const NavigationLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <div className="flex flex-col h-[100dvh]">
      {/* Konten halaman */}
      <div className="flex-1 overflow-auto max-w-xl mx-auto w-full h-full overflow-y-auto">
        <Outlet />
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
        value={value}
        onChange={handleChange}
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
          label="Profile"
          value="/profile"
          icon={
            <Icon icon="mdi:account-circle-outline" width="24" height="24" />
          }
        />
      </BottomNavigation>
    </div>
  );
};

export default NavigationLayout;
