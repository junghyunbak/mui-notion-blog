import * as React from "react";
import { type Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, colors, Container, Stack } from "@mui/material";
import { ReactQueryProvider } from "./_components/ReactQueryProvider";
import { Header } from "./_components/Header";
import theme from "@/theme";
import { Footer } from "./_components/Footer";

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
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ReactQueryProvider>
              <Header />
              <Box
                sx={{
                  width: "100%",
                  minHeight: "100vh",
                  background: `radial-gradient(farthest-corner circle at 0% 0%, ${colors.grey["50"]} 0%, ${colors.blue["50"]} 100%)`,
                }}
              >
                <Container maxWidth="lg">
                  <React.Suspense>
                    <Stack sx={{ py: 5 }}>{props.children}</Stack>
                  </React.Suspense>
                </Container>
              </Box>
              <Footer />
            </ReactQueryProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
