import * as React from "react";
import { formatIDR, truncate } from "@/utils/helper/helper";
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
import useRouter from "@/hooks/apps/useRouter";
import { useGetDashboard } from "@/hooks/bff/useGetDashboard";
import RenderComponent from "@/components/RenderComponent";

export default function ActivityCard() {
  const router = useRouter();
  const { data, isLoading } = useGetDashboard();

  const onSeeAll = () => {
    router.push("/transaction");
  };
  return (
    <>
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
        <RenderComponent
          isLoading={isLoading}
          skeletonType="listWithImage"
          dataTotal={data?.data.activity.length}
          skeletonCount={3}
          emptyComponent="Activity tidak ada"
        >
          <div className="bg-white rounded-lg shadow-md px-2">
            <List className="">
              {data?.data?.activity?.map((it, idx) => (
                <React.Fragment key={it.id}>
                  <ListItem
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
                              bgcolor: it.icon.style.backgroundColor,
                              color: it.icon.style.color,
                              boxShadow: "inset 0 0 0 1px rgba(0,0,0,.06)",
                            }}
                          >
                            <Icon icon={it.icon.name} width={20} height={20} />
                          </Avatar>
                        </ListItemAvatar>

                        <div className="flex w-full flex-col gap-1">
                          <ListItemText
                            sx={{ margin: 0 }}
                            primary={
                              <div className="flex items-center justify-between gap-2 flex-1">
                                <span className="font-bold text-xs break-words w-full line-clamp-2">
                                  {it.title}
                                </span>
                                <Box
                                  display="flex"
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
                                    <span className="text-xs w-full truncate">
                                      {truncate(it.category.name, 20)}
                                    </span>
                                  </Box>
                                </Box>
                              </div>
                            }
                            secondary={
                              <Typography
                                className="text-xs mt-1"
                                variant="body2"
                                fontWeight={700}
                                sx={{
                                  color:
                                    it.type == "INCOME"
                                      ? "success.main"
                                      : "error.main",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {it.type == "EXPENSE" && "- "} Rp.
                                {formatIDR(it.amount)}
                              </Typography>
                            }
                            primaryTypographyProps={{ component: "div" }}
                            secondaryTypographyProps={{ component: "div" }} // << penting
                          />
                        </div>
                      </div>
                    </div>
                  </ListItem>
                  {idx < data?.data?.activity?.length - 1 && (
                    <Divider
                      className="mx-auto"
                      component="li"
                      variant="inset" // align dengan ListItemAvatar
                      sx={{
                        borderColor: "divider", // warna mengikuti theme
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </List>
          </div>
        </RenderComponent>
      </div>
    </>
  );
}
