"use client";

import { Grid2 } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { FullSizeSkeleton } from "@/components/core/FullSizeSkeleton";
import { NotionPageCard } from "@/components/widget/NotionPageCard";
import { useFetchNotionDatabasePages } from "@/hooks";
import { NOTION } from "@/constants";
import { useRouter } from "next/navigation";
import {
  getCreateTimeFromNotionPageObject,
  getIconUrlFromNotionPageObject,
  getImageUrlFromNotionPageObject,
  getTagsFromNotionPageObject,
  getTitleFromNotionPageObject,
} from "@/utils";

export function DevLogList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tags = searchParams
    .getAll(NOTION.DEV_LOG_DATABASE.PROPERTY.MULTI_SELECT)
    .sort();

  const pages = useFetchNotionDatabasePages({
    tags,
    databaseId: NOTION.DEV_LOG_DATABASE.ID,
    tagPropertyName: NOTION.DEV_LOG_DATABASE.PROPERTY.MULTI_SELECT,
    hiddenChkBoxPropertyName: NOTION.DEV_LOG_DATABASE.PROPERTY.CHECKBOX,
    datePropertyName: NOTION.DEV_LOG_DATABASE.PROPERTY.DATE,
  });

  if (!pages) {
    return (
      <Grid2 container spacing={2}>
        {Array(9)
          .fill(null)
          .map((_, i) => (
            <Grid2 key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <FullSizeSkeleton sx={{ height: 280 }} />
            </Grid2>
          ))}
      </Grid2>
    );
  }

  return (
    <Grid2 container spacing={2}>
      {pages.map(({ id, properties, cover, icon }) => {
        const title = getTitleFromNotionPageObject(
          properties[NOTION.DEV_LOG_DATABASE.PROPERTY.TITLE]
        );
        const imageUrl = getImageUrlFromNotionPageObject(cover);
        const iconUrl = getIconUrlFromNotionPageObject(icon);
        const createDate = getCreateTimeFromNotionPageObject(
          properties[NOTION.DEV_LOG_DATABASE.PROPERTY.DATE]
        );
        const tags = getTagsFromNotionPageObject(
          properties[NOTION.DEV_LOG_DATABASE.PROPERTY.MULTI_SELECT]
        );

        const handleCardClick = () => {
          router.push(`/notion/${id}`);
        };

        return (
          <Grid2 key={id} size={{ xs: 12, sm: 6, md: 4 }}>
            <NotionPageCard
              title={title}
              imageUrl={imageUrl}
              iconUrl={iconUrl}
              date={createDate}
              tags={tags}
              handleCardClick={handleCardClick}
            />
          </Grid2>
        );
      })}
    </Grid2>
  );
}
