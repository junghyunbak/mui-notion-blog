"use client";

import { Box, Paper, Stack } from "@mui/material";
import { NotionAPI } from "notion-client";
import { NotionRenderer } from "react-notion-x";
import { Code } from "react-notion-x/build/third-party/code";
import { Collection } from "react-notion-x/build/third-party/collection";
import Giscus from "@giscus/react";

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

          <Box sx={{ padding: "0 16px 16px 16px" }}>
            <Giscus
              id="comments"
              repo="junghyunbak/junghyunbak.github.io"
              repoId="R_kgDOHfRlRA"
              category="Announcements"
              categoryId="DIC_kwDOHfRlRM4Cokhh"
              mapping="pathname"
              strict="0"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="bottom"
              theme="preferred_color_scheme"
              lang="ko"
              loading="lazy"
            />
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
}
