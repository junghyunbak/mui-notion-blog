import * as React from "react";
import { type Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container, Stack } from "@mui/material";
import { ReactQueryProvider } from "./_components/ReactQueryProvider";
import { Header } from "./_components/Header";
import theme from "@/theme";
import { GlobalLayout } from "./_components/GlobalLayout";

export function generateMetadata(): Metadata {
  return {
    verification: {
      google: "lL9UfMha41UHALGoZyPh8uqUDknzocPrz-OEtP2-gSg",
    },
  };
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "#F1F7FC" }}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ReactQueryProvider>
              <GlobalLayout>
                <Header />
                <Container maxWidth="lg">
                  <React.Suspense>
                    <Stack sx={{ my: 4 }}>{props.children}</Stack>
                  </React.Suspense>
                </Container>
              </GlobalLayout>
              <Box
                sx={{
                  width: "100%",
                  height: "300px",
                  background: "white",
                  borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                }}
              />
            </ReactQueryProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
