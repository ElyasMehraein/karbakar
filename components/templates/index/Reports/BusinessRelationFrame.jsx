import React from 'react'
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
export default function BusinessRelationFrame({report}) {
  return (
    <Box >
      <Card sx={{ my: 1, bgcolor: "#e3f2fd" }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="body2">
            "تعهد ارائه محصولات "
          </Typography>
        </CardContent>
        <CardHeader
          sx={{ display: 'flex', alignItems: 'center', justifyItems: "center" }}
          avatar={
            <Avatar sx={{ ml: 1, width: 40, height: 40 }} >
              <ItsAvatar isAvatar={report.business?.isAvatar} userCodeOrBusinessBrand={report.business?.businessName} />
            </Avatar>
          }
          title={report.business?.businessBrand}
          subheader={report.business?.businessName}
        />
        <Stack direction="row" spacing={2} sx={{ ml: 2, mb: 2, direction: "ltr" }}>
          <Button variant="outlined" color="error"
            onClick={() => answer(report._id, false)}>
            رد
          </Button>
          <Button color="success" variant="outlined"
            onClick={() => answer(report._id, true)}>
            تایید
          </Button>
        </Stack>
        <CardContent >
          <Typography style={{ whiteSpace: 'pre-wrap' }}>

            {`کسب و کار ${report.business.businessBrand || report.business.businessName} متعهد به ارائه محصول گردیده است آیا می پذیرید؟`}
          </Typography>

        </CardContent>
      </Card>
      <CustomSnackbar
        open={snackbarAccept}
        onClose={() => { setSnackbarAccept(false) }}
        message="پاسخ شما به نماینده کسب و کار ارسال شد"
      />
    </Box>
  )
}
