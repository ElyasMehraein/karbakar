import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import OthersRequest from './indexDatas/OthersRequest';
// import OthersRequestFrames from './indexDatas/OthersRequestFrames';
// import YourReq from './indexDatas/YourReq';
import Bill from './indexDatas/Bill';
import Divider from "@mui/material/Divider";
import theme from '@/styles/theme';
import { mainTabYourReqText } from "@/components/typoRepo.jsx"
import { Container } from '@mui/material';
import { useState, useEffect } from 'react'
import { Accordion, AccordionDetails, Chip } from "@mui/material";
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { blue, green } from '@mui/material/colors';
import CreateBill from './indexDatas/CreateBill';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import YourReq from './indexDatas/YourReq';
import CreateRequest from './Requests/CreateRequest';
import VaseTest from './Requests/VaseTest';


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
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </Box>
  );
}
const fabStyle = {
  position: "fixed",
  bottom: 16,
  // right: 16,

};

const fabGreenStyle = {
  color: 'common.black',
  bgcolor: green[300],
  '&:hover': {
    bgcolor: green[600],
  },
};
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

export default function BasicTabs({ user, bills, distinctGuilds }) {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  const [fabIndex, setFabIndex] = React.useState(10);

  const ReportFabDynamicIcon = fabIndex == value ? <ArrowBackIcon /> : <EditIcon />
  const ReportFabDynamicText = fabIndex == value ? "بازگشت به صورتحساب" : "ایجاد صورتحساب"
  const RequestFabDynamicIcon = fabIndex == value ? <ArrowBackIcon /> : <EditIcon />
  const RequestFabDynamicText = fabIndex == value ? "بازگشت به درخواست ها" : "ایجاد درخواست جدید"

  const fabHandler = () => {
    fabIndex == value ?
      setFabIndex(10) :
      setFabIndex(value);


  };
  const fabs = [
    {
      color: 'primary',
      sx: fabStyle,
      icon: RequestFabDynamicIcon,
      label: 'Add',
      children: RequestFabDynamicText,
    },
    {
      color: 'secondary',
      sx: fabStyle,
      icon: <EditIcon />,
      label: 'Edit',
    },
    {
      color: 'inherit',
      sx: { ...fabStyle, ...fabGreenStyle },
      icon: ReportFabDynamicIcon,
      label: 'Expand',
      children: ReportFabDynamicText
    },
  ];
  return (
    <Box sx={{ width: '100%', height: "100vh" }}>
      <Box bgcolor="primary.main" sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
            {user && <Tab label="درخواستهای شما" {...a11yProps(0)} />}
            <Tab label="درخواستهای دیگران" {...a11yProps(1)} />
            {user && <Tab label="صورتحساب" {...a11yProps(2)} />}
          </Tabs>
        </Container>
      </Box>
      <Container sx={{ position: "relative", height: "80%" }}>
        <CustomTabPanel value={value} index={0} dir={theme.direction}>
          {
            fabIndex === 0 ?
              <CreateRequest {...{ fabHandler, user, distinctGuilds }} />
              // <VaseTest user={user} distinctGuilds={distinctGuilds} />
              :
              <YourReq distinctGuilds={distinctGuilds} />
          }
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1} dir={theme.direction}>
          {/* <OthersRequest/>*/}
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2} dir={theme.direction}>
          {
            fabIndex === 2 ?
              <CreateBill user={user} />
              :
              <Bill bills={bills} user={user} />
          }
        </CustomTabPanel>


        {user?.businesses[0] && fabs.map((fab, index) => (
          value !== 1 &&
          <Zoom
            key={fab.color}
            in={value === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
            onClick={fabHandler}
          >
            <Fab variant="extended" size="medium" sx={fab.sx} aria-label={fab.label} color={fab.color}>
              {fab.children}
              {fab.icon}
            </Fab>
          </Zoom>
        ))}
      </Container>
    </Box>
  );
}
