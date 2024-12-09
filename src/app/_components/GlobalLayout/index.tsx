"use client";

import { type PropsWithChildren } from "react";
import { Box } from "@mui/material";

export function GlobalLayout({ children }: PropsWithChildren) {
  return <Box sx={{ width: "100%", minHeight: "100vh" }}>{children}</Box>;
}
