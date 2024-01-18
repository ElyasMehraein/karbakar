import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import CssBaseline from '@mui/material/CssBaseline';
import "@/styles/global.css"

export const metadata = {
  title: 'کارباکار',
  description: 'اقتصاد اجتماعی غیر پولی برای مبادله بدون واسطه محصولات و خدمات افراد و کسب و کارهای مولد',
}
import { ThemeProvider } from '@mui/material';
import theme from '../styles/theme';
// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }


export default function App({ Component, pageProps }) {
  return (
    // <html lang="fa" dir='rtl'>
    //   <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouterCacheProvider>
            <Component {...pageProps} />
          </AppRouterCacheProvider>
        </ThemeProvider>
    //   </body>
    // </html>
  );
}
