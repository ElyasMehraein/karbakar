import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import YourReq from './indexDatas/YourReq';

export default function AccessibleTabs1() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where selection follows focus"
        selectionFollowsFocus
      >
        <Tab label="Item One" >
        <YourReq />
        </Tab>
        <Tab label="Item Two">
            Typography
        </Tab>
        
        <Tab label="Item Three" />
      </Tabs>
    </Box>
  );
}
