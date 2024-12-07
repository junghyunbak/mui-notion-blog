"use client";

import { Filter } from "./Filter";
import { Pages } from "./Pages";
import { Box, Stack } from "@mui/material";

interface DevLogProps {}

export function DevLog({}: DevLogProps) {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Filter />
      <Pages />
    </Stack>
  );
}
