import { Paper, type PaperProps } from "@mui/material";

interface GradientPaperProps extends PaperProps {}

export function GradientPaper({ sx, variant, ...props }: GradientPaperProps) {
  return (
    <Paper
      {...props}
      sx={{
        ...sx,
        boxShadow: "rgba(223, 226, 231, 0.6) 0px 4px 8px",
        borderRadius: "12px",
      }}
      variant="outlined"
    />
  );
}
