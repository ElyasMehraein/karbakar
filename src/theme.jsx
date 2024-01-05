"use client"


import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  direction: 'rtl',
  shadows: Array(25).fill('none'),
  typography: {
      fontFamily: ["iranyekan"].join(",")
  }

})

export default theme