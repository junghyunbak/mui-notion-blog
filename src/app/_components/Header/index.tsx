"use client";

import { AppBar, Toolbar, Box, Typography, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { GitHub, CodeOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  return (
    <AppBar position="sticky" variant="elevation">
      <Toolbar variant="dense">
        <Tooltip title="홈">
          <IconButton
            color="inherit"
            onClick={() => {
              router.push("/");
            }}
            sx={{ mr: 2 }}
          >
            <CodeOutlined />
          </IconButton>
        </Tooltip>

        <Typography variant="h6" color="inherit" component="div">
          개발자 박정현
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Box>
          <Tooltip title="Github" arrow>
            <IconButton
              color="inherit"
              onClick={() => {
                window.open("https://github.com/junghyunbak", "_blank");
              }}
            >
              <GitHub />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
