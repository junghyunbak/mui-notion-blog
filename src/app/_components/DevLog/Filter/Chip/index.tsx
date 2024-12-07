"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Chip as MuiChip } from "@mui/material";

interface ChipProps {
  tagName: string;
}

export function Chip({ tagName }: ChipProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isSelect = searchParams.getAll("tag").includes(tagName);

  const handleChipClick = () => {
    const nextSearchParams = isSelect
      ? new URLSearchParams(
          Array.from(searchParams.entries()).filter(
            ([queryKey, queryValue]) =>
              !(queryKey === "tag" && queryValue === tagName)
          )
        )
      : new URLSearchParams([...Array.from(searchParams), ["tag", tagName]]);

    router.replace(`${pathname}?${nextSearchParams.toString()}`);
  };

  return (
    <MuiChip
      label={tagName}
      variant={isSelect ? "filled" : "outlined"}
      onClick={handleChipClick}
      color="primary"
    />
  );
}
