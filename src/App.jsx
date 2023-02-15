import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import theme from './theme';
// Pages
import Wellcome from "./pages/Wellcome/Wellcome";
import Profile from './pages/Profile/Profile';
import Index from "./pages/index/Index"
import Business from "./pages/business/business"
import CssBaseline from '@mui/material/CssBaseline';
import SignUpIn from "./pages/Entering/SignUpIn"


function App() {
  return (
    <ThemeProvider theme={theme}>

      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<Wellcome />} />
          <Route path='/SignUpIn' element={<SignUpIn />} />
          <Route path='/index' element={<Index />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/business' element={<Business />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}


export default App;
