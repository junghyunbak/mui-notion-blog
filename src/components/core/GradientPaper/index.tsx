import { Paper, type PaperProps } from "@mui/material";

interface GradientPaperProps extends PaperProps {}

export function GradientPaper({ sx, ...props }: GradientPaperProps) {
  return (
    <Paper
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
