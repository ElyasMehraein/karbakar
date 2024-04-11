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



export default function VaseTest({ fabHandler, user, distinctGuilds }) {

  const [expanded, setExpanded] = useState(false);
  const [snackbarError, setSnackbarError] = useState(false);

  const [guildname, setGuildName] = useState("")
  const [requestTitle, setRequestTitle] = useState("");
  const [requestText, setRequestText] = useState("");
  const [userPrimeJob, setUserPrimeJob] = useState("");
  useEffect(() => {
    setUserPrimeJob(user.businesses.find((business) => (
      key = business._id,
      user.primeJob === business._id)))
}, []);

console.log("userPrimeJob", userPrimeJob);

async function createThisRequest(selectedBusiness, customerCode, bills) {
  const res = await fetch('api/createBill', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ selectedBusiness, customerCode, bills })
  })
  if (res.status === 500) {
    console.log("server error");
  } else if (res.status === 201) {
    console.log("bill signed successfully");
    handleShowSnackbar()
  } else if (res.status === 406) {
    setOpenSnackbarError(true)
  }
}

const updateGuildname = (newGuildname) => {
  setGuildName(newGuildname);
};


return (
  <>
    {user.businesses.map((business) => (
      user.primeJob === business._id && (
        <Card sx={{ maxWidth: 345, m: "auto" }} >
          <CardHeader

            avatar={
              <Avatar >
                <ItsAvatar userCodeOrBusinessBrand={business.businessName} />
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <CloseIcon onClick={() => fabHandler()} />
              </IconButton>
            }
            title={business.businessBrand}
            subheader={business.businessName}
            sx={{
              display: 'flex',
              justifyContent: "space-between",

              p: 0, m: 0, mt: 2,
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
              onChange={(e) => setRequestTitle(e.target.value)}
            />
            <TextField
              id="requestText"
              label="توضیحات"
              multiline
              rows={4}
              placeholder="شرح درخواست خود را وارد نمایید(غیر الزامی) مثال: ماشینم سمند است بعد از ظهر ساعت شش به بعد می توانم برای کارواش مراجعه نمایم"
              fullWidth
              size="small"
              sx={{ '& .MuiInput-placeholder': { color: '#333' } }} // Target placeholder class and set color
              onChange={(e) => setRequestText(e.target.value)}

            />



          </CardContent>
          <CardActions disableSpacing>
            <Stack direction="row" spacing={2} sx={{ direction: "ltr" }}>
              <Button variant="outlined" color="error" startIcon={<DeleteIcon />}
                // onClick={() => deleteHandler()}
                >
                لغو
              </Button>
              <Box style={{ flexGrow: 1 }}></Box>
              <Button color="success" variant="outlined" endIcon={<SendIcon />}
                // onClick={() => saveHandler(true)}
                >
                تایید
              </Button>
            </Stack>
          </CardActions>

        </Card>
      )))
    }
  </>
)
}
