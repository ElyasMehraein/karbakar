import React, { useState, useEffect } from 'react'
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
import { CircularProgress } from "@mui/material"

export default function JobOfferFrame({ report }) {
  const reportID = report._id;
  const [freshReport, setFreshReport] = useState(null);
  console.log("freshReport", freshReport);

  const [isLoading, setIsLoading] = useState(true);
  const [snackbarAccept, setSnackbarAccept] = useState(false);
  const [snackbarError, setSnackbarError] = useState(false)
  const [positiveChoise, setPositiveChoise] = useState(false);

  useEffect(() => {

    const fetchReport = async () => {
      const response = await fetch(`/api/reports/${reportID}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Failed to fetch report");
      }
      
      const data = await response.json();
      console.log("data.data", data.data);
      setFreshReport(data.data);
      setIsLoading(false);
    };
    fetchReport();
  }, [isLoading]);

  const answer = async (parameter) => {
    setIsLoading(true)
    const res = await fetch("/api/reports/answerJobOffer", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportID: report._id, parameter }),
    });
    if (res.status === 201) {
      setSnackbarAccept(true)
      if (parameter) {
        setPositiveChoise(true)
      }
    } else {
      setSnackbarError(true)
    }
    setIsLoading(false)
  }

  return (
    <Box >
      <Card sx={{ my: 1, bgcolor: "#e3f2fd" }}>
        {!report && isLoading ?
          <Box className="inMiddle">
            <CircularProgress />
          </Box>
          :
          <>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="body2">
                پیشنهاد کار
              </Typography>

            </CardContent>
            <Box sx={{ display: 'flex', alignItems: "right", flexDirection: { xs: 'column', sm: 'row' } }}>
              <CardHeader
                sx={{ display: 'flex', alignItems: 'center', justifyItems: "center" }}
                avatar={
                  <Box sx={{ ml: 1, width: 40, height: 40 }} >
                    <ItsAvatar userCodeOrBusinessBrand={report.business?.businessName} />
                  </Box>
                }
                title={report.business?.businessBrand}
                subheader={report.business?.businessName}
              />
              <ArrowBackIcon sx={{ margin: { sm: "auto" }, marginX: { xs: "20%" }, transform: { xs: "rotate(-90deg)", sm: "rotate(0deg)" } }} />
              <CardHeader
                sx={{ display: 'flex', alignItems: 'center', justifyItems: "center" }}
                avatar={
                  <Box sx={{ ml: 1, width: 40, height: 40 }} >
                    <ItsAvatar userCodeOrBusinessBrand={report.recepiant?.userName} />
                  </Box>
                }
                title={report.recepiant?.userName}
                subheader={report.recepiant?.bio}
              />
            </Box>
            <CardContent >
              <Typography style={{ whiteSpace: 'pre-wrap' }}>
                {report.isAnswerNeed ?
                  "این کسب و کار برای شما پیشنهاد کار ارسال نموده است آیا عضویت در این کسب و کار را می پذیرید؟"
                  :
                  report.answer || positiveChoise ?
                    "شما به پیشنهاد کار این کسب و کار پاسخ مثبت دادید"
                    :
                    "شما به پیشنهاد کار این کسب و کار پاسخ منفی دادید"
                }
              </Typography>
            </CardContent>
            {freshReport?.isAnswerNeed &&
              <Stack direction="row" spacing={2} sx={{ ml: 2, mb: 2, direction: "ltr" }}>
                <Button variant="outlined" color="error"
                  onClick={() => answer(false)}>
                  رد
                </Button>
                <Button
                  color="success"
                  variant="outlined"
                  onClick={() => answer(true)}
                >
                  تایید
                </Button>
              </Stack>
            }
          </>
        }
      </Card>
      <CustomSnackbar
        open={snackbarAccept}
        onClose={() => { setSnackbarAccept(false) }}
        message="پاسخ شما با موفقیت ثبت شد و به نماینده کسب و کار ارسال شد"
      />
      <CustomSnackbar
        open={snackbarError}
        onClose={() => { setSnackbarError(false) }}
        severity={"error"}
        message="خطا از سمت سرور"
      />
    </Box>
  )
}
