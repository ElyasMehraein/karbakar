import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function VaseTest({ user, distinctGuilds }) {

  const [expanded, setExpanded] = useState(false);
  const [guildname, setGuildName] = useState("")
  const [snackbarError, setSnackbarError] = useState(false);


  const updateGuildname = (newGuildname) => {
    setGuildName(newGuildname);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <>
      {user.businesses.map((business) => (
        user.primeJob === business._id && (
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader

              avatar={
                <Avatar >
                  <ItsAvatar userCodeOrBusinessBrand={business.businessName} />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <CloseIcon />
                </IconButton>
              }
              title={business.businessBrand}
              subheader={business.businessName}
              sx={{
                p: 0, m: 0, mt: 2,
                '& .MuiCardHeader-title': { fontSize: '12px', fontWeight: "bold" }, // Target title class and set font size
                '& .MuiCardHeader-subheader': { fontSize: '14px', fontWeight: "bold" }, // Target subheader class and set font size
              }}
            />
            <CardContent>
              <Typography sx={{ mt: 4, fontSize: '14px', fontWeight: "bold" }} variant="body1" color="text.secondary">
                ایجاد درخواست جدید
              </Typography>
              <Guild updateGuildname={updateGuildname} distinctGuilds={distinctGuilds} snackbarError={snackbarError} />
              <TextField
                id="outlined-multiline-static"
                label="عنوان درخواست"
                sx={{ my: 3 }}
                fullWidth
                // onChange={changeHandler}
                // inputProps={{ maxLength: 200 }}
                placeholder="موضوع درخواست شما مثال: کارواش خودرو"
                size="small"
                InputProps={{
                  style: { fontSize: '10px', },
                }}
              />
              <TextField
                id="outlined-multiline-static"
                label="توضیحات"
                multiline
                rows={4}
                placeholder="شرح درخواست خود را وارد نمایید(غیر الزامی) مثال: ماشینم سمند است بعد از ظهر ساعت شش به بعد می توانم برای کارواش مراجعه نمایم"
                fullWidth
                size="small"
                InputProps={{
                  style: { fontSize: '10px', color:"primary" },
                }}
              />

            </CardContent>
            <CardActions disableSpacing>
              <Stack direction="row" spacing={2} sx={{ direction: "ltr" }}>
                <Button variant="outlined" color="error" startIcon={<DeleteIcon />}
                  onClick={() => deleteHandler()}>
                  لغو
                </Button>
                <Box style={{ flexGrow: 1 }}></Box>
                <Button color="success" variant="outlined" endIcon={<SendIcon />}
                  onClick={() => saveHandler(true)}>
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
