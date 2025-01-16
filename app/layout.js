import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, Typography } from "@mui/material";
import Link from "next/link";

import theme from "@/styles/theme";
import "./global.css";
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
          <Typography p={4} fontSize={12} fontWeight="bold" className="inMiddle">
            <Link
              href="/rules"
              style={{ textDecoration: "none" }}
            >
              قوانین و مقررات پلتفرم کارباکار
            </Link>
          </Typography>
        </ThemeProvider>
      </body>
    </html>
  );
}
