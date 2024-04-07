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
import PrimeJobSelect from './PrimeJobSelect';


const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
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
        <Typography fontWeight="bold" align="right" sx={{ mb: 4 }} marginRight={2}>
          کسب و کارهای من
        </Typography>
        {
          user?.businesses[0] &&
          <List sx={{ m: 0, p: 0 }}>
            <>
              <Divider sx={{ fontWeight: "light", fontSize: 12, }} textAlign="center">کسب و کار اصلی</Divider>
            </>
            {user.businesses.map((business) => (
              user.primeJob === business._id && (
                <React.Fragment key={business._id} >
                  <ListItemButton sx={{ m: 0, p: 0 }} onClick={() => router.push(`/${business.businessName}`)}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ width: 40, height: 40 }}>
                          <ItsAvatar userCodeOrBusinessBrand={business.businessName} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText align="right" primary={business.businessName} secondary={business.businessBrand} sx={{ m: 0 }} />
                    </ListItem>
                  </ListItemButton>
                  <PrimeJobSelect user={user} />
                </React.Fragment>
              )))}
            <Divider sx={{ fontWeight: "light", fontSize: 12, }} textAlign="center">کسب و کار های فرعی</Divider>
            {user.businesses.map((business) => (
              user.primeJob !== business._id && (
                <React.Fragment key={business._id}>
                  <ListItemButton sx={{ m: 0, p: 0 }} onClick={() => router.push(`/${business.businessName}`)}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ width: 40, height: 40 }}>
                          <ItsAvatar userCodeOrBusinessBrand={business.businessName} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText align="right" primary={business.businessName} secondary={business.businessBrand} sx={{ m: 0 }} />
                    </ListItem>
                  </ListItemButton>
                </React.Fragment>
              )))}
          </List>
        }
        <Divider />

        {user &&
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
                  type="button"
                  onClick={() => router.push("/CreateBusiness")}
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
          </List>
        }
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
    </Box >
  );
}
