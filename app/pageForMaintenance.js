import { Typography } from '@mui/material'
import React from 'react'

export default function page() {
  return (
    <Typography
      sx={{
        p: 5,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}
      className="inMiddle"
    >
      همون طور که میدونید تازه سایت راه اندازی شده و در مرحله تست هستیم حالا یه تعداد از باگ های
      سایت مشخص شده که حلش دو سه روز طول می کشه توی این مدت مجبوریم صبر کنیم😅
    </Typography>
  )
}
