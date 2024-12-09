import { Skeleton, type SkeletonProps } from "@mui/material";

interface FullSizeSkeleton extends SkeletonProps {}

export function FullSizeSkeleton({ sx, ...props }: FullSizeSkeleton) {
  return (
    <Skeleton
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "12px",
        transform: "none",
        ...sx,
      }}
      {...props}
    />
  );
}
