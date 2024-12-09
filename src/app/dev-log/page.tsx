"use client";

import { Stack } from "@mui/material";
import { DevLogFilter } from "./_components/DevLogFilter";
import { DevLogList } from "./_components/DevLogList";

export default function DevLog() {
  return (
    <Stack spacing={2}>
      <DevLogFilter />
      <DevLogList />
    </Stack>
  );
}
