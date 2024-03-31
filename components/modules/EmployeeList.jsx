"use client"
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import ItsAvatar from './ItsAvatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export default function EmployeeList({ business, logedUserCode, users, maxLengthError }) {
    const [open, setOpen] = React.useState(false);
    const [newValue, setNewValue] = React.useState(null);

    const changeHandler = (e) => {
        if (isNaN(e.target.value)) {
            maxLengthError("فقط اعداد قابل قبول هستند")
        } else {
            setNewValue(e.target.value);
        }
    };

    const signHandler = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const sendJobOffer = () => {
        console.log("yask");
    }

    return (
        <Box>
            <Box dir="rtl" sx={{ display: 'flex', justifyContent: 'center' }}>
                <List sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>

                    <Typography align='right' sx={{ mr: 2, fontWeight: 'bold' }} >
                        لیست کارکنان کسب و کار
                    </Typography>

                    {business.workers.sort((a, b) => Number(business.agentCode) === Number(a.code) ? -1 : Number(business.agentCode) === Number(b.code) ? 1 : 0).map((worker => {
                        return (
                            <React.Fragment key={worker._id}>
                                <ListItem >
                                    <ListItemAvatar >
                                        <Avatar sx={{ width: 40, height: 40 }} >
                                            <ItsAvatar userCodeOrBusinessBrand={worker.code} alt="workers avatar" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        align='right'
                                        primary={Number(business.agentCode) === Number(worker.code) ? worker.userName + " — " + " نماینده" : worker.userName}
                                        secondary={worker.bio}
                                    />
                                    <ListItemText />
                                </ListItem>
                                <Divider variant="inset" />
                            </React.Fragment>
                        )
                    }))}
                    {logedUserCode === Number(business.agentCode) &&
                        <Stack display={"flex"} justifyContent={"flex-end"} direction="row" spacing={2} sx={{ direction: "ltr" }}>
                            <Button variant="outlined" color="error" startIcon={<DeleteIcon />}
                                onClick={() => quitHandler()}>
                                اخراج
                            </Button>
                            <Button color="success" variant="outlined" endIcon={<SendIcon />}
                                onClick={() => signHandler(true)}>
                                استخدام
                            </Button>
                        </Stack>
                        //استخدام کارکنان جدید
                        //اخراج کارکنان
                    }
                </List>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>استخدام</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            کد کاربری را که میخواهید به این کسب و کار اضافه شود وارد نمایید
                        </DialogContentText>
                        <DialogContentText>
                            کد کاربری را می توانید در پروفایل کاربران مشاهده نمایید
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            id="name"
                            name="userCode"
                            label="کد چهار رقمی کاربر"
                            variant="standard"
                            inputProps={{ maxLength: 4 }}
                            onChange={changeHandler}

                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>لغو</Button>
                        <Button onClick={(e) => { sendJobOffer(e) }}>ارسال پیشنهاد کار</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}
