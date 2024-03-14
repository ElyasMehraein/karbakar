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
import theme from '@/styles/theme';
import { mainTabYourReqText } from "@/components/typoRepo.jsx"
import { Container } from '@mui/material';
import { useState, useEffect } from 'react'
import { Accordion, AccordionDetails, Chip } from "@mui/material";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { blue, green } from '@mui/material/colors';

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
          {children}
        </Box>
      )}
    </Box>
  );
}
const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
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

export default function BasicTabs({ user }) {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, [])
  const [expanded, setExpanded] = React.useState(false);
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  const [fabIndex, setFabIndex] = React.useState(10);
  console.log(fabIndex);

  const fabHandler = () => {
    fabIndex == value ?
      setFabIndex(10) :
      setFabIndex(value)
  };
  const fabs = [
    {
      color: 'primary',
      sx: fabStyle,
      icon: <AddIcon />,
      label: 'Add',
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
      icon: <UpIcon />,
      label: 'Expand',
    },
  ];
  return (mounted &&
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
            <Tab label="درخواستهای شما" {...a11yProps(0)} />
            <Tab label="درخواستهای دیگران" {...a11yProps(1)} />
            <Tab label="صورتحساب" {...a11yProps(2)} />
          </Tabs>
        </Container>
      </Box>
      <Container sx={{ position: "relative", height: "80%" }}>
        {/* <CustomTabPanel value={value} index={0} />
        {mainTabYourReqText}
        <YourReq />
        <CustomTabPanel value={value} index={1} />
        <OthersRequest/>
        <CustomTabPanel value={value} index={2} /> */}
        <CustomTabPanel value={value} index={0} dir={theme.direction}>
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2} dir={theme.direction}>
          <Accordion sx={{boxShadow: 0}} expanded={expanded}>
            <Chip
              label="راهنمایی"
              sx={{ direction: 'ltr' }}
              onClick={() => setExpanded(!expanded)}
              icon={<QuestionMarkOutlinedIcon />}
            />
            <AccordionDetails>
              <Typography>
                لحظه ای که محصولات خود را به دیگران تحویل می دهید برایشان فاکتور صادر
                نمایید و از مشتری بخواهید همان لحظه آن را بررسی و تایید نماید
              </Typography>
              <Typography sx={{ my: 2 }} color="error">
                * محصولاتی را که ارائه می نمایید پس از تایید این صورتحساب در صفحه کسب و کار شما به نمایش در می
                آیند
              </Typography>
            </AccordionDetails>
          </Accordion>
          {fabIndex === 2 && <Bill user={user} />}
        </CustomTabPanel>
        {/* <Box sx={}> */}

        {fabs.map((fab, index) => (
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
            <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
              {fab.icon}
            </Fab>
          </Zoom>
        ))}
        {/* </Box> */}
      </Container>
    </Box>
  );
}
