"use client"
import * as React from 'react';
import { Avatar, Snackbar, Alert } from '@mui/material';
import ItsAvatar from '@/components/modules/ItsAvatar';
import { ListItemAvatar } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState } from 'react';
import DomainDisabledIcon from "@mui/icons-material/DomainDisabled";
import TextField from '@mui/material/TextField';
import { resignationText1, resignationText2 } from '../typoRepo';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function Resignation({ user }) {

  const [selectedBusiness, setSelectedBusiness] = useState(user.businesses[0]);
  const [newAgentID, setNewAgentID] = React.useState(null);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };


  // Dialog
  const [openDialog, setOpenDialog] = useState(false);

  const handleBusinessChange = (Business) => {
    setSelectedBusiness(Business);
    setOpenDialog(true);
  };
  const cancelHandler = () => {
    setOpenDialog(false);
  };

  const changeHandler = (e) => {
    if (isNaN(e.target.value)) {
      callSnackbar("فقط اعداد قابل قبول هستند")
    } else {
      setNewAgentID(e.target.value);
    }
  };

  // Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("خطای ناشناخته")
  const [snackbarSeverity, setSnackbarSeverity] = useState("success")
  const callSnackbar = (message, severity) => {
    setSnackbarMessage(message)
    severity && setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  };
  const onCloseSnackbar = () => {
    setSnackbarOpen(false)
    setSnackbarSeverity("success")
  }



  async function resignation(newAgentID, selectedBusines) {
    const res = await fetch('/api/resignation', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newAgentID, selectedBusinessId: selectedBusines._id })
    })
    if (res.status === 201) {
      setOpenDialog(false)
      callSnackbar("استعفای شما با موفقیت انجام شد")
    } else if (res.status === 500) {
      callSnackbar("خطای اتصال به سرور", "error")
    } else if (res.status === 403) {
      callSnackbar("شما عضو این کسب و کار نیستید", "error")
    } else if (res.status === 404) {
      callSnackbar("کسب و کار یافت نشد کد وارد شده را مجدد بررسی نمایید", "error")
    } else if (res.status === 406) {
      callSnackbar("نفر جایگزین در 3 کسب و کار عضو است و عضویت در بیش از 3 کسب و کار مجاز نیست", "error")
    }
  }
  return (
    <>
      <List

      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <DomainDisabledIcon />
          </ListItemIcon>
          <ListItemText
            //  primary="Inbox" 
            secondary="استعفا از کسب و کار"
            sx={{ textAlign: "right" }}

          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {user?.businesses.map((business) => (
              <ListItemButton
                key={business._id}
                value={business._id}
                sx={{ pl: 4, display: 'flex', alignItems: 'center', minWidth: '150px' }}
                onClick={() => handleBusinessChange(business)}
              >
                <Avatar>
                  <ItsAvatar isAvatar={business.isAvatar} userCodeOrBusinessBrand={business.businessName} />
                </Avatar>
                <ListItemText primary={business.businessName} secondary={business.businessBrand} />
              </ListItemButton>
            ))}
          </List>
        </Collapse >
      </List >


      <Dialog
        open={openDialog}
      >
        <DialogTitle>استعفا از کسب و کار </DialogTitle>
        <DialogContent>

          {selectedBusiness && selectedBusiness.workers.length === 1 ?
            <DialogContentText>
              {resignationText1}
            </DialogContentText>
            :
            (selectedBusiness.agentCode == user.code) ?
              <>
                <DialogContentText>
                  {resignationText2}
                </DialogContentText>:
                <TextField
                  autoFocus
                  required
                  id="name"
                  name="userCode"
                  label="کد چهار رقمی کاربر"
                  variant="standard"
                  inputProps={{ maxLength: 4 }}
                  onChange={changeHandler}
                ></TextField>
              </>
              :
              <>
                <DialogContentText>
                  آیا به انجام این کار اطمینان دارید؟
                </DialogContentText>
              </>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelHandler}>بستن</Button>
          {
            selectedBusiness.workers.length > 1 &&
            <Button onClick={() => resignation(newAgentID, selectedBusiness)}>تایید</Button>
          }
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => onCloseSnackbar(false)}>
        <Alert
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>

  );
};

