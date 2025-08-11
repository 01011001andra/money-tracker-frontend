import { useMemo, useState } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

type NotifType = "success" | "warning" | "info";

interface Notif {
  id: number;
  text: string;
  time: string;
  type: NotifType;
  read?: boolean;
}

const iconStyleByType: Record<
  NotifType,
  { bg: string; text: string; icon: string }
> = {
  success: {
    bg: "bg-green-100",
    text: "text-green-600",
    icon: "solar:check-circle-bold",
  },
  warning: {
    bg: "bg-amber-100",
    text: "text-amber-600",
    icon: "solar:warning-circle-bold",
  },
  info: { bg: "bg-blue-100", text: "text-blue-600", icon: "solar:bell-bold" },
};

const Headers = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notif[]>([
    {
      id: 1,
      text: "Transaksi baru berhasil ditambahkan",
      time: "Baru saja",
      type: "success",
      read: false,
    },
    {
      id: 3,
      text: "Laporan keuangan mingguan tersedia",
      time: "Kemarin",
      type: "info",
      read: true,
    },
  ]);
  const goSetting = () => navigate("/setting");
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markOneRead = (id: number) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  return (
    <div className="flex justify-between items-center">
      {/* Avatar + Greeting */}
      <div className="flex gap-4 items-center ">
        <Avatar
          onClick={goSetting}
          alt="Static Avatar"
          src="https://api.dicebear.com/9.x/dylan/svg?seed=Leah"
          sx={{ width: 40, height: 40, cursor: "pointer" }}
        />
        <div className="flex flex-col">
          <span className="font-bold text-sm">Hello, Yandra!</span>
          <span className="text-xs text-gray-400">
            Lacak uang anda dengan mudah
          </span>
        </div>
      </div>

      {/* Icon Notifikasi + Badge (Iconify) */}
      <Badge
        color="error"
        badgeContent={unreadCount}
        invisible={unreadCount === 0}
        overlap="circular"
      >
        <IconButton
          onClick={handleClick}
          aria-controls={open ? "notif-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          className="bg-white drop-shadow-2xl"
        >
          <Icon
            icon={"material-symbols:notifications-outline"}
            width={24}
            height={24}
            className="text-black"
          />
        </IconButton>
      </Badge>

      {/* Menu Notifikasi */}
      <Menu
        id="notif-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 320,
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 6,
          },
        }}
      >
        {/* Header */}
        <Box className="flex items-center justify-between px-3 pb-2">
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Notifikasi
          </Typography>
          <div className="flex gap-2">
            <Button
              size="small"
              onClick={markAllRead}
              disabled={unreadCount === 0}
            >
              Tandai terbaca
            </Button>
          </div>
        </Box>
        <Divider />

        {/* List */}
        {notifications.length > 0 ? (
          <List
            sx={{
              maxHeight: 360,
              overflowY: "auto",
              py: 0,
            }}
          >
            {notifications.map((n) => {
              const style = iconStyleByType[n.type];
              return (
                <ListItemButton
                  key={n.id}
                  onClick={() => {
                    markOneRead(n.id);
                    handleClose();
                  }}
                  sx={{
                    gap: 1,
                    ...(n.read ? {} : { backgroundColor: "action.hover" }),
                  }}
                >
                  <ListItemAvatar>
                    <span
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${style.bg} ${style.text}`}
                    >
                      <Icon icon={style.icon} width={20} height={20} />
                    </span>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <span
                        className={`text-sm ${
                          n.read
                            ? "text-gray-700"
                            : "font-semibold text-gray-900"
                        }`}
                      >
                        {n.text}
                      </span>
                    }
                    secondary={
                      <span className="text-xs text-gray-500">{n.time}</span>
                    }
                  />
                  {!n.read && (
                    <span className="mt-1 h-2 w-2 rounded-full bg-red-500" />
                  )}
                </ListItemButton>
              );
            })}
          </List>
        ) : (
          // Empty state
          <Box className="flex flex-col items-center justify-center py-10">
            <Icon
              icon="solar:bell-off-outline"
              width={36}
              height={36}
              className="text-gray-400"
            />
            <Typography variant="body2" className="text-gray-500 mt-2">
              Tidak ada notifikasi
            </Typography>
          </Box>
        )}

        <Divider />
        {/* Footer */}
        <Box className="px-3 pt-2">
          <Button fullWidth variant="text" onClick={handleClose}>
            Lihat semua
          </Button>
        </Box>
      </Menu>
    </div>
  );
};

export default Headers;
