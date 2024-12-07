"use client";

import { useQuery } from "@tanstack/react-query";
import { Paper, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { Chip } from "./Chip";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export function Filter() {
  const { data } = useQuery({
    queryKey: ["filter"],
    queryFn: async () => {
      const {
        data: {
          data: { tags },
        },
      } = await axios.get<ResponseData["/api/dev-log/tag"]>("/api/dev-log/tag");

      return tags;
    },
  });

  if (!data) {
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
      {data.map(([tagName]) => {
        return (
          <ListItem key={tagName}>
            <Chip tagName={tagName} />
          </ListItem>
        );
      })}
    </Paper>
  );
}
