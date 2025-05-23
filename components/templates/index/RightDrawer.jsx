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
import { useRouter } from 'next/navigation';
import ItsAvatar from "@/components/modules/ItsAvatar"
import { Avatar } from '@mui/material';
import PrimeJobSelect from '../../modules/PrimeJobSelect';
import HelpIcon from '@/components/modules/HelpIcon';
import { iconText } from '@/components/typoRepo';
import Resignation from '@/components/modules/Resignation';
import Backdrop from '@mui/material/Backdrop';
import Link from "next/link";
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const drawerWidth = 260;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function DrawerRight({ user, open, handleDrawerClose, primeBusiness }) {
  const router = useRouter()
  const theme = useTheme();
  const signOut = async () => {
    const res = await fetch("/api/auth/logout", { method: "GET" });
    if (res.status === 200) {
      router.push("/w");
    } else {
      console.log("res", res);
    }
  }
  return (
    <Box >
      <Backdrop open={open} onClick={handleDrawerClose} sx={{ zIndex: theme.zIndex.drawer - 1 }} />
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
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (<ChevronLeftIcon />) : (<ChevronRightIcon />)}
          </IconButton>
        </DrawerHeader>
        {
          user?.businesses[0] &&
          <List sx={{ m: 0, p: 0 }}>
            <>
              <Divider
                sx={{ fontSize: 12 }}
                textAlign="center">کسب و کار اصلی
              </Divider>
            </>
            <HelpIcon iconText={iconText} />
            <React.Fragment key={primeBusiness._id} >
              <ListItemText align="right" secondary={"صنف:" + primeBusiness.guild.guildName} sx={{ mr: 2, mt: 0 }} />
              <ListItemButton sx={{ mt: -1, p: 0 }} onClick={() => router.push(`/${primeBusiness.businessName}`)}>
                <ListItem >
                  <ListItemIcon>
                    <ItsAvatar isAvatar={primeBusiness.isAvatar} userCodeOrBusinessBrand={primeBusiness.businessName} />
                  </ListItemIcon>
                  <ListItemText align="right" primary={primeBusiness.businessName} secondary={primeBusiness.businessBrand} sx={{ m: 0 }} />
                </ListItem>
              </ListItemButton>
            </React.Fragment>

            {user.businesses.length > 1 && <>
              <PrimeJobSelect user={user} />
              <Divider
                sx={{ fontSize: 12, mt: 2 }}
                textAlign="center">کسب و کار های فرعی</Divider>
            </>}
            {user.businesses.length > 1 &&

              user.businesses.map((business) => (
                user.primeJob !== business._id && (
                  <React.Fragment key={business._id}>
                    <ListItem>
                      <ListItemButton sx={{ mt: 0, p: 0 }} onClick={() => router.push(`/${business.businessName}`)}>
                        <ListItemAvatar>
                          <ListItemIcon>
                            <ItsAvatar userCodeOrBusinessBrand={business.businessName} />
                          </ListItemIcon>
                        </ListItemAvatar>
                        <ListItemText align="right" primary={business.businessName} secondary={business.businessBrand} sx={{ m: 0 }} />
                      </ListItemButton>
                    </ListItem>
                  </React.Fragment>
                )))}
          </List>
        }
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AddBusinessIcon />
              </ListItemIcon>
              <ListItemText
                sx={{ fontSize: 12, textAlign: "right" }}
                dir="rtl"
                secondary="ایجاد کسب و کار جدید"
                type="button"
                onClick={() => router.push("/CB")}
              />
            </ListItemButton>
          </ListItem>
          {user?.businesses[0] &&
            <Resignation user={user} />
          }
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText
                sx={{ textAlign: "right" }}
                secondary="لیست تمام کسب و کارها"
                type="button"
                onClick={() => router.push("/all")}
              />
            </ListItemButton>
          </ListItem>
          {user &&
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <QueryStatsIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ textAlign: "right" }}
                  secondary="بازارسنجی نیازها"
                  type="button"
                  onClick={() => router.push("/needs")}
                />
              </ListItemButton>
            </ListItem>
          }
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
        {/* <a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=575002&Code=WVHMOZU94IEbixgjQrSBilZBlW74eHJP'>
          <img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=575002&Code=WVHMOZU94IEbixgjQrSBilZBlW74eHJP' alt='' style='cursor:pointer' code='WVHMOZU94IEbixgjQrSBilZBlW74eHJP'></img>
        </a> */}
        <a
          className='inMiddle'
          referrerPolicy="origin"
          target="_blank"
          rel="noopener noreferrer"
          href="https://trustseal.enamad.ir/?id=575002&Code=WVHMOZU94IEbixgjQrSBilZBlW74eHJP"
        >
          <img
            referrerPolicy="origin"
            src="https://trustseal.enamad.ir/logo.aspx?id=575002&Code=WVHMOZU94IEbixgjQrSBilZBlW74eHJP"
            alt=""
            style={{ cursor: 'pointer' }}
          />
        </a>
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }} />

        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            backgroundColor: 'background.paper',
            zIndex: 1,
            padding: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: 12,
              fontWeight: 'bold',
            }}
          >
            <Link href="/rules" style={{ textDecoration: "none" }}>
              قوانین پلتفرم کارباکار
            </Link>
          </Typography>
        </Box>

      </Drawer >
    </Box >
  );
}
