import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import businessavatar from "../../assets/businessAvatar.jpg";
import businessavatar2 from "../../assets/businessAvatar2.jpg";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import BusinessIcon from "@mui/icons-material/Business";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import DomainDisabledIcon from "@mui/icons-material/DomainDisabled";
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import MuiAppBar from '@mui/material/AppBar';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
    /**
     * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
     * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
     * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
     * proper interaction with the underlying content.
     */
    position: 'relative',
  }),
);
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function PersistentDrawerRight() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        PaperProps={{ style: { left: "unset", right: 0 } }}

        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography fontWeight="bold" align="right" marginRight={2}>
          کسب و کارهای من
        </Typography>
        <List>
          <ListItem
            sx={{ color: "inherit", mt: 0 }}
            // component={Link}
            to="/business"
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={businessavatar} />
            </ListItemAvatar>
            <ListItemText
              align="right"
              primary="تعمیرگاه استاد جلال"
              secondary="کسب و کار اصلی"
            />
          </ListItem>
          <ListItem
            sx={{ color: "inherit", mt: 0 }}
            // component={Link}
            to="/business"
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={businessavatar2} />
            </ListItemAvatar>
            <ListItemText align="right" primary="کشاورزی جلال" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AddBusinessIcon />
              </ListItemIcon>
              <ListItemText
                sx={{ textAlign: "right" }}
                dir="rtl"
                primary="ایجاد کسب و کار جدید"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DomainDisabledIcon />
              </ListItemIcon>
              <ListItemText
                sx={{ textAlign: "right" }}
                primary="استعفا از کسب و کار"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText
                sx={{ textAlign: "right" }}
                primary="لیست تمام کسب و کارها"
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <Button
          // component={Link} 
          to="/" color="error" endIcon={<LogoutIcon />}>
          خروج از سایت
        </Button>
      </Drawer>
    </Box>
  );
}
