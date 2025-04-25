import * as React from 'react'
import {
  Select,
  MenuItem,
  ListItemText,
  ListItemButton,
  Avatar,
  Snackbar,
  Alert,
} from '@mui/material'
import ItsAvatar from '@/components/modules/ItsAvatar'
import { useRouter } from 'next/navigation'
import { FormControl, InputLabel, ListItemAvatar } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import { useState } from 'react'
import Menu from '@mui/material/Menu'

const PrimeJobSelect = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // Dialog
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedBusinessId, setSelectedBusinessId] = useState(user.primeJob)

  const handleBusinessChange = BusinessId => {
    setSelectedBusinessId(BusinessId)
    setOpenDialog(true)
    handleClose()
  }
  const cancelHandler = () => {
    setSelectedBusinessId(user.primeJob)
    setOpenDialog(false)
  }

  // Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('خطای ناشناخته')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')
  const callSnackbar = (message, severity) => {
    setSnackbarMessage(message)
    severity && setSnackbarSeverity(severity)
    setSnackbarOpen(true)
    setSnackbarSeverity('success')
  }
  const onCloseSnackbar = () => {
    setSnackbarOpen(false)
    location.reload()
  }

  async function changePrimeJob(selectedBusinessId) {
    const res = await fetch('/api/changePrimeJob', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedBusinessId),
    })
    if (res.status === 201) {
      setOpenDialog(false)
      callSnackbar('تغییر کسب و کار اصلی با موفقیت انجام شد')
    } else if (res.status === 500) {
      callSnackbar('خطای اتصال به سرور', 'error')
    } else if (res.status === 403) {
      callSnackbar('شما عضو این کسب و کار نیستید', 'error')
    } else if (res.status === 404) {
      callSnackbar('کسب و کار یافت نشد کد وارد شده را مجدد بررسی نمایید', 'error')
    } else if (res.status === 406) {
      callSnackbar('این کسب و کار در حال حاضر کسب و کار اصلی شماست', 'error')
    }
  }
  return (
    <>
      <FormControl fullWidth>
        <Button
          size="small"
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          تغییر کسب و کار اصلی
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {user?.businesses.map(business => (
            <MenuItem
              key={business._id}
              value={business._id}
              sx={{ display: 'flex', alignItems: 'center', minWidth: '150px' }}
              onClick={() => handleBusinessChange(business._id)}
            >
              <ListItemAvatar>
                <ItsAvatar userCodeOrBusinessBrand={business.businessName} />
              </ListItemAvatar>
              <ListItemText primary={business.businessName} secondary={business.businessBrand} />
            </MenuItem>
          ))}
        </Menu>
      </FormControl>
      <Dialog open={openDialog}>
        <DialogTitle>تغییر کسب و کار اصلی</DialogTitle>
        <DialogContent>
          <DialogContentText>
            دقت داشته باشید که تغییر کسب و کار اصلی تنها هر 14 روز یکبار امکانپذیر است
          </DialogContentText>
          <DialogContentText>آیا همچنان به انجام این کار اطمینان دارید؟</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelHandler}>رد</Button>
          <Button onClick={() => changePrimeJob(selectedBusinessId)}>تایید</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => onCloseSnackbar(false)}>
        <Alert severity={snackbarSeverity} variant="filled" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default PrimeJobSelect
