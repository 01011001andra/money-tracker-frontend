import * as React from "react";
import {
  Box,
  Avatar,
  Typography,
  Card,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  Switch,
  Divider,
} from "@mui/material";
import { Icon } from "@iconify/react";

type RowButtonItem = {
  icon: string;
  label: string;
  onClick?: () => void;
  color?: "default" | "error";
};

type RowSwitchItem = {
  icon: string;
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
};

/* ---------- Small building blocks ---------- */

const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  const kids = React.Children.toArray(children);
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="body1" fontWeight={700}>
        {title}
      </Typography>
      <Card
        elevation={6}
        sx={{
          borderRadius: 3,
          boxShadow: "0 18px 40px rgba(0,0,0,.08)",
          overflow: "hidden",
        }}
      >
        <List sx={{ py: 0 }}>
          {kids.map((child, i) => (
            <React.Fragment key={i}>
              {child}
              {i < kids.length - 1 && (
                <Divider sx={{ borderColor: "divider" }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </Card>
    </div>
  );
};

const RowButton: React.FC<RowButtonItem> = ({
  icon,
  label,
  onClick,
  color = "default",
}) => (
  <ListItemButton
    onClick={onClick}
    sx={
      color === "error"
        ? {
            color: "error.main",
            "& .MuiListItemIcon-root": { color: "error.main" },
          }
        : undefined
    }
  >
    <ListItemIcon sx={{ minWidth: 36 }}>
      <Icon icon={icon} width={20} height={20} />
    </ListItemIcon>
    <ListItemText primary={label} />
    {color !== "error" && (
      <Icon icon="mdi:chevron-right" width={20} height={20} />
    )}
  </ListItemButton>
);

const RowSwitch: React.FC<RowSwitchItem> = ({
  icon,
  label,
  checked,
  onChange,
}) => (
  <ListItem
    disableGutters
    sx={{ px: 2 }}
    secondaryAction={
      <Switch
        edge="end"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="right-5"
      />
    }
  >
    <ListItemIcon sx={{ minWidth: 36 }}>
      <Icon icon={icon} width={20} height={20} />
    </ListItemIcon>
    <ListItemText primary={label} />
  </ListItem>
);

/* ---------- Page ---------- */

export default function Setting() {
  const [notifDaily, setNotifDaily] = React.useState(false);
  const [notifWeekly, setNotifWeekly] = React.useState(false);
  const [notifMonthly, setNotifMonthly] = React.useState(false);

  const accountItems: RowButtonItem[] = [
    {
      icon: "mdi:account-circle-outline",
      label: "Edit Profile",
      onClick: () => console.log("Edit Profile"),
    },
    {
      icon: "mdi:lock-outline",
      label: "Change Password",
      onClick: () => console.log("Change Password"),
    },
  ];

  return (
    <Box className="w-full" sx={{ p: 2 }}>
      {/* Header */}
      <h1 className="text-center font-bold text-xl text-primary-600">
        Setting
      </h1>

      {/* Avatar + nama */}
      <div className="flex flex-col gap-2 my-8 mx-auto items-center">
        <Avatar
          src="https://api.dicebear.com/9.x/dylan/svg?seed=Leah"
          sx={{ width: 72, height: 72 }}
        />
        <Typography variant="body1" fontWeight={700}>
          Yandra
        </Typography>
      </div>

      <div className="flex flex-col gap-4">
        {/* Account */}
        <SectionCard title="Akun">
          {accountItems.map((it, i) => (
            <RowButton key={i} {...it} />
          ))}
        </SectionCard>

        {/* Notifications */}
        <SectionCard title="Notifikasi">
          <RowSwitch
            icon="mdi:calendar-month-outline"
            label="Daily Summary Reports"
            checked={notifDaily}
            onChange={setNotifDaily}
          />
          <RowSwitch
            icon="mdi:calendar-month-outline"
            label="Weekly Summary Reports"
            checked={notifWeekly}
            onChange={setNotifWeekly}
          />
          <RowSwitch
            icon="mdi:calendar-month-outline"
            label="Monthly Summary Reports"
            checked={notifMonthly}
            onChange={setNotifMonthly}
          />
        </SectionCard>

        {/* Logout */}
        <SectionCard title="Logout">
          <RowButton
            icon="mdi:logout"
            label="Logout"
            color="error"
            onClick={() => console.log("Logout")}
          />
        </SectionCard>
      </div>
    </Box>
  );
}
