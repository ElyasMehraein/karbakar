"use client"
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import BusinessIcon from "@mui/icons-material/Business";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import DomainDisabledIcon from "@mui/icons-material/DomainDisabled";
import { useRouter } from 'next/navigation';
import ItsAvatar from "@/components/modules/ItsAvatar"
import { Avatar } from '@mui/material';


const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function DrawerRight({ user, open, handleDrawerClose }) {
  const router = useRouter()
  const theme = useTheme();

  const signOut = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.status === 200) {
      router.push("/welcome");
    } else {
      console.log("res", res);
    }
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth },
        }}
        PaperProps={{ style: { left: "unset", right: 0 } }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (<ChevronLeftIcon />) : (<ChevronRightIcon />)}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {user?.businesses[0] ?
          <Typography fontWeight="bold" align="right" marginRight={2}>
            کسب و کارهای من
          </Typography> : ""}
        {user?.businesses.map((business) => {
          return (<List key={business._id}>
            <ListItem sx={{ color: "inherit", mt: 0 }} >
              <ListItemButton onClick={() => router.push(`/${business.businessName}`)}>
                <ListItemAvatar>
                  <Avatar sx={{ width: 40, height: 40 }} >
                    <ItsAvatar userCodeOrBusinessBrand={business.businessName} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText align="right" primary={business.businessName} />
              </ListItemButton>
            </ListItem>
          </List>)
        })}
        <Divider />
        <List>
          {user && <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AddBusinessIcon />
              </ListItemIcon>
              <ListItemText
                sx={{ textAlign: "right" }}
                dir="rtl"
                primary="ایجاد کسب و کار جدید"
                type="button"
                onClick={() => router.push("/CreateBusiness")}
              />

            </ListItemButton>
          </ListItem>}
          {user && <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DomainDisabledIcon />
              </ListItemIcon>
              <ListItemText
                sx={{ textAlign: "right" }}
                primary="استعفا از کسب و کار"
              />
            </ListItemButton>
          </ListItem>}
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
        {user ?
          <Button
            sx={{ direction: "ltr" }} onClick={signOut} color="error" endIcon={<LogoutIcon />}>
            خروج از سایت
          </Button>
          :
          <Button
            sx={{ display: { sm: 'none', xs: 'block' } }}
            onClick={signOut} variant="outlined" color="secondary">
            ورود یا ثبت نام
          </Button>
        }
      </Drawer>
    </Box>
  );
}
