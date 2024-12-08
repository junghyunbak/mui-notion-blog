import { styled, colors } from "@mui/material";
import { GradientPaper } from "@/components/core/GradientPaper";

export const Layout = styled(GradientPaper)(({ theme }) => ({
  width: "100%",
  height: "100%",
  background: `linear-gradient(180deg, ${colors.blue["600"]} 0%, ${colors.blue["700"]} 100%)`,
  padding: "2rem",

  [theme.breakpoints.down("sm")]: {
    padding: "1.5rem",
  },
}));
