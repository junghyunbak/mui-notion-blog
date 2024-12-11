"use client";

import { GoBackButton } from "@/components/widget/GoBackButton";
import { Box, Paper, Stack } from "@mui/material";
import { NotionAPI } from "notion-client";
import { NotionRenderer } from "react-notion-x";
import { Code } from "react-notion-x/build/third-party/code";
import { Collection } from "react-notion-x/build/third-party/collection";

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism.css";

interface NotionPageContentProps {
  recordMap: Awaited<ReturnType<InstanceType<typeof NotionAPI>["getPage"]>>;
}

export function NotionPageContent({ recordMap }: NotionPageContentProps) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack
        spacing={1}
        sx={{
          width: "100%",
          maxWidth: "720px",
        }}
      >
        <GoBackButton />
        <Paper
          sx={{
            maxWidth: "100%",
            boxShadow: "rgba(223, 226, 231, 0.6) 0px 4px 8px",
            overflow: "hidden",
          }}
          variant="outlined"
        >
          <NotionRenderer
            fullPage
            recordMap={recordMap}
            components={{ Code, Collection }}
          />
        </Paper>
      </Stack>
    </Box>
  );
}
