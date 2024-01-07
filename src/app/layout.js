import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import localFont from 'next/font/local'
export const metadata = {
  title: 'کارباکار',
  description: 'اقتصاد اجتماعی غیر پولی برای مبادله بدون واسطه محصولات و خدمات افراد و کسب و کارهای مولد',
}
import { ThemeProvider } from '@mui/material';
import theme from '../theme';

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir='rtl'>
      <body>
        <ThemeProvider theme={theme}>
          <AppRouterCacheProvider>
            {children}
          </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
