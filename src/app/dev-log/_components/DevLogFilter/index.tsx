"use client";

import { Skeleton, Box, Stack } from "@mui/material";
import { Chip } from "@/components/widget/Chip";
import { NOTION } from "@/constants";
import { useFetchDatabaseTags } from "@/hooks";
import { GradientPaper } from "@/components/core/GradientPaper";

export function DevLogFilter() {
  const tags = useFetchDatabaseTags(
    NOTION.DEV_LOG_DATABASE.ID,
    NOTION.DEV_LOG_DATABASE.PROPERTY.MULTI_SELECT
  );

  if (!tags) {
    return (
      <GradientPaper>
        <Stack direction="row" p={0.5} justifyContent="center" flexWrap="wrap">
          {Array(5)
            .fill(null)
            .map((_, i) => {
              return (
                <Box sx={{ m: 0.5 }} key={i}>
                  <Skeleton
                    animation="wave"
                    width={40}
                    height={32}
                    sx={{ transform: "none", borderRadius: 16 }}
                  />
                </Box>
              );
            })}
        </Stack>
      </GradientPaper>
    );
  }

  return (
    <GradientPaper>
      <Stack direction="row" justifyContent="center" p={0.5} flexWrap="wrap">
        {tags.map(([tagName]) => {
          return (
            <Box sx={{ m: 0.5 }} key={tagName}>
              <Chip
                category={NOTION.DEV_LOG_DATABASE.PROPERTY.MULTI_SELECT}
                value={tagName}
              />
            </Box>
          );
        })}
      </Stack>
    </GradientPaper>
  );
}
