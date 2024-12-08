import * as React from "react";
import { DevLog } from "./_components/DevLog";
import { Metadata } from "next";
import { GithubReleasesLineChart } from "@/components/GithubTrafficLineChart";
import { Grid2, Stack } from "@mui/material";

export function generateMetadata(): Metadata {
  return {
    title: "개발자 박정현",
  };
}

export default async function Home() {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Grid2 container spacing={2} sx={{ width: "100%" }}>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <GithubReleasesLineChart repo="boj-ide" owner="junghyunbak" />
        </Grid2>
      </Grid2>

      <DevLog />
    </Stack>
  );
}
