"use client";

import { Card, type CardProps } from "@mui/material";

interface GradientCardProps extends CardProps {}

export function GradientCard({ sx, ...props }: GradientCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        boxShadow: "rgba(223, 226, 231, 0.6) 0px 4px 8px",
        borderRadius: "12px",
        ...sx,
      }}
      {...props}
    />
  );
}
