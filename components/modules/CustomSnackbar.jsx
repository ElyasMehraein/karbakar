import * as React from 'react'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

export default function customSnackbar({ open, onClose, message, severity }) {
  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
        <Alert severity={severity} variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}
