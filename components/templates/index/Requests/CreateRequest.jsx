import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ItsAvatar from "@/components/modules/ItsAvatar"
import CloseIcon from '@mui/icons-material/Close';
import Guild from "@/components/modules/Guild"
import { useState } from 'react';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import CustomSnackbar from "@/components/modules/CustomSnackbar";





export default function VaseTest({ fabHandler, user, distinctGuilds }) {
  const [snackbarAccept, setSnackbarAccept] = React.useState(false);
  const [snackbarReject, setSnackbarReject] = React.useState(false);
  const [snackbarServerError, setSnackbarServerError] = React.useState(false);

  const [expanded, setExpanded] = useState(false);
  const [snackbarError, setSnackbarError] = useState(false);

  const [guild, setGuild] = useState("")
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [Requester, setRequester] = useState("");

  const requestBox = { guild, title, message, Requester, }

  useEffect(() => {
    setRequester(user.businesses.find((business) => (
      user.primeJob === business._id)))
  }, []);


  async function createThisRequest(requestBox) {
    const res = await fetch('api/requests/createRequest', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBox)
    })
    if (res.status === 500) {
      console.log("server error", res);
      setSnackbarServerError(true)
    } else if (res.status === 201) {
      console.log("Request signed successfully");
      setSnackbarAccept(true)
    } else if (res.status === 406) {
      console.log("some err");

    }
  }

  const updateGuildname = (newGuildname) => {
    setGuild(newGuildname);
  };


  return (
    <>
      {Requester &&

        (
          <>
            <Card key={Requester._id} sx={{ maxWidth: 345, m: "auto" }} >
              <CardHeader

                avatar={
                  <Avatar sx={{ m: 1 }}>
                    <ItsAvatar userCodeOrBusinessBrand={Requester.businessName} />
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings" onClick={() => fabHandler()}>
                    <CloseIcon />
                  </IconButton>
                }
                title={Requester.businessBrand}
                subheader={Requester.businessName}
                sx={{
                  display: 'flex',
                  justifyContent: "space-between",

                  p: 0, m: 1, mt: 2,
                  '& .MuiCardHeader-title': { fontSize: '12px', fontWeight: "bold" },
                  '& .MuiCardHeader-subheader': { fontSize: '14px', fontWeight: "bold" },
                }}
              />
              <CardContent>
                <Typography sx={{ my: 5, fontSize: '16px', fontWeight: "bold" }} variant="body1" color="text.primary">
                  ایجاد درخواست جدید
                </Typography>
                <Guild updateGuildname={updateGuildname} distinctGuilds={distinctGuilds} snackbarError={snackbarError} />
                <TextField
                  id="requestTitle"
                  label="عنوان درخواست"
                  variant="outlined"
                  sx={{ my: 3 }}
                  fullWidth
                  placeholder="موضوع درخواست شما مثال: کارواش خودرو"
                  size="small"
                  InputProps={{
                    style: { fontSize: '14px', },
                  }}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  id="requestText"
                  label="توضیحات"
                  multiline
                  rows={4}
                  placeholder="شرح درخواست خود را وارد نمایید(غیر الزامی) مثال: ماشینم سمند است بعد از ظهر ساعت شش به بعد می توانم برای کارواش مراجعه نمایم"
                  fullWidth
                  size="small"
                  onChange={(e) => setMessage(e.target.value)}

                />



              </CardContent>
              <CardActions disableSpacing>
                <Stack direction="row" spacing={2} sx={{ direction: "ltr" }}>
                  <Button variant="outlined" color="error" startIcon={<DeleteIcon />}
                    onClick={() => fabHandler()}>
                    لغو
                  </Button>
                  <Box style={{ flexGrow: 1 }}></Box>
                  <Button color="success" variant="outlined" endIcon={<SendIcon />}
                    onClick={() => createThisRequest(requestBox)}
                  >
                    تایید
                  </Button>
                </Stack>
              </CardActions>

            </Card>
            <CustomSnackbar
              open={snackbarAccept}
              onClose={() => { setSnackbarAccept(false) }}
              message="درخواست شما در لیست کسب و کارهای مرتبط به نمایش درآمد"
            />
            <CustomSnackbar
              open={snackbarServerError}
              onClose={() => setSnackbarServerError(false)}
              message="خطا در اتصال به سرور"
              severity="error"
            />
            <CustomSnackbar
              open={snackbarReject}
              onClose={() => { setSnackbarReject(false) }}
              message="صورتحساب لغو گردید"
              severity="info"
            />
          </>

        )
      }
    </>

  )
}
