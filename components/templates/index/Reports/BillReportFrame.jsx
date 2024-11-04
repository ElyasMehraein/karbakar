"use client"
import React from 'react'
import Box from '@mui/material/Box';
import ItsAvatar from "@/components/modules/ItsAvatar"
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function BillReportFrame({ report }) {

  return (
    <Box >
      <Card sx={{ my: 1, bgcolor: "#e3f2fd" }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="body2">
            دریافت صورتحساب جدید
          </Typography>
        </CardContent>
        <CardContent >
          <Typography style={{ whiteSpace: 'pre-wrap' }}>
            شما یک صورتحساب جدید دریافت نموده اید. جهت مشاهده به سر برگ صورتحساب مراجعه نمایید
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
