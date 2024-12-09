"use client";

import { NOTION } from "@/constants";
import { useFetchDatabaseTags } from "@/hooks";
import { colors } from "@mui/material";
import {
  AllSeriesType,
  barElementClasses,
  BarPlot,
  ChartsXAxis,
  ChartsYAxis,
  ResponsiveChartContainer,
} from "@mui/x-charts";
import { ChartSeriesType, ChartsSeriesConfig } from "@mui/x-charts/internals";

export function NotionTagBarChart() {
  const tags = useFetchDatabaseTags(
    NOTION.DEV_LOG_DATABASE.ID,
    NOTION.DEV_LOG_DATABASE.PROPERTY.MULTI_SELECT,
    NOTION.DEV_LOG_DATABASE.PROPERTY.STATUS.NAME,
    NOTION.DEV_LOG_DATABASE.PROPERTY.STATUS.SELECT.완료
  );

  console.log("테스트", tags);

  if (!tags) {
    return null;
  }

  const totalCountRow: ChartsSeriesConfig["bar"]["seriesProp"] = {
    type: "bar",
    data: tags.map(([_, { totalCount }]) => totalCount),
    color: colors.blue["50"],
  };

  const completeCountRow: ChartsSeriesConfig["bar"]["seriesProp"] = {
    type: "bar",
    data: tags.map(([_, { completeCount }]) => completeCount),
    color: colors.blue["700"],
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
  );
}
