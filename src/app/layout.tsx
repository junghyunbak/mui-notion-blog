import * as React from "react";
import { type Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Stack } from "@mui/material";
import { ReactQueryProvider } from "./_components/ReactQueryProvider";
import { Header } from "./_components/Header";
import theme from "@/theme";

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
              <React.Suspense>
                <Header />
                <Container maxWidth="lg">
                  <Stack sx={{ my: 4 }}>{props.children}</Stack>
                </Container>
              </React.Suspense>
            </ReactQueryProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
