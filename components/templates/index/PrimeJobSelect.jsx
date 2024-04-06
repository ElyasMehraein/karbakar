import * as React from 'react';
import { Select, MenuItem, ListItemText, ListItemButton, Avatar, Snackbar, Alert } from '@mui/material';
import ItsAvatar from '@/components/modules/ItsAvatar';
import { useRouter } from 'next/navigation';
import { FormControl, InputLabel, ListItemAvatar } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState } from 'react';
import CustomSnackbar from "@/components/modules/CustomSnackbar";


const PrimeJobSelect = ({ user }) => {


  // Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBusinessId, setSelectedBusinessId] = useState(user.primeJob);
  const handleBusinessChange = (event) => {
    setOpenDialog(true);
    setSelectedBusinessId(event.target.value);
  };
  const cancelHandler = () => {
    setSelectedBusinessId(user.primeJob)
    setOpenDialog(false);
  };



  // Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("خطای ناشناخته")
  const callSnackbar = (message) => {
    setSnackbarMessage(message)
    setSnackbarOpen(true)
  };
  const setOpenSnackbar = () => {
    setSnackbarOpen(false)
  }



  async function changePrimeJob(selectedBusinessId) {
    const res = await fetch('/api/changePrimeJob', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedBusinessId)
    })
    if (res.status === 201) {
      setOpenDialog(false)
      callSnackbar("تغییر کسب و کار اصلی با موفقیت انجام شد")
    } else if (res.status === 500) {
      callSnackbar("خطای اتصال به سرور")
    } else if (res.status === 403) {
      callSnackbar("شما عضو این کسب و کار نیستید")
    } else if (res.status === 404) {
      callSnackbar("کسب و کار یافت نشد کد وارد شده را مجدد بررسی نمایید")
    } else if (res.status === 406) {
      callSnackbar("این کسب و کار در حال حاضر کسب و کار اصلی شماست")
    }
  }
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          کسب و کار اصلی
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedBusinessId}
          onChange={handleBusinessChange}
          label="کسب و کار اصلی"
        >
          {user?.businesses.map((business) => (
            <MenuItem
              key={business._id}
              value={business._id}
              sx={{ display: 'flex', alignItems: 'center', minWidth: '150px' }}
            >
              <ListItemAvatar>
                <Avatar sx={{ width: 40, height: 40 }}>
                  <ItsAvatar userCodeOrBusinessBrand={business.businessName} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={business.businessName} secondary={business.businessBrand} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Dialog
        open={openDialog}
      // onClose={handleClose}
      >
        <DialogTitle>تغییر کسب و کار اصلی</DialogTitle>
        <DialogContent>
          <DialogContentText>
            دقت داشته باشید که تغییر کسب و کار اصلی تنها هر 14 روز یکبار امکانپذیر است
          </DialogContentText>
          <DialogContentText>
            آیا همچنان به انجام این کار اطمینان دارید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelHandler}>رد</Button>
          <Button onClick={() => changePrimeJob(selectedBusinessId)}>تایید</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>

  );
};

export default PrimeJobSelect;
