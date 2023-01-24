import * as React from 'react';
import PrimarySearchAppBar from "./pages/index/PrimarySearchAppBar";
import Wellcome from "./pages/Wellcome/Wellcome";
import TabPanel from "./pages/index/TabPanel";

// import PrimarySearchAppBar from "./pages/index/PrimarySearchAppBar"
// import TabPanel from "./pages/index/TabPanel"


function App() {
  return (
    // <Wellcome></Wellcome>
    <div>

      <PrimarySearchAppBar></PrimarySearchAppBar>
      <TabPanel></TabPanel>
    </div>
  );
}

export default App;
