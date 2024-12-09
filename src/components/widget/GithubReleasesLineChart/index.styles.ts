import { GradientPaper } from "@/components/core/GradientPaper";
import { Box, styled } from "@mui/material";

export const Layout = styled(GradientPaper)(() => ({
  overflow: "hidden",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

export const TopContent = styled(Box)(({ theme }) => ({
  height: "50%",
  padding: "2rem",

  [theme.breakpoints.down("sm")]: {
    padding: "1.5rem",
  },
}));
