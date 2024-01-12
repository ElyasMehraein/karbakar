"use client"
import "@/fonts/global.css"
import { createTheme } from '@mui/material/styles';

import localFont from "next/font/local"
const iranyekan = localFont({
  src: [
    {
      path: '/fonts/woff/iranyekanwebbold.woff',
      weight: 'bold',
      style: 'bold',
    },
    {
      path: '/fonts/woff/iranyekanwebblack.woff',
      weight: '950',
      style: 'black',
    },
    {
      path: '/fonts/woff/iranyekanwebextrablack.woff',
      weight: '900',
      style: 'extrablack',
    },
    {
      path: '/fonts/woff/iranyekanwebextrabold.woff',
      weight: '800',
      style: 'extrabold',
    },
    {
      path: '/fonts/woff/iranyekanweblight.woff',
      weight: '500',
      style: 'light',
    },
    {
      path: '/fonts/woff/iranyekanwebmedium.woff',
      weight: 'normal',
      style: 'medium',
    },
    {
      path: '/fonts/woff/iranyekanwebregular.woff',
      weight: '300',
      style: 'regular',
    },
    {
      path: '/fonts/woff/iranyekanwebthin.woff',
      weight: '100',
      style: 'thin',
    },

  ],
});

// import iranyekanwebbold from          '@/fonts/woff/iranyekanwebbold.woff';
// import iranyekanwebblack from          '@/fonts/woff/iranyekanwebblack.woff';
// import iranyekanwebextrablack from      '@/fonts/woff/iranyekanwebextrablack.woff';
// import iranyekanwebextrabold from       '@/fonts/woff/iranyekanwebextrabold.woff';
// import iranyekanweblight from           '@/fonts/woff/iranyekanweblight.woff';
// import iranyekanwebmedium from           '@/fonts/woff/iranyekanwebmedium.woff';
// import iranyekanwebregular from          '@/fonts/woff/iranyekanwebregular.woff';
// import iranyekanwebthin from           '@/fonts/woff/iranyekanwebthin.woff';

// const DanaDemiBold = localFont({ src: "./fonts/DanaFaNum-DemiBold.woff2", variable: '--font-DanaDemiBold' })
// const DanaMedium = localFont({ src: './fonts/DanaFaNum-Medium.woff2', variable: '--font-DanaMedium' })
// const DanaRegular = localFont({ src: "./fonts/DanaFaNum-Regular.woff2", variable: '--font-DanaRegular' })

// const MorabbaBold = localFont({ src: './fonts/Morabba-Bold.woff2', variable: '--font-MorabbaBold' })
// const MorabbaLight = localFont({ src: './fonts/Morabba-Light.woff2', variable: '--font-MorabbaLight' })
// const MorabbaMedium = localFont({ src: './fonts/Morabba-Medium.woff2', variable: '--font-MorabbaMedium' })

const theme = createTheme({
  direction: 'rtl',
  shadows: Array(25).fill('none'),
  typography: {
    fontFamily: 'iranyekan, Arial',
  },
  // components: {
  //   MuiCssBaseline: {
  //     styleOverrides: `
  //        @font-face {
  //         font-family: iranyekan;
  //         font-style: normal;
  //         font-weight: bold;
  //         src: url(${iranyekanwebbold.woff}) format('woff');
  //       }
  //       @font-face {
  //         font - family: iranyekan;
  //         font - style: normal;
  //         font - weight: 950;
  //         src: url(${iranyekanwebextrablack.woff}) format('woff');
  //       }
  //       @font-face {
  //         font - family: iranyekan;
  //         font - style: normal;
  //         font - weight: 900;
  //         src: url(${iranyekanwebblack.woff}) format('woff');
  //       }
  //       @font-face {
  //         font - family: iranyekan;
  //         font - style: normal;
  //         font - weight: 800;
  //         src: url(${iranyekanwebextrabold.woff}) format('woff');
  //       }
  //       @font-face {
  //         font - family: iranyekan;
  //         font - style: normal;
  //         font - weight: 500;
  //         src: url(${iranyekanwebmedium.woff}) format('woff');
  //       }
  //       @font-face {
  //         font - family: iranyekan;
  //         font - style: normal;
  //         font - weight: normal;
  //         src: url(${iranyekanwebregular.woff}) format('woff');
  //       }
  //       @font-face {
  //         font - family: iranyekan;
  //         font - style: normal;
  //         font - weight: 300;
  //         src: url(${iranyekanweblight.woff}) format('woff');
  //       }
  //       @font-face {
  //         font - family: iranyekan;
  //         font - style: normal;
  //         font - weight: 100;
  //         src: url(${iranyekanwebthin.woff}) format('woff');
  //       }
  //     `,
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [iranyekan],
      },
    },
  },
},
  // },
// }
);

export default theme