import { createTheme } from '@mui/material';
const theme = createTheme({

  shadows: Array(25).fill('none'),
  typography: {
    // subtitle2: {
    //   fontSize: [20, "!important"]
    // },
    fontFamily: ["iranyekan", "Courier New, monospace", "Brush Script MT, Brush Script Std, cursive"].join(",")
  }

})

export default theme