"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Chip as MuiChip } from "@mui/material";

interface ChipProps {
  category: string;
  value: string;
}

export function Chip({ category, value }: ChipProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isSelect = searchParams.getAll(category).includes(value);

  const handleChipClick = () => {
    const nextSearchParams = isSelect
      ? new URLSearchParams(
          Array.from(searchParams.entries()).filter(
            ([queryKey, queryValue]) =>
              !(queryKey === category && queryValue === value)
          )
        )
      : new URLSearchParams([...Array.from(searchParams), [category, value]]);

    router.replace(`${pathname}?${nextSearchParams.toString()}`);
  };

  return (
    <MuiChip
      label={value}
      variant={isSelect ? "filled" : "outlined"}
      onClick={handleChipClick}
      color="primary"
    />
  );
}
