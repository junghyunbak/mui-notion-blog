"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useFetchNotionDatabasePages } from "@/hooks";
import { NOTION } from "@/constants";
import { Grid } from "@mui/material";
import { SnippetCard } from "@/components/widget/SnippetCard";
import { FullSizeSkeleton } from "@/components/core/FullSizeSkeleton";
import {
  getTitleFromNotionPageObject,
  getTagsFromNotionPageObject,
  getImageUrlFromNotionPageObject,
} from "@/utils";

export function SnippetList() {
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
      {pages.map(({ id, properties, cover }) => {
        const title = getTitleFromNotionPageObject(
          properties[NOTION.SNIPPET_DATABASE.PROPERTY.TITLE]
        );
        const tags = getTagsFromNotionPageObject(
          properties[NOTION.SNIPPET_DATABASE.PROPERTY.MULTI_SELECT]
        );
        const imageUrl = getImageUrlFromNotionPageObject(cover);

        return (
          <Grid item key={id} xs={12} sm={12} md={6}>
            <SnippetCard title={title} tags={tags} imageUrl={imageUrl} />
          </Grid>
        );
      })}
    </Grid>
  );
}
