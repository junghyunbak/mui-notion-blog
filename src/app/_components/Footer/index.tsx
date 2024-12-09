"use client";

import { GitHub } from "@mui/icons-material";
import {
  Box,
  Stack,
  Link,
  colors,
  Typography,
  IconButton,
} from "@mui/material";

export function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "250px",
        background: "white",
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "1200px", px: 3, py: 6 }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack sx={{ width: "fit-content" }}>
            <Typography
              variant="caption"
              sx={{
                textDecoration: "underline",
                color: colors.grey["500"],
                fontWeight: "bold",
              }}
              gutterBottom
            >
              페이지
            </Typography>
            <Link
              href="/"
              gutterBottom
              underline="none"
              variant="button"
              sx={{ fontWeight: "bold", color: colors.blueGrey["700"] }}
            >
              메인 화면
            </Link>
            <Link
              href={"/dev-log"}
              gutterBottom
              underline="none"
              variant="button"
              sx={{ fontWeight: "bold", color: colors.blueGrey["700"] }}
            >
              개발 일지
            </Link>
            <Link
              href={"/snippet"}
              gutterBottom
              underline="none"
              variant="button"
              sx={{ fontWeight: "bold", color: colors.blueGrey["700"] }}
            >
              SNIPPET
            </Link>
          </Stack>

          <IconButton
            sx={{ height: "fit-content" }}
            onClick={() => {
              window.open("https://github.com/junghyunbak", "_blank");
            }}
          >
            <GitHub
              sx={{ color: colors.grey["500"], width: "30px", height: "30px" }}
            />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
