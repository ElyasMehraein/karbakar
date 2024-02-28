import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import theme from '@/styles/theme';
import './global.css'
export default function RootLayout({ children }) {
    return (
        <html lang="fa" dir='rtl'>
            <head>
                <title>کارباکار</title>
                <meta name="description" content="اقتصاد اجتماعی غیر پولی برای مبادله بدون واسطه محصولات و خدمات افراد و کسب و کارهای مولد" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AppRouterCacheProvider>
                        {children}
                    </AppRouterCacheProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}