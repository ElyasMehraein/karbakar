import React, { useState } from 'react'
import Box from '@mui/material/Box';
import ItsAvatar from "@/components/modules/ItsAvatar"
import Typography from "@mui/material/Typography";
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingButton from '@mui/lab/LoadingButton';



export default function BusinessRelationAcceptedFrame({ report }) {


  return (
    <Box >
      <Card sx={{ my: 1, bgcolor: "#e3f2fd" }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="body2">
            گزارش تایید دریافت کننده
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: "right", flexDirection: { xs: 'column', sm: 'row' } }}>
          <CardHeader
            sx={{ display: 'flex', alignItems: 'center', justifyItems: "center" }}
            avatar={
              <Avatar sx={{ ml: 1, width: 40, height: 40 }} >
                <ItsAvatar isAvatar={report.receiverBusiness?.isAvatar} userCodeOrBusinessBrand={report.receiverBusiness?.businessName} />
              </Avatar>
            }
            title={report.receiverBusiness?.businessBrand}
            subheader={report.receiverBusiness?.businessName}
          />
        </Box>
        <CardContent >
          <Typography style={{ whiteSpace: 'pre-wrap' }}>
            این کسب و کار، کسب و کار شما را بعنوان تامین کننده خود تایید نمود
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
