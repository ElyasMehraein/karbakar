import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Bill from './Bills/Bill';
import theme from '@/styles/theme';
import { Container, Typography } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { cyan, green } from '@mui/material/colors';
import CreateBill from './Bills/CreateBill';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OthersRequestForGusts from './Requests/OthersRequestForGusts';
import FirstTab from './FirstTab/FirstTab';
import FirstTabFab from './FirstTab/FirstTabFab';
import SecondTab from './SecondTab/SecondTab';
import SecondTabFab from './SecondTab/SecondTabFab';
import ThirdTab from './ThirdTab/ThirdTab';
import ThirdTabFab from './ThirdTab/ThirdTabFab';

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
      <Box sx={{ py: 3 }}>
        {children}
      </Box>
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
  const FirstTabFabDynamicIcon = fabIndex == value ? <ArrowBackIcon /> : <AddIcon />
  const FirstTabFabDynamicText = fabIndex == value ? "بازگشت" : "اعلام نیاز"
  const SecondTabFabDynamicIcon = fabIndex == value ? <ArrowBackIcon /> : <EditIcon />
  const SecondTabFabDynamicText = fabIndex == value ? "بازگشت" : "تغییر ظرفیت تولید"
  // const ThirdTabFabDynamicIcon = fabIndex == value ? <ArrowBackIcon /> : <AddIcon />
  // const ThirdTabFabDynamicText = fabIndex == value ? "بازگشت" : "تشکیل اتحاد"
  const ReportFabDynamicIcon = fabIndex == value ? <ArrowBackIcon /> : <EditIcon />
  const ReportFabDynamicText = fabIndex == value ? "بازگشت به صورتحساب" : "ایجاد صورتحساب"

  const fabHandler = () => {
    fabIndex == value ?
      setFabIndex(10) :
      setFabIndex(value);


  };
  const fabs = [
    {
      color: 'primary',
      sx: fabStyle,
      icon: FirstTabFabDynamicIcon,
      label: 'Add',
      children: FirstTabFabDynamicText,
    },
    {
      color: 'secondary',
      sx: fabStyle,
      icon: SecondTabFabDynamicIcon,
      label: 'Edit',
      children: SecondTabFabDynamicText,
    },
    // {
    //   color: 'success',
    //   sx: fabStyle,
    //   icon: ThirdTabFabDynamicIcon,
    //   label: 'Expand',
    //   children: ThirdTabFabDynamicText
    // },
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
          {user?.businesses[0] ?
            <Tabs
              TabIndicatorProps={{ sx: { height: "4px !important", } }}
              indicatorColor="secondary"
              sx={{ color: "white" }}
              textColor="inherit"
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >

              <Tab label="دریافت" {...a11yProps(0)} />
              <Tab label="ارائه" {...a11yProps(1)} />
              {/* <Tab label="اتحاد" {...a11yProps(2)} /> */}
              <Tab label="صورتحساب" {...a11yProps(3)} />
            </Tabs>
            :
            <Tabs
              TabIndicatorProps={{ sx: { height: "4px !important", } }}
              indicatorColor="secondary"
              sx={{ color: "white" }}
              textColor="inherit"
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="بازار" {...a11yProps(1)} />
            </Tabs>
          }
        </Container>
      </Box>
      <Container sx={{ position: "relative", height: "80%" }}>
        <CustomTabPanel value={value} index={0} dir={theme.direction}>
          {user && user.businesses[0] ?
            fabIndex !== value ?
              <FirstTab user={user} distinctGuilds={distinctGuilds} />
              :
              <FirstTabFab user={user} />
            :
            <OthersRequestForGusts />
          }
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1} dir={theme.direction}>
          {
            fabIndex !== value ?
              <SecondTab />
              :
              <SecondTabFab {...{ user }} />
          }
        </CustomTabPanel>
        {/* <CustomTabPanel value={value} index={2} dir={theme.direction}>
          {
            fabIndex !== value ?
              <ThirdTab />
              :
              <ThirdTabFab {...{ user }} />
          }

        </CustomTabPanel> */}
        <CustomTabPanel value={value} index={3} dir={theme.direction}>
          {
            fabIndex === 3 ?
              <CreateBill user={user} fabHandler={fabHandler} />
              :
              <Bill bills={bills} user={user} />
          }
        </CustomTabPanel>


        {user?.businesses[0] &&
          fabs.map((fab, index) => (
            <Zoom
              key={index}
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
          ))
        }
      </Container>
    </Box>
  );
}
