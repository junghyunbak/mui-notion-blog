"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid2,
  Skeleton,
  Typography,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import noImage from "@/assets/image/no-image.jpg";
import { NOTION } from "@/constants";
import { useFetchNotionDatabasePages } from "@/hooks";

export function DevLogList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tags = searchParams.getAll(NOTION.DEV_LOG_DATABASE_TAG_PROPERTY).sort();

  const pages = useFetchNotionDatabasePages(
    tags,
    NOTION.DEV_LOG_DATABASE_ID,
    NOTION.DEV_LOG_DATABASE_TAG_PROPERTY
  );

  if (!pages) {
    return (
      <Grid2 container spacing={2}>
        {Array(9)
          .fill(null)
          .map((_, i) => (
            <Grid2 key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton
                width={"100%"}
                height={280}
                sx={{ transform: "none" }}
              />
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
          if (properties["이름"].type !== "title") {
            return "";
          }

          const [textItem] = properties["이름"].title;

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
          if (!properties["생성 일시"]) {
            return "";
          }

          if (properties["생성 일시"].type !== "created_time") {
            return "";
          }

          return properties["생성 일시"].created_time;
        })();

        const tags = (() => {
          if (properties["태그"].type !== "multi_select") {
            return [];
          }

          return properties["태그"].multi_select;
        })();

        const date = new Date(createTime);

        return (
          <Grid2 key={id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              variant="outlined"
              sx={{
                boxShadow: "rgba(223, 226, 231, 0.6) 0px 4px 8px",
              }}
            >
              <CardActionArea
                onClick={() => {
                  router.push(`/dev-log-detail/${id}`);
                }}
              >
                <CardMedia
                  image={imageUrl}
                  sx={{ height: 140, position: "relative" }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      left: 16,
                      bottom: -16,
                      width: 32,
                      height: 32,
                      display: "flex",
                      justifyContent: "center",

                      alignItems: "center",
                    }}
                  >
                    {iconUrl === null ? null : !iconUrl.startsWith("http") ? (
                      <Typography variant="h4">{iconUrl}</Typography>
                    ) : (
                      <Box
                        component="img"
                        src={iconUrl}
                        sx={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    )}
                  </Box>
                </CardMedia>

                <CardContent sx={{ height: 140 }}>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      display: "-webkit-box",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      "-webkit-line-clamp": "2",
                      "-webkit-box-orient": "vertical",
                    }}
                  >
                    {title}
                  </Typography>

                  <Typography variant="body2" gutterBottom>
                    {`${date.getFullYear()}년 ${
                      date.getMonth() + 1
                    }월 ${date.getDate()}일`}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                    }}
                  >
                    {tags.map(({ id, name }) => (
                      <Chip key={id} label={name} size="small" />
                    ))}
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid2>
        );
      })}
    </Grid2>
  );
}
