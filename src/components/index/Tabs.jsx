"use client"
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OthersRequest from './indexDatas/OthersRequest';
import OthersRequestFrames from './indexDatas/OthersRequestFrames';
import YourReq from './indexDatas/YourReq';
import Bill from './indexDatas/Bill';

import {mainTabYourReqText} from "@/../public/typoRepo.jsx"

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

export default function BasicTabs() {
  

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box bgcolor="primary.main" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          TabIndicatorProps={{ sx: { height: "5px !important", } }}
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
      </Box>
      <CustomTabPanel children={mainTabYourReqText}  value={0} index={0}>
        {/*  */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/* <OthersRequest/> */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {/* <Bill/> */}
      </CustomTabPanel>
    </Box>
  );
}
