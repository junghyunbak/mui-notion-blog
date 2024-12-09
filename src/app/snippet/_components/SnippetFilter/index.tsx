"use client";

import { NOTION } from "@/constants";
import { useFetchDatabaseTags } from "@/hooks";
import { GradientPaper } from "@/components/core/GradientPaper";
import { FullSizeSkeleton } from "@/components/core/FullSizeSkeleton";
import { Stack, Box } from "@mui/material";
import { Chip } from "@/components/widget/Chip";

export function SnippetFilters() {
  const tags = useFetchDatabaseTags(
    NOTION.SNIPPET_DATABASE.ID,
    NOTION.SNIPPET_DATABASE.PROPERTY.MULTI_SELECT
  );

  if (!tags) {
    return (
      <GradientPaper>
        <Stack direction="row" p={0.5} justifyContent="center" flexWrap="wrap">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <Box sx={{ m: 0.5 }} key={i}>
                <FullSizeSkeleton
                  width={40}
                  height={32}
                  sx={{ borderRadius: 16 }}
                />
              </Box>
            ))}
        </Stack>
      </GradientPaper>
    );
  }

  return (
    <GradientPaper>
      <Stack direction="row" p={0.5} justifyContent="center" flexWrap="wrap">
        {tags.map(([tagName]) => (
          <Box sx={{ m: 0.5 }} key={tagName}>
            <Chip
              category={NOTION.SNIPPET_DATABASE.PROPERTY.MULTI_SELECT}
              value={tagName}
            />
          </Box>
        ))}
      </Stack>
    </GradientPaper>
  );
}
