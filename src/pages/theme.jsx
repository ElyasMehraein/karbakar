import { Palette } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material';
import { green, purple } from '@mui/material/colors';
const theme = createTheme({
  shadows: "none",
  Palette:{
    common:{
      arcBlue:"#0B7289",
      arcOrange: "#FFBA60"
    }
    
  }
})

export default theme