"use client";

import { Box, Stack, Tooltip, colors, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { GitHub, Home } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  return (
    <Box
      sx={{
        height: "60px",
        background: "rgba(255,255,255,0.8)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        position: "sticky",
        top: 0,
        zIndex: 10,
        backdropFilter: "blur(10px)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={2} alignItems={"center"}>
          <Tooltip title="메인화면" arrow>
            <IconButton
              sx={{
                padding: "8px",
                display: "flex",
                boxShadow: "rgba(223, 226, 231, 0.6) 0px 4px 8px",
                border: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: "12px",
              }}
              onClick={() => {
                router.push("/");
              }}
            >
              <Home
                sx={{
                  width: "18px",
                  height: "18px",
                  color: colors.blue["700"],
                }}
              />
            </IconButton>
          </Tooltip>

          <Button
            variant="text"
            sx={{
              color: "#303741",
              fontWeight: "bold",
            }}
            onClick={() => {
              router.push("/dev-log");
            }}
          >
            개발 일지
          </Button>

          <Button
            variant="text"
            sx={{
              color: "#303741",
              fontWeight: "bold",
            }}
            onClick={() => {
              router.push("/snippet");
            }}
          >
            Snippet
          </Button>
        </Stack>

        <Tooltip title="Github" arrow>
          <IconButton
            sx={{
              padding: "8px",
              display: "flex",
              boxShadow: "rgba(223, 226, 231, 0.6) 0px 4px 8px",
              border: "1px solid rgba(0, 0, 0, 0.12)",
              borderRadius: "12px",
            }}
            onClick={() => {
              window.open("https://github.com/junghyunbak", "_blank");
            }}
          >
            <GitHub
              sx={{ width: "18px", height: "18px", color: colors.blue["700"] }}
            />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
