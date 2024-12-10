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
import { useRouter } from "next/navigation";
import { ExpandMore } from "@mui/icons-material";
import {
  getCreateTimeFromNotionPageObject,
  getIconUrlFromNotionPageObject,
  getImageUrlFromNotionPageObject,
  getTagsFromNotionPageObject,
  getTitleFromNotionPageObject,
} from "@/utils";

const ResponsiveGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    [`& > .MuiGrid-item:nth-child(3)`]: {
      display: "none",
    },
  },

  [theme.breakpoints.down("sm")]: {
    [`& > .MuiGrid-item:nth-child(2)`]: {
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

  const pages = useFetchNotionDatabasePages({
    tags: [],
    databaseId: NOTION.DEV_LOG_DATABASE.ID,
    datePropertyName: NOTION.DEV_LOG_DATABASE.PROPERTY.DATE,
    hiddenChkBoxPropertyName: NOTION.DEV_LOG_DATABASE.PROPERTY.CHECKBOX,
    tagPropertyName: NOTION.DEV_LOG_DATABASE.PROPERTY.MULTI_SELECT,
  });

  if (!pages) {
    return (
      <ResponsiveGrid container xs={12} sx={{ width: "100%" }} spacing={2}>
        {Array(3)
          .fill(null)
          .map((_, i) => {
            return (
              <Grid item xs={12} sm={5.25} md={3.5} key={i}>
                <FullSizeSkeleton sx={{ height: "280px" }} />
              </Grid>
            );
          })}

        <Grid item xs={12} sm={1.5} md={1.5}>
          <FullSizeSkeleton sx={{ height: "280px" }} />
        </Grid>
      </ResponsiveGrid>
    );
  }

  return (
    <ResponsiveGrid container xs={12} sx={{ width: "100%" }} spacing={2}>
      {pages.slice(0, 3).map(({ id, properties, cover, icon }) => {
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
          router.push(`/dev-log/${id}`);
        };

        return (
          <Grid item xs={12} sm={5.25} md={3.5} key={id}>
            <NotionPageCard
              title={title}
              imageUrl={imageUrl}
              iconUrl={iconUrl}
              date={createDate}
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
                  개발일지 더보기
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
