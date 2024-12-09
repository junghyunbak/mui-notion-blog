"use client";

import { GradientCard } from "@/components/core/GradientCard";
import { GradientPaper } from "@/components/core/GradientPaper";
import {
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip as MuiChip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import noImage from "@/assets/image/no-image.jpg";
import { useFetchDatabaseTags, useFetchNotionDatabasePages } from "@/hooks";
import { NOTION } from "@/constants";
import {
  getTagsFromNotionPageObject,
  getTitleFromNotionPageObject,
} from "@/utils/notion";
import { Chip } from "@/components/widget/Chip";
import { FullSizeSkeleton } from "@/components/core/FullSizeSkeleton";
import { useRouter, useSearchParams } from "next/navigation";

export default function Snippet() {
  return (
    <Stack>
      <SnippetFilters />
      <SnippetList />
    </Stack>
  );
}

function SnippetList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tags = searchParams
    .getAll(NOTION.SNIPPET_DATABASE.PROPERTY.MULTI_SELECT)
    .sort();

  const pages = useFetchNotionDatabasePages({
    tags,
    databaseId: NOTION.SNIPPET_DATABASE.ID,
    tagPropertyName: NOTION.SNIPPET_DATABASE.PROPERTY.MULTI_SELECT,
    hiddenChkBoxPropertyName: NOTION.SNIPPET_DATABASE.PROPERTY.CHECKBOX,
  });

  if (!pages) {
    return (
      <Grid container spacing={2} sx={{ ml: "-16px !important" }}>
        {Array(10)
          .fill(null)
          .map((_, i) => (
            <Grid item key={i} xs={12} sm={12} md={6}>
              <FullSizeSkeleton sx={{ height: "100px" }} />
            </Grid>
          ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} sx={{ ml: "-16px !important" }}>
      {pages.map(({ id, properties }) => {
        const title = getTitleFromNotionPageObject(
          properties[NOTION.SNIPPET_DATABASE.PROPERTY.TITLE]
        );
        const tags = getTagsFromNotionPageObject(
          properties[NOTION.SNIPPET_DATABASE.PROPERTY.MULTI_SELECT]
        );

        return (
          <Grid item key={id} xs={12} sm={12} md={6}>
            <SnippetCard title={title} tags={tags} />
          </Grid>
        );
      })}
    </Grid>
  );
}

interface SnippetCard {
  title: string;
  tags?: string[];
}

function SnippetCard({ title, tags = [] }: SnippetCard) {
  return (
    <GradientCard>
      <CardActionArea sx={{ display: "flex" }}>
        <CardMedia
          image={noImage.src}
          sx={{ width: "100px", height: "100px" }}
        />

        <CardContent sx={{ flex: 1, overflow: "hidden" }}>
          <Typography variant="body1" noWrap gutterBottom>
            {title}
          </Typography>

          <Stack direction="row" flexWrap="wrap" spacing={0.5}>
            {tags.map((tag, i) => (
              <MuiChip key={i} label={tag} size="small" />
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>
    </GradientCard>
  );
}

function SnippetFilters() {
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
