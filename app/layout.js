import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, Typography } from "@mui/material";

import theme from "@/styles/theme";
import "./global.css";

export const metadata = {
  keywords:"کارباکار, مبادله, اقتصاد اجتماعی, اقتصاد غیر پولی, راه اندازی کسب و کار, اقتصاد غیر متمرکز , لیبرالیسم ,کمونیسم , آنارشیسم,آزادی ,اقتصاد غیر دولتی , اقتصاد دیجیتال ,اقتصاد آزاد ,بازار آزاد ,اقتصاد ضد انحصار, اقتصاد ضد دلالی ,اقتصاد بدون ربا,اقتصاد بدون سود"
}
export default function RootLayout({ children }) {

  return (
    <html lang="fa" dir="rtl">
      <head>
        <title>کارباکار</title>
        <meta
          name="description"
          content="اقتصاد اجتماعی غیر پولی برای مبادله بدون واسطه محصولات و خدمات افراد و کسب و کارهای مولد"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Typography className="inMiddle" sx={{ color: "red" }}>
            این سایت در مرحله تست قرار دارد
          </Typography>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
