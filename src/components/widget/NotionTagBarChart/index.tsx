"use client";

import { FullSizeSkeleton } from "@/components/core/FullSizeSkeleton";
import { GradientPaper } from "@/components/core/GradientPaper";
import { NOTION } from "@/constants";
import { useFetchDatabaseTags } from "@/hooks";
import { colors, Box, Stack, Typography } from "@mui/material";
import {
  BarLabel,
  BarPlot,
  ChartsXAxis,
  ChartsYAxis,
  ResponsiveChartContainer,
} from "@mui/x-charts";
import { ChartsSeriesConfig } from "@mui/x-charts/internals";

export function NotionTagBarChart() {
  const tags = useFetchDatabaseTags(
    NOTION.DEV_LOG_DATABASE.ID,
    NOTION.DEV_LOG_DATABASE.PROPERTY.MULTI_SELECT,
    NOTION.DEV_LOG_DATABASE.PROPERTY.STATUS.NAME,
    NOTION.DEV_LOG_DATABASE.PROPERTY.STATUS.SELECT.완료
  );

  if (!tags) {
    return <FullSizeSkeleton />;
  }

  const totalCountRow: ChartsSeriesConfig["bar"]["seriesProp"] = {
    type: "bar",
    data: tags.map(([_, { totalCount }]) => totalCount),
    color: colors.blue["50"],
    label: "작성 중",
  };

  const completeCountRow: ChartsSeriesConfig["bar"]["seriesProp"] = {
    type: "bar",
    data: tags.map(([_, { completeCount }]) => completeCount),
    color: colors.blue["700"],
    label: "완료",
  };

  const emptyRowCount: ChartsSeriesConfig["bar"]["seriesProp"] = {
    type: "bar",
    data: Array(tags.length).fill(0),
  };

  const xData = tags.map(([tagName]) => tagName);
  const yData: ChartsSeriesConfig["bar"]["seriesProp"][] = [
    emptyRowCount,
    emptyRowCount,
    totalCountRow,
    completeCountRow,
    emptyRowCount,
    emptyRowCount,
  ];

  return (
    <GradientPaper sx={{ width: "100%", height: "100%" }}>
      <Stack sx={{ width: "100%", height: "100%" }}>
        <Stack
          direction="row"
          sx={{
            px: "2rem",
            pt: "2rem",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1" sx={{ color: "#303741" }}>
            개발 일지
          </Typography>

          <Stack direction="row" spacing={1.5}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: colors.blue["700"],
                  borderRadius: 9999,
                }}
              />
              <Typography variant="body2">완성</Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: colors.blue["50"],
                  borderRadius: 9999,
                }}
              />
              <Typography variant="body2">작성 중</Typography>
            </Stack>
          </Stack>
        </Stack>

        <ResponsiveChartContainer
          xAxis={[{ scaleType: "band", data: xData }]}
          series={yData}
          sx={{
            [`& .MuiChartsAxis-root text`]: {
              fill: colors.grey["400"],
            },
            [`& .MuiChartsAxis-root line`]: {
              stroke: colors.blue["50"],
            },
          }}
        >
          <BarPlot borderRadius={4} />
          <ChartsXAxis disableTicks />
          <ChartsYAxis disableLine disableTicks />
        </ResponsiveChartContainer>
      </Stack>
    </GradientPaper>
  );
}
