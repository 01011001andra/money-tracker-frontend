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
import useRouter from "@/hooks/apps/useRouter";
import { useUserStore } from "@/stores/user";
import { useInitQuery } from "@/hooks/auth/useInit";
import SkeletonLoader from "@/components/SkeletonLoader";
import { useGetDashboard } from "@/hooks/bff/useGetDashboard";

const Headers = () => {
  // states
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // hooks
  const { isLoading } = useInitQuery();
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { user } = useUserStore();
  const { data, isLoading: dashboardLoading } = useGetDashboard();

  // actions
  const goSetting = () => router.push("/setting");
  const unreadCount = useMemo(
    () => data?.data?.notification?.details?.filter((n) => !n.read).length,
    [data?.data?.notification?.details]
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const markAllRead = () => {
    console.log("clicked");
  };

  return (
    <div className="flex justify-between items-center w-full">
      {/* Avatar + Greeting */}
      {isLoading ? (
        <div className="h-12 w-full">
          <SkeletonLoader type="listWithImage" length={1} />
        </div>
      ) : (
        <div className="flex gap-4 items-center ">
          <Avatar
            onClick={goSetting}
            alt="Static Avatar"
            src={
              user?.image ||
              `https://api.dicebear.com/9.x/dylan/svg?seed=${user?.id}`
            }
            sx={{ width: 40, height: 40, cursor: "pointer" }}
          />
          <div className="flex flex-col  w-full">
            <span className="font-bold text-sm">Hi, {user?.name}!</span>
            <span className="text-xs text-gray-400">
              Lacak uang anda dengan mudah
            </span>
          </div>
        </div>
      )}

      {dashboardLoading ? (
        <SkeletonLoader type="avatar" />
      ) : (
        <>
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
                {data?.data.notification.title}
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
            {data && data?.data?.notification?.details?.length > 0 ? (
              <List
                sx={{
                  maxHeight: 360,
                  overflowY: "auto",
                  py: 0,
                }}
              >
                {data?.data?.notification?.details?.map((n) => {
                  return (
                    <ListItemButton
                      key={n.id}
                      onClick={() => {
                        handleClose();
                      }}
                      sx={{
                        gap: 1,
                        ...(n.read ? {} : { backgroundColor: "action.hover" }),
                      }}
                    >
                      <ListItemAvatar>
                        icon
                        {/* <span
                          className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${style.bg} ${style.text}`}
                        >
                          <Icon icon={style.icon} width={20} height={20} />
                        </span> */}
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
                            {n.title}
                          </span>
                        }
                        secondary={
                          <span className="text-xs text-gray-500">
                            {n.createdAt}
                          </span>
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
        </>
      )}
    </div>
  );
};

export default Headers;
