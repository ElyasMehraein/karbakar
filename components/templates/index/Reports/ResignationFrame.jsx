import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeaderBox from './CardHeaderBox'
import { CardContent, Typography } from '@mui/material'

export default function ResignationFrame({ report }) {
  return (
    <Box>
      <Card sx={{ my: 1, bgcolor: '#e3f2fd' }}>
        <CardHeaderBox report={report} title={'گزارش استعفا'} />
        <CardContent>
          <Typography style={{ whiteSpace: 'pre-wrap' }}>
            همکاری این عضو با این کسب و کار پایان یافت
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
