import { createTheme } from '@mui/material';
const theme = createTheme({

  shadows: Array(25).fill('none'),
  typography: {
    // subtitle2: {
    //   fontSize: [30, "!important"]
    // },
    fontFamily: ["iranyekan"].join(",")
  }

})

export default theme