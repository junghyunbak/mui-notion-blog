"use client";

import { Paper, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Chip } from "@/components/widget/Chip";
import { NOTION } from "@/constants";
import { useFetchDatabaseTags } from "@/hooks";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export function DevLogFilter() {
  const tags = useFetchDatabaseTags(NOTION.DEV_LOG_DATABASE.ID);

  if (!tags) {
    return (
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          listStyle: "none",
          boxShadow: "rgba(223, 226, 231, 0.6) 0px 4px 8px",
          p: 0.5,
          m: 0,
        }}
        variant="outlined"
        component="ul"
      >
        {Array(5)
          .fill(null)
          .map((_, i) => {
            return (
              <ListItem key={i}>
                <Skeleton
                  width={40}
                  height={32}
                  sx={{ transform: "none", borderRadius: 16 }}
                />
              </ListItem>
            );
          })}
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        boxShadow: "rgba(223, 226, 231, 0.6) 0px 4px 8px",
        p: 0.5,
        m: 0,
      }}
      variant="outlined"
      component="ul"
    >
      {tags.map(([tagName]) => {
        return (
          <ListItem key={tagName}>
            <Chip
              category={NOTION.DEV_LOG_DATABASE.PROPERTY.MULTI_SELECT}
              value={tagName}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}
