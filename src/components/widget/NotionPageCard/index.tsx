"use client";

import { GradientCard } from "@/components/core/GradientCard";
import {
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface NotionPageCardProps {
  id: string;
  imageUrl: string;
  iconUrl: null | string;
  title: string;
  tags: string[];
  date: Date;
}

export function NotionPageCard({
  id,
  imageUrl,
  iconUrl,
  title,
  date,
  tags,
}: NotionPageCardProps) {
  const router = useRouter();

  return (
    <GradientCard>
      <CardActionArea
        onClick={() => {
          router.push(`/dev-log-detail/${id}`);
        }}
      >
        <CardMedia image={imageUrl} sx={{ height: 140, position: "relative" }}>
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
            {tags.map((tag, i) => (
              <Chip key={i} label={tag} size="small" />
            ))}
          </Box>
        </CardContent>
      </CardActionArea>
    </GradientCard>
  );
}
