import * as React from "react";
import { Metadata } from "next";
import { GithubReleasesLineChart } from "@/components/widget/GithubReleasesLineChart";
import { Stack, Grid } from "@mui/material";
import { GithubUser } from "@/components/widget/GithubUser";
import { GradientPaper } from "@/components/core/GradientPaper";
import { DevLogPreivew } from "./_components/DevLogPreview";
import { NotionTagBarChart } from "@/components/widget/NotionTagBarChart";

export function generateMetadata(): Metadata {
  return {
    title: "개발자 박정현",
  };
}

export default async function Home() {
  return (
    <Stack
      spacing={2}
      sx={{
        width: "100%",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "-16px !important", marginLeft: "-16px !important" }}
      >
        <Grid
          container
          xs={12}
          sm={12}
          md={6}
          spacing={2}
          sx={{ width: "100%", aspectRatio: "4/3" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            sx={{ width: "100%", aspectRatio: "8/3" }}
          >
            <GradientPaper
              sx={{ width: "100%", height: "100%" }}
            ></GradientPaper>
          </Grid>

          <Grid
            container
            xs={12}
            sm={12}
            md={12}
            spacing={2}
            sx={{ width: "100%", aspectRatio: "8/3" }}
          >
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              sx={{ width: "100%", aspectRatio: "4/3" }}
            >
              <GithubReleasesLineChart owner="junghyunbak" repo="boj-ide" />
            </Grid>

            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              sx={{ width: "100%", aspectRatio: "4/3" }}
            >
              <GithubUser username="junghyunbak" />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{ width: "100%", aspectRatio: "4/3" }}
        >
          <GradientPaper sx={{ width: "100%", height: "100%" }}>
            <NotionTagBarChart />
          </GradientPaper>
        </Grid>

        <DevLogPreivew />
      </Grid>
    </Stack>
  );
}
