"use client";

import { NOTION } from "@/constants";
import { useFetchNotionDatabasePages } from "@/hooks";
import {
  CardActionArea,
  Grid,
  styled,
  colors,
  Box,
  Typography,
} from "@mui/material";
import { GradientPaper } from "@/components/core/GradientPaper";
import { FullSizeSkeleton } from "@/components/core/FullSizeSkeleton";
import { NotionPageCard } from "@/components/widget/NotionPageCard";
import { isNotionPropertyCorrectType } from "@/utils";
import { useRouter } from "next/navigation";
import noImage from "@/assets/image/no-image.jpg";
import { ExpandMore } from "@mui/icons-material";

const ResponsiveGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    [`& > .MuiGrid-item:nth-child(3)`]: {
      display: "none",
    },
  },

  [theme.breakpoints.down("sm")]: {
    [`& > .MuiGrid-item:nth-child(-n+2)`]: {
      display: "none",
    },
  },
}));

const MobileBox = styled(Box)(({ theme }) => ({
  display: "none",

  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

export function DevLogPreivew() {
  const router = useRouter();

  const pages = useFetchNotionDatabasePages(
    [],
    NOTION.DEV_LOG_DATABASE.ID,
    NOTION.DEV_LOG_DATABASE.PROPERTY.MULTI_SELECT,
    NOTION.DEV_LOG_DATABASE.PROPERTY.CHECKBOX
  );

  if (!pages) {
    return (
      <ResponsiveGrid container xs={12} sx={{ width: "100%" }} spacing={2}>
        {Array(3)
          .fill(null)
          .map((_, i) => {
            return (
              <Grid item xs={10.5} sm={5.25} md={3.5} key={i}>
                <FullSizeSkeleton sx={{ height: "280px" }} />
              </Grid>
            );
          })}

        <Grid item xs={12} sm={1.5} md={1.5}>
          <FullSizeSkeleton />
        </Grid>
      </ResponsiveGrid>
    );
  }

  return (
    <ResponsiveGrid container xs={12} sx={{ width: "100%" }} spacing={2}>
      {pages.slice(0, 3).map((page) => {
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
          <Grid item xs={10.5} sm={5.25} md={3.5} key={id}>
            <NotionPageCard
              title={title}
              imageUrl={imageUrl}
              iconUrl={iconUrl}
              date={date}
              tags={tags}
              handleCardClick={handleCardClick}
            />
          </Grid>
        );
      })}

      <Grid item xs={12} sm={1.5} md={1.5}>
        <GradientPaper
          sx={{
            width: "100%",
            height: "280px",
          }}
        >
          <CardActionArea
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              router.push("/dev-log");
            }}
          >
            {
              <MobileBox>
                <Typography
                  variant="body2"
                  sx={{ color: "#303741", fontWeight: "bold" }}
                >
                  개발일지 보기
                </Typography>
              </MobileBox>
            }
            <ExpandMore sx={{ color: colors.grey["400"] }} />
          </CardActionArea>
        </GradientPaper>
      </Grid>
    </ResponsiveGrid>
  );
}
