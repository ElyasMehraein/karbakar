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
  console.log(user);
  const router = useRouter()
  const goToBusiness = () => {
    router.replace(`/${brand(props)}`)
  }
  const theme = useTheme();

  const signOut = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.status === 200) {
      router.push("/welcome");
    }
  }
  return (
    <Box sx={{ display: 'flex' }}>
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
          {user.businesses.map(
            (business) => {
              const isAgent = (user.code == business.agentCode)
              return (
                  <ListItem
                    key={business._id}
                    sx={{ color: "inherit", mt: 0 }}
                  >
                    <ListItemAvatar>
                      {/* <Avatar alt="Remy Sharp" src={businessavatar} /> */}
                    </ListItemAvatar>
                    <ListItemText
                      align="right"
                      primary={business.businessName}
                      secondary={isAgent?"کسب و کار اصلی":"کسب و کار فرعی"}
                      onClick={goToBusiness}
                    />
                  </ListItem>
                )
            }
          )}

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
          onClick={signOut} color="error" endIcon={<LogoutIcon />}>
          خروج از سایت
        </Button>
      </Drawer>
    </Box>
  );
}
