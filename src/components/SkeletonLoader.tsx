// src/components/SkeletonLoader.tsx
import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import type { SkeletonType } from "@/types";

type SkeletonLoaderProps = {
  type: SkeletonType;
  length?: number;
  classNameWrapper?: string;
};

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type,
  length,
  classNameWrapper,
}) => {
  switch (type) {
    case "list":
      return (
        <Stack spacing={1} sx={{ width: "100%" }} className={classNameWrapper}>
          {Array.from({ length: length ?? 5 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" height={50} />
          ))}
        </Stack>
      );

    case "table":
      return (
        <Box className={classNameWrapper}>
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
          className={classNameWrapper}
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

    case "banner":
      return (
        <Box className={classNameWrapper}>
          {Array.from({ length: length || 1 }).map((_, i) => (
            <Skeleton variant="rounded" width="100%" height={140} key={i} />
          ))}
        </Box>
      );

    case "avatar":
      return (
        <Box className={classNameWrapper}>
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
      );

    case "listWithImage":
      return (
        <Stack spacing={2} sx={{ width: "100%" }} className={classNameWrapper}>
          {Array.from({ length: length ?? 3 }).map((_, i) => (
            <Box key={i} display="flex" gap={2} alignItems="center">
              <Skeleton variant="circular" width={48} height={48} />
              <Box flex={1}>
                <Skeleton variant="text" width="80%" />
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
