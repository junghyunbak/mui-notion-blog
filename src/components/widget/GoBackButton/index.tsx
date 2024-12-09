"use client";

import { Box, Button } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export function GoBackButton() {
  const router = useRouter();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "start",
      }}
    >
      <Button
        startIcon={<ChevronLeft />}
        onClick={() => {
          router.back();
        }}
      >
        뒤로 가기
      </Button>
    </Box>
  );
}
