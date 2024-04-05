import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useRouter } from 'next/navigation'
import Button from "@mui/material/Button";
import { useEffect } from 'react';
import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import ItsAvatar from "@/components/modules/ItsAvatar"
import Reports from './Reports/Reports';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function SearchAppBar({ user, menuClickHandler }) {


  const [reports, setReports] = useState("")
  const [unseenReportCounts, setUnseenReportCounts] = useState(0)

  useEffect(() => {

    getReports()
  }, []);

  useEffect(() => {
    if (reports) {
      setUnseenReportCounts(reports.filter(report => !report.isSeen && !report.isjobOffersAnswerd).length || 0)
    }
  }, [reports]);

  const setIsSeen = async (parameter) => {
    const res = await fetch("/api/reports/setIsSeen", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parameter
      }),
    });
    console.log("res", res);
    res.status === 201 && setUnseenReportCounts(0)
  }

  const userCode = (user) => {
    if (user.code) {
      return user.code
    }
  }

  const router = useRouter()
  const goToProfile = () => {
    router.push(`/${userCode(user)}`)
  }
  const signOut = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" })
    if (res.status === 200) {
      router.push('/welcome')
    }
  }
  const getReports = async () => {
    const res = await fetch("/api/reports/getReports", { method: "GET" })
    if (res.status === 200) {
      const data = await res.json()
      setReports(data.data)
    }
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const clickReports = async (event) => {
    setAnchorEl(event.currentTarget);
    setTimeout(() => setIsSeen(true), 5000);
  };
  const handleClose = async () => {
    clearTimeout(setIsSeen)
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={menuClickHandler}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Search sx={{ direction: "ltr" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="کارباکار"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        {!user ? (<Button size="small" sx={{ display: { xs: 'none', sm: 'block' }, mr: 1, minWidth: 110, maxWidth: 110 }}
          onClick={signOut} variant="contained" color="secondary">
          ورود یا ثبت نام
        </Button>) :
          <Box sx={{ display: 'flex' }}>
            {reports[0] && <Tooltip title="Account settings">
              <IconButton sx={{ width: 70, height: 70 }}
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={clickReports}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Badge badgeContent={unseenReportCounts} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>}
            <Reports user={user} reports={reports} anchorEl={anchorEl} open={open} handleClose={handleClose} />
            <IconButton
              sx={{ m: 0, width: 70, height: 70 }}
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls='primary-search-account-menu'
              // aria-haspopup="true"
              color="inherit"
              onClick={goToProfile}
            >{user ?
              <Avatar sx={{ width: 40, height: 40 }} >
                <ItsAvatar userCodeOrBusinessBrand={user?.code} />
              </Avatar> :
              <AccountCircle />}
            </IconButton>
          </Box>
        }
      </Toolbar>
    </AppBar>
  );
}
