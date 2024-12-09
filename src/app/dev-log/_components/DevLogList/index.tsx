"use client";

import { Grid2 } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { FullSizeSkeleton } from "@/components/core/FullSizeSkeleton";
import { NotionPageCard } from "@/components/widget/NotionPageCard";
import { useFetchNotionDatabasePages } from "@/hooks";
import { NOTION } from "@/constants";
import noImage from "@/assets/image/no-image.jpg";
import { isNotionPropertyCorrectType } from "@/utils";
import { useRouter } from "next/navigation";

export function DevLogList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tags = searchParams
    .getAll(NOTION.DEV_LOG_DATABASE.PROPERTY.MULTI_SELECT)
    .sort();

  const pages = useFetchNotionDatabasePages(
    tags,
    NOTION.DEV_LOG_DATABASE.ID,
    NOTION.DEV_LOG_DATABASE.PROPERTY.MULTI_SELECT,
    NOTION.DEV_LOG_DATABASE.PROPERTY.CHECKBOX
  );

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
      {pages.map((page) => {
        const { id, properties, cover, icon } = page;

        const title = (() => {
          const property = properties[NOTION.DEV_LOG_DATABASE.PROPERTY.TITLE];

          if (
            !isNotionPropertyCorrectType(
              property,
              NOTION.DEV_LOG_DATABASE.PROPERTY.TITLE,
              "title"
            )
          ) {
            return "";
          }

          const [textItem] = property.title;

          if (textItem.type !== "text") {
            return "";
          }

          return textItem.text.content;
        })();

        const imageUrl = (() => {
          if (!cover) {
            return noImage.src;
          }

          if (cover.type === "external") {
            return cover.external.url;
          }

          return cover.file.url;
        })();

        const iconUrl = (() => {
          if (!icon) {
            return null;
          }

          if (icon.type === "emoji") {
            return icon.emoji;
          }

          if (icon.type === "external") {
            return icon.external.url;
          }

          return icon.file.url;
        })();

        const createTime = (() => {
          const property =
            properties[NOTION.DEV_LOG_DATABASE.PROPERTY.CREATE_TIME];

          if (
            !isNotionPropertyCorrectType(
              property,
              NOTION.DEV_LOG_DATABASE.PROPERTY.CREATE_TIME,
              "created_time"
            )
          ) {
            return "";
          }

          return property.created_time;
        })();

        const tags = (() => {
          const property =
            properties[NOTION.DEV_LOG_DATABASE.PROPERTY.MULTI_SELECT];

          if (
            !isNotionPropertyCorrectType(
              property,
              NOTION.DEV_LOG_DATABASE.PROPERTY.MULTI_SELECT,
              "multi_select"
            )
          ) {
            return [];
          }

          return property.multi_select.map((select) => select.name);
        })();

        const handleCardClick = () => {
          router.push(`/dev-log/${id}`);
        };

        const date = new Date(createTime);

        return (
          <Grid2 key={id} size={{ xs: 12, sm: 6, md: 4 }}>
            <NotionPageCard
              title={title}
              imageUrl={imageUrl}
              iconUrl={iconUrl}
              date={date}
              tags={tags}
              handleCardClick={handleCardClick}
            />
          </Grid2>
        );
      })}
    </Grid2>
  );
}
