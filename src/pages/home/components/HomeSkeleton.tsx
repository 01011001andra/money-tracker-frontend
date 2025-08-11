// HomeSkeleton.tsx
import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@mui/material";

export default function HomeSkeleton() {
  return (
    <div className="min-h-screen p-4 flex flex-col gap-6 overflow-y-auto">
      {/* ===== Header Skeleton ===== */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={2} alignItems="center">
          <Skeleton variant="circular" width={40} height={40} />
          <Box>
            <Skeleton variant="text" width={120} height={16} />
            <Skeleton variant="text" width={180} height={14} />
          </Box>
        </Box>
        <Skeleton variant="circular" width={40} height={40} />
      </Box>

      {/* ===== Banner Skeleton ===== */}
      <Box
        className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/15"
        sx={{
          bgcolor: "grey.900",
          p: 2.5,
          color: "common.white",
          position: "relative",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Skeleton
            variant="text"
            width={100}
            height={16}
            sx={{ bgcolor: "grey.800" }}
          />
          <Skeleton
            variant="rounded"
            width={80}
            height={28}
            sx={{ borderRadius: 2, bgcolor: "grey.800" }}
          />
        </Box>

        <Box mt={1.5}>
          <Skeleton
            variant="text"
            width={180}
            height={36}
            sx={{ bgcolor: "grey.800" }}
          />
        </Box>

        <Box mt={2} display="flex" alignItems="center" gap={1.5}>
          <Skeleton
            variant="rounded"
            width={90}
            height={24}
            sx={{ borderRadius: 999, bgcolor: "grey.800" }}
          />
          <Skeleton
            variant="text"
            width={100}
            height={16}
            sx={{ bgcolor: "grey.800" }}
          />
        </Box>
      </Box>

      {/* ===== Activity Card Skeleton ===== */}
      <div className="flex flex-col gap-2">
        {/* Header */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
        >
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={60} height={20} />
        </Box>

        <div className="bg-white rounded-lg shadow-md px-2">
          <List>
            {Array.from({ length: 3 }).map((_, idx) => (
              <React.Fragment key={idx}>
                <ListItem
                  disableGutters
                  className="my-1"
                  sx={{
                    px: 1,
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                >
                  <div className="flex items-center flex-wrap justify-between w-full">
                    <div className="flex items-center w-full">
                      <ListItemAvatar>
                        <Skeleton variant="rounded" width={40} height={40} />
                      </ListItemAvatar>

                      <div className="flex w-full justify-between flex-wrap items-center">
                        <ListItemText
                          sx={{ m: 0 }}
                          primary={
                            <Skeleton variant="text" width={160} height={16} />
                          }
                          secondary={
                            <Box display="flex" alignItems="center" gap={1.5}>
                              <Skeleton variant="text" width={80} height={14} />
                              <Skeleton variant="text" width={60} height={14} />
                            </Box>
                          }
                          primaryTypographyProps={{ component: "div" }}
                          secondaryTypographyProps={{ component: "div" }}
                        />

                        <Skeleton variant="text" width={90} height={16} />
                      </div>
                    </div>
                  </div>
                </ListItem>

                {idx < 2 && (
                  <Divider
                    className="mx-auto"
                    component="li"
                    variant="inset"
                    sx={{ borderColor: "divider" }}
                  />
                )}
              </React.Fragment>
            ))}
          </List>
        </div>
      </div>

      {/* ===== Spending Overview Skeleton ===== */}
      <div className="flex flex-col gap-3">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Skeleton variant="text" width={160} height={20} />
        </Box>

        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} elevation={6} className="h-full shadow-lg rounded-lg">
              <CardContent className="p-3">
                <Skeleton variant="text" width={100} height={14} />
                <Skeleton variant="text" width={140} height={24} />

                <Box mt={1}>
                  <Skeleton
                    variant="rounded"
                    height={7}
                    sx={{ borderRadius: 999 }}
                  />
                  <Skeleton variant="text" width={120} height={12} />
                </Box>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
