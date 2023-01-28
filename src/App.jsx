import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Pages
import Wellcome from "./pages/Wellcome/Wellcome";
import NewWellcome from "./pages/Wellcome/NewWellcome";
import Profile from './pages/Profile/Profile';
import Index from "./pages/index/Index"



function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route path='/NewWellcome' element={<NewWellcome />} />
          <Route path='/' element={<Wellcome />} />
          <Route path='/index' element={<Index />} />
          <Route path='/Profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
  );
}


export default App;
