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
import { Snackbar, Alert } from '@mui/material';




export default function CreateRequest({ fabHandler, user, distinctGuilds }) {
  // Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("خطای ناشناخته")
  const [snackbarSeverity, setSnackbarSeverity] = useState("success")
  const callSnackbar = (message, severity) => {
    setSnackbarMessage(message)
    severity && setSnackbarSeverity(severity)
    setSnackbarOpen(true)
    setSnackbarSeverity("success")
  };
  const onCloseSnackbar = () => {
    setSnackbarOpen(false)
    location.reload()
  }

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
    } else if (res.status === 201) {
      console.log("Request signed successfully");
      callSnackbar("درخواست شما با موفقیت ثبت شد و در لیست درخواست های صنف مرتبط قرار گرفت")
    } else if (res.status === 406) {
      console.log("you can't hire yourself!");

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
                  <Box sx={{ m: 1 }}>
                    <ItsBox userCodeOrBusinessBrand={Requester.businessName} />
                  </Box>
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
                <Guild updateGuildname={updateGuildname} distinctGuilds={distinctGuilds} />
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

          </>

        )
      }
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => onCloseSnackbar(false)}>
        <Alert
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>

  )
}
