"use client";

import { FullSizeSkeleton } from "@/components/core/FullSizeSkeleton";
import { GradientPaper } from "@/components/core/GradientPaper";
import { SnippetCard } from "@/components/widget/SnippetCard";
import { NOTION } from "@/constants";
import { useFetchNotionDatabasePages } from "@/hooks";
import {
  getImageUrlFromNotionPageObject,
  getTagsFromNotionPageObject,
  getTitleFromNotionPageObject,
} from "@/utils";
import { ExpandMore } from "@mui/icons-material";
import {
  CardActionArea,
  Grid,
  Typography,
  colors,
  Box,
  styled,
} from "@mui/material";
import { useRouter } from "next/navigation";

const ResponsiveGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
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

export function SnippetPreview() {
  const router = useRouter();

  const pages = useFetchNotionDatabasePages({
    tags: [],
    databaseId: NOTION.SNIPPET_DATABASE.ID,
    tagPropertyName: NOTION.SNIPPET_DATABASE.PROPERTY.MULTI_SELECT,
    hiddenChkBoxPropertyName: NOTION.SNIPPET_DATABASE.PROPERTY.CHECKBOX,
  });

  if (!pages) {
    return (
      <ResponsiveGrid container spacing={2}>
        {Array(2)
          .fill(null)
          .map((_, i) => {
            return (
              <Grid item key={i} xs={12} sm={10.5} md={5.25}>
                <FullSizeSkeleton sx={{ minHeight: "100px" }} />
              </Grid>
            );
          })}

        <Grid item xs={12} sm={1.5} md={1.5}>
          <FullSizeSkeleton
            sx={{
              minHeight: "100px",
            }}
          />
        </Grid>
      </ResponsiveGrid>
    );
  }

  return (
    <ResponsiveGrid container spacing={2} xs={12} width="100%">
      {pages.slice(0, 2).map(({ id, properties, cover }) => {
        const title = getTitleFromNotionPageObject(
          properties[NOTION.SNIPPET_DATABASE.PROPERTY.TITLE]
        );

        const imageUrl = getImageUrlFromNotionPageObject(cover);
        const tags = getTagsFromNotionPageObject(
          properties[NOTION.SNIPPET_DATABASE.PROPERTY.MULTI_SELECT]
        );

        const handleCardClick = () => {
          // [ ]: snippet 전용 페이지 혹은 모달을 만들기 전 까지 /dev-log/[id] 페이지를 사용
          router.push(`/dev-log/${id}`);
        };

        return (
          <Grid item key={id} xs={12} sm={10.5} md={5.25}>
            <SnippetCard
              title={title}
              imageUrl={imageUrl}
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
            height: "100%",
            minHeight: "100px",
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
              router.push("/snippet");
            }}
          >
            {
              <MobileBox>
                <Typography
                  variant="body2"
                  sx={{ color: "#303741", fontWeight: "bold" }}
                >
                  SNIPPET 더보기
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
