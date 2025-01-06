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


export default function BusinessRelationFrame({ report }) {
  const [hideQuestion, setHideQuestion] = useState(false);
  const [acceptIsLoading, setAcceptIsLoading] = useState(false);
  const [rejectIsLoading, setRejectIsLoading] = useState(false);
  const [snackbarAccept, setSnackbarAccept] = useState(false);
  const [positiveChoise, setPositiveChoise] = useState(false);
  const [negativeChoise, setNegativeChoise] = useState(true);

  const answer = async (businessRelationID, parameter) => {

    if (parameter) {
      setAcceptIsLoading(true)

    } else {
      deleteABusinessRelation(report.providerBusiness, report.receiverBusiness)
      setNegativeChoise(false)
      setRejectIsLoading(true)
    }
    const res = await fetch("/api/reports/answerBusinessRelation", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessRelationID, parameter, reportID: report._id }),
    });
    if (res.status === 201) {
      if (parameter) {
        setPositiveChoise(true)
      } else {
        setNegativeChoise(false);
      }
      setHideQuestion(true)
      setSnackbarAccept(true)
      setRejectIsLoading(false)
      setAcceptIsLoading(true)
    }
  }
  async function deleteABusinessRelation(provider, receiver) {
    const res = await fetch('api/deleteABusinessRelation', {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider, receiver })
    })
    if (res.status === 500) {
      console.log("server error");
      // setOpenSnackbar500Error(true)
    } else if (res.status === 200) {
      setHideQuestion(true)
      console.log("BusinessRelation removed successfully");
      // setOpen200Snackbar(true)
    } else if (res.status === 401) {
      console.log("log in first");
    } else if (res.status === 404) {
      console.log("not found");
    } else if (res.status === 403) {
      console.log("403 Unauthorized access");
    } else if (res.status === 409) {
      console.log("409 conflict");
      // setOpenSnackbar409Error(true)
    }
    setRejectIsLoading(false)
  }
  return (
    <Box >
      <Card sx={{ my: 1, bgcolor: "#e3f2fd" }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="body2">
            تعهد ارائه محصولات
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: "right", flexDirection: { xs: 'column', sm: 'row' } }}>
          <CardHeader
            sx={{ display: 'flex', alignItems: 'center', justifyItems: "center" }}
            avatar={
              <Avatar sx={{ ml: 1, width: 40, height: 40 }} >
                <ItsAvatar isAvatar={report.providerBusiness?.isAvatar} userCodeOrBusinessBrand={report.providerBusiness?.businessName} />
              </Avatar>
            }
            title={report.providerBusiness?.businessBrand}
            subheader={report.providerBusiness?.businessName}
          />
          <ArrowBackIcon sx={{ margin: { sm: "auto" }, marginX: { xs: "20%" }, transform: { xs: "rotate(-90deg)", sm: "rotate(0deg)" } }} />
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
            {report.isAnswerNeed && !hideQuestion ?
              "این کسب و کار متعهد به ارائه محصولات خود به کسب و کار شما گردیده است. آیا می پذیرید؟"
              :
              report.answer || positiveChoise ?
                "شما به تعهد این کسب و کار جهت ارائه محصول پاسخ مثبت دادید"
                :
                "شما به تعهد این کسب و کار جهت ارائه محصول پاسخ منفی دادید"
            }
          </Typography>
        </CardContent>
        {report.isAnswerNeed && !hideQuestion &&
          <Stack direction="row" spacing={2} sx={{ ml: 2, mb: 2, direction: "ltr" }}>
            <Button variant="outlined" color="error"
              onClick={() => answer(report.businessRelation, false)}>
              رد
            </Button>
            <Button
              color="success"
              variant="outlined"
              onClick={() => answer(report.businessRelation, true)}
            >
              تایید
            </Button>
          </Stack>}

      </Card>
      <CustomSnackbar
        open={snackbarAccept}
        onClose={() => { setSnackbarAccept(false) }}
        message="پاسخ شما به نماینده کسب و کار ارسال شد"
      />
    </Box>
  )
}
