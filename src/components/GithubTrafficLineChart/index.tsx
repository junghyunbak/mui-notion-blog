"use client";

import { Avatar, Box, Skeleton, Stack, Typography } from "@mui/material";
import {
  AreaPlot,
  LinePlot,
  areaElementClasses,
  lineElementClasses,
  ResponsiveChartContainer,
} from "@mui/x-charts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FileDownload } from "@mui/icons-material";
import { Layout, TopContent } from "./index.styles";

interface GithubReleasesLineChartProps {
  owner: string;
  repo: string;
}

export function GithubReleasesLineChart({
  owner,
  repo,
}: GithubReleasesLineChartProps) {
  const { data } = useQuery({
    queryKey: ["github-traffic-chart", owner, repo],
    queryFn: async () => {
      const {
        data: {
          data: { releases },
        },
      } = await axios.get<ResponseData["/api/github/releases"]>(
        "/api/github/releases",
        {
          params: {
            owner,
            repo,
          },
        }
      );

      return releases;
    },
  });

  if (!data) {
    return (
      <Skeleton sx={{ width: "100%", height: "100%", transform: "none" }} />
    );
  }

  const downloadCount = data.reduce(
    (totalDownload, release) =>
      totalDownload +
      release.assets.reduce(
        (assetsDownload, asset) => assetsDownload + asset.download_count,
        0
      ),
    0
  );

  const xData = data.map((_, i) => i);
  const yData = data
    .map((release) => release.assets.reduce((a, c) => a + c.download_count, 0))
    .reverse();

  return (
    <Layout>
      <TopContent>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Stack>
            <Typography variant="body2" sx={{ color: "gray" }} gutterBottom>
              {repo}
            </Typography>
            <Typography variant="h5">{downloadCount}</Typography>
          </Stack>

          <Avatar>
            <FileDownload />
          </Avatar>
        </Box>
      </TopContent>

      <Box sx={{ height: "50%" }}>
        <ResponsiveChartContainer
          skipAnimation
          xAxis={[
            {
              data: xData,
              scaleType: "point",
            },
          ]}
          series={[
            {
              type: "line",
              area: true,
              data: yData,
              baseline: "min",
            },
          ]}
          margin={{ left: 0, right: 0, bottom: 0, top: 0 }}
          sx={{
            [`& .${lineElementClasses.root}`]: {
              stroke: "#2A6FC8",
              strokeWidth: 4,
            },
            [`& .${areaElementClasses.root}`]: {
              fill: "url(#gradient-traffic-chart)",
            },
          }}
        >
          <defs>
            <linearGradient
              id="gradient-traffic-chart"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop stopColor="rgba(158,207,255,1)" offset="0%" />
              <stop stopColor="rgba(235,245,255,1)" offset="100%" />
            </linearGradient>
          </defs>

          <LinePlot />
          <AreaPlot />
        </ResponsiveChartContainer>
      </Box>
    </Layout>
  );
}
