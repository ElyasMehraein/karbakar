'use client'
import React from 'react'
import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Box from '@mui/material/Box'
import { grey, blue } from '@mui/material/colors'
import Paper from '@mui/material/Paper'

const WhatBusinessGet = () => {
  const [alignment, setAlignment] = React.useState('one')

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Paper
        sx={{
          width: '100%',
          maxWidth: 700,
          m: 1,
          backgroundColor: grey[200],
          borderRadius: '30px',
        }}
      >
        <Typography sx={{ textAlign: 'center', variant: 'subtitle2', m: 1, fontWeight: 'bold' }}>
          محصولاتی که این کسب و کار از دیگران دریافت کرده
        </Typography>
        <Box display="flex" justifyContent="space-around">
          <ToggleButtonGroup
            color="primary"
            sx={{
              direction: 'ltr',
              mb: 1,
              borderRadius: '20px !important',
              backgroundColor: grey[50],
            }}
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton sx={{ borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }} value="one">
              از ابتدای تاسیس
            </ToggleButton>
            <ToggleButton value="two">یکسال گذشته</ToggleButton>
            <ToggleButton
              sx={{ borderBottomRightRadius: 20, borderTopRightRadius: 20 }}
              value="three"
            >
              یکماه گذشته
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Typography sx={{ textAlign: 'center', dir: 'rtl', m: 1, fontWeight: 'bold' }}>
          تعداد 172 محصول از 42 کسب و کار
        </Typography>
      </Paper>
    </Box>
  )
}

export default WhatBusinessGet
