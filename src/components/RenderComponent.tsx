import React from "react";
import SkeletonLoader from "./SkeletonLoader";
import type { SkeletonType } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";

type RenderComponentProps = {
  children: React.ReactNode;
  dataTotal?: number;
  skeletonCount?: number;
  skeletonType: SkeletonType;
  emptyComponent?: React.ReactNode;
  isLoading: boolean;
  classNameWrapper?: string;
};

const RenderComponent = ({
  children,
  dataTotal = 0,
  skeletonCount = 5,
  skeletonType,
  emptyComponent = "Belum ada data",
  isLoading = false,
  classNameWrapper,
}: RenderComponentProps) => {
  if (isLoading) {
    return (
      <SkeletonLoader
        type={skeletonType}
        length={skeletonCount}
        classNameWrapper={classNameWrapper}
      />
    );
  }

  if (dataTotal === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-6 text-gray-400">
        <Icon icon="radix-icons:value-none" fontSize={36} className="mb-2" />
        <span className="text-sm font-medium">
          {emptyComponent ?? "Tidak ada data"}
        </span>

      </div>
    );
  }

  return children;
};

export default RenderComponent;
