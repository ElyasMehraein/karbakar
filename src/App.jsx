import * as React from 'react';
import Wellcome from "./pages/Wellcome/Wellcome";
import ProfileCollected from './pages/Profile/ProfileCollected';
import IndexCollected from "./pages/index/IndexCollected"
import { ThemeProvider } from '@mui/material';
import theme from './theme';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <IndexCollected />
    </ThemeProvider>
  );
}


export default App;
