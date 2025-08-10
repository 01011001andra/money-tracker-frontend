import { formatIDR } from "@/utils/helper";
import { Icon } from "@iconify/react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";

type ActivityItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number; // + = income, - = expense
  icon: string;
  iconBg: string; // contoh: "#E0E7FF"
  iconColor: string; // contoh: "#4F46E5"
};

export default function ActivityCard({
  items = [
    {
      id: "1",
      title: "May salary payout",
      category: "Salary",
      date: "May 18",
      amount: 12000000,
      icon: "solar:wallet-money-bold-duotone",
      iconBg: "#E0E7FF",
      iconColor: "#4F46E5",
    },
    {
      id: "2",
      title: "Weekly grocery haul",
      category: "Groceries",
      date: "May 18",
      amount: -45200,
      icon: "solar:cart-3-bold-duotone",
      iconBg: "#DCFCE7",
      iconColor: "#059669",
    },
    {
      id: "3",
      title: "Ride to work",
      category: "Transport",
      date: "May 18",
      amount: -10500,
      icon: "solar:train-bold-duotone",
      iconBg: "#FEF3C7",
      iconColor: "#D97706",
    },
  ],
  onSeeAll,
}: {
  items?: ActivityItem[];
  onSeeAll?: () => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Typography variant="subtitle1" fontWeight={700}>
          Activity
        </Typography>
        <Button size="small" onClick={onSeeAll}>
          See all
        </Button>
      </Box>

      <div className="bg-white rounded-lg shadow-md px-2">
        <List>
          {items.map((it, idx) => (
            <>
              <ListItem
                key={it.id}
                className="my-1"
                disableGutters
                sx={{
                  px: 1,
                  borderRadius: 2,
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                <div className="flex items-center flex-wrap justify-between w-full">
                  <div className="flex items-center w-full">
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: it.iconBg,
                          color: it.iconColor,
                          boxShadow: "inset 0 0 0 1px rgba(0,0,0,.06)",
                        }}
                      >
                        <Icon icon={it.icon} width={20} height={20} />
                      </Avatar>
                    </ListItemAvatar>

                    <div className="flex w-full justify-between flex-wrap items-center">
                      <ListItemText
                        sx={{ margin: 0 }}
                        primary={
                          <Typography
                            className="text-xs"
                            variant="body2"
                            fontWeight={600}
                            noWrap
                          >
                            {it.title}
                          </Typography>
                        }
                        secondary={
                          <Box
                            display="flex"
                            gap={0.9}
                            alignItems="center"
                            sx={{ color: "text.secondary" }}
                          >
                            <Box
                              display="inline-flex"
                              alignItems="center"
                              gap={0.5}
                            >
                              <Icon
                                icon="solar:folder-2-outline"
                                width={14}
                                height={14}
                              />
                              <span className="text-xs">{it.category}</span>
                            </Box>
                            <span>•</span>
                            <Box
                              display="inline-flex"
                              alignItems="center"
                              gap={0.5}
                            >
                              <Icon
                                icon="solar:calendar-linear"
                                width={14}
                                height={14}
                              />
                              <span className="text-xs">{it.date}</span>
                            </Box>
                          </Box>
                        }
                      />
                      <Typography
                        className="text-xs"
                        variant="body2"
                        fontWeight={700}
                        sx={{
                          color: it.amount >= 0 ? "success.main" : "error.main",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatIDR(it.amount)}
                      </Typography>
                    </div>
                  </div>
                </div>
              </ListItem>
              {idx < items.length - 1 && (
                <Divider
                  className="mx-auto"
                  component="li"
                  variant="inset" // align dengan ListItemAvatar
                  sx={{
                    borderColor: "divider", // warna mengikuti theme
                  }}
                />
              )}
            </>
          ))}
        </List>
      </div>
    </div>
  );
}
