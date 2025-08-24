// src/components/SkeletonLoader.tsx
import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

type SkeletonLoaderProps = {
  type: "list" | "table" | "image" | "listWithImage";
  length?: number;
};

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type, length }) => {
  switch (type) {
    case "list":
      return (
        <Stack spacing={1} sx={{ width: "100%" }}>
          {Array.from({ length: length ?? 5 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" height={50} />
          ))}
        </Stack>
      );

    case "table":
      return (
        <Box>
          {/* Header */}
          <Skeleton variant="rectangular" height={40} sx={{ mb: 1 }} />
          {/* Rows */}
          <Stack spacing={1}>
            {Array.from({ length: length ?? 5 }).map((_, i) => (
              <Skeleton key={i} variant="rectangular" height={30} />
            ))}
          </Stack>
        </Box>
      );

    case "image":
      return (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </Box>
      );

    case "listWithImage":
      return (
        <Stack spacing={2} sx={{ width: "100%" }}>
          {Array.from({ length: length ?? 3 }).map((_, i) => (
            <Box key={i} display="flex" gap={2} alignItems="center">
              <Skeleton variant="circular" width={48} height={48} />
              <Box flex={1}>
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
              </Box>
            </Box>
          ))}
        </Stack>
      );

    default:
      return null;
  }
};

export default SkeletonLoader;
