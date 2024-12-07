"use client";

import { Box, Button, Paper } from "@mui/material";
import { NotionAPI } from "notion-client";
import { NotionRenderer } from "react-notion-x";
import { Code } from "react-notion-x/build/third-party/code";
import { Collection } from "react-notion-x/build/third-party/collection";
import { ChevronLeft } from "@mui/icons-material";
import { useRouter } from "next/navigation";

import "react-notion-x/src/styles.css";

interface DetailContentsProps {
  recordMap: Awaited<ReturnType<InstanceType<typeof NotionAPI>["getPage"]>>;
}

export function DetailContents({ recordMap }: DetailContentsProps) {
  const router = useRouter();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "720px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "start",
        }}
      >
        <Button
          startIcon={<ChevronLeft />}
          onClick={() => {
            router.back();
          }}
        >
          뒤로 가기
        </Button>
      </Box>

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
    </Box>
  );
}
