import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import { ReactQueryProvider } from "./_components/ReactQueryProvider";
import { Header } from "./_components/Header";
import { Container, Box } from "@mui/material";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "#F1F7FC" }}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />

            <ReactQueryProvider>
              <React.Suspense>
                <Header />
                <Container maxWidth="lg">
                  <Box
                    sx={{
                      my: 4,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {props.children}
                  </Box>
                </Container>
              </React.Suspense>
            </ReactQueryProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
