import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import OthersRequest from './indexDatas/OthersRequest';
// import OthersRequestFrames from './indexDatas/OthersRequestFrames';
import YourReq from './indexDatas/YourReq';
import Bill from './indexDatas/Bill';
import Divider from "@mui/material/Divider";

import { mainTabYourReqText } from "@/components/typoRepo.jsx"
import { Container } from '@mui/material';
import { useState, useEffect } from 'react'


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({user}) {

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true)
  }, [])

  return (mounted &&
    <Box  sx={{ width: '100%' }}>
      <Box  bgcolor="primary.main" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container >
          <Tabs
            TabIndicatorProps={{ sx: { height: "4px !important", } }}
            indicatorColor="secondary"
            sx={{ color: "white" }}
            textColor="inherit"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            
          >
            <Tab label="درخواستهای شما" {...a11yProps(0)} />
            <Tab label="درخواستهای دیگران" {...a11yProps(1)} />
            <Tab label="صورتحساب" {...a11yProps(2)} />
          </Tabs>
        </Container>
      </Box>
      <Container >
        <CustomTabPanel value={value} index={0} />
        {/* {mainTabYourReqText} */}
        {/* <YourReq /> */}
        <CustomTabPanel value={value} index={1} />
        {/* <OthersRequest/> */}
        <CustomTabPanel value={value} index={2} />
        <Bill user={user}/>
      </Container>
    </Box>
  );
}
