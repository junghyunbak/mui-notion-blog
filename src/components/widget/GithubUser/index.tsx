"use client";

import {
  Avatar,
  colors,
  Box,
  Stack,
  Typography,
  Skeleton,
} from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { Layout } from "./index.styles";
import { useFetchGithubUser } from "@/hooks";
import { FullSizeSkeleton } from "@/components/core/FullSizeSkeleton";

interface GithubUser {
  username: string;
}

export function GithubUser({ username }: GithubUser) {
  const user = useFetchGithubUser(username);

  if (!user) {
    return <FullSizeSkeleton />;
  }

  return (
    <Layout variant="elevation">
      <Stack sx={{ justifyContent: "space-between", height: "100%" }}>
        <Stack
          direction="row-reverse"
          spacing={1}
          sx={{ width: "100%", justifyContent: "space-between" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: colors.blue["400"],
              borderRadius: 9999,
              width: 50,
              height: 50,
              border: "1px solid white",
            }}
          >
            <Avatar src={user.avatar_url}></Avatar>
          </Box>

          <Stack sx={{ justifyContent: "center" }}>
            <Typography
              variant="caption"
              sx={{ color: "#cce6ff", fontWeight: "bold" }}
            >
              FE 개발자
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              박정현
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.5}>
          <AccessTime
            sx={{
              width: 16,
              height: 16,
              color: "white",
            }}
          />

          <Typography variant="caption" sx={{ color: "white" }}>
            {`${new Date().getMonth() + 1}월 ${new Date().getDate()}일`}
          </Typography>
        </Stack>
      </Stack>
    </Layout>
  );
}
