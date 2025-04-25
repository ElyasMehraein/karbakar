'use client'
import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { setSnackbar } from '@/utils/snackbarService'

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbarState] = useState({ open: false, message: '', severity: 'success' })

  setSnackbar((message, severity = 'success') => {
    setSnackbarState({ open: true, message, severity })
  })

  const handleClose = () => {
    setSnackbarState(prev => ({ ...prev, open: false }))
  }

  return (
    <>
      {children}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
