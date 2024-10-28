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
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import { ListItemButton } from "@mui/material";
import { useRouter } from 'next/navigation';



export default function EmployeeList({ business, logedUserCode, users, maxLengthError }) {
    const router = useRouter()

    const [open, setOpen] = React.useState(false);
    const [newValue, setNewValue] = React.useState(null);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [dialogMessage, setDialogMessage] = React.useState("");
    const ReportContentForJobOffer = {
        recepiantCode: newValue,
        business,
        title: "jobOffer",
    }
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };
    const handleShowSnackbar = () => {
        setOpenSnackbar(true);
    };

    const changeHandler = (e) => {
        if (isNaN(e.target.value)) {
            maxLengthError("فقط اعداد قابل قبول هستند")
        } else {
            setNewValue(e.target.value);
        }
    };

    const signHandler = () => {
        setDialogMessage("استخدام")
        setOpen(true);
    };
    const dismissHandler = () => {
        setDialogMessage("اخراج")
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    async function sendJobOffer() {
        const res = await fetch('/api/reports/createReport', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ReportContentForJobOffer)
        })
        if (res.status === 201) {
            handleShowSnackbar()
        } else if (res.status === 500) {
            maxLengthError("خطای اتصال به سرور")
        } else if (res.status === 403) {
            maxLengthError("تنها نماینده کسب و کار مجاز به استخدام نیروهاست")
        } else if (res.status === 404) {
            maxLengthError("کاربر وارد شده یافت نشد کد وارد شده را مجدد بررسی نمایید")
        } else if (res.status === 405) {
            maxLengthError("عضویت در بیش از 3 کسب و کار مجاز نیست")
        } else if (res.status === 406) {
            maxLengthError("شما نمی توانید برای خودتان درخواست استخدام ارسال نمایید")
        } else if (res.status === 409) {
            maxLengthError("این کاربر قبلا در این کسب و کار استخدام شده است")
        } else if (res.status === 410) {
            maxLengthError("این پیشنهاد کار قبلا ارسال شده و منتظر پاسخ است")
        }
    }

    async function dismissalHandler() {
        const res = await fetch('/api/dismissal', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recepiantCode: newValue, business })
        })
        if (res.status === 201) {
            handleShowSnackbar()
        } else {
            console.log("res", res);
        }
    }
    const actionHandler = () => {

        if (dialogMessage === "استخدام") {
            sendJobOffer()
        }
        if (dialogMessage === "اخراج") {
            dismissalHandler()
        }
    };


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
                                    <ListItemButton onClick={() => router.push(`/${worker.code}`)}>
                                        <ListItemAvatar >
                                            <Avatar sx={{ width: 40, height: 40 }}>
                                                <ItsAvatar isAvatar={worker.isAvatar} userCodeOrBusinessBrand={worker.code} alt="workers avatar" />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            align='right'
                                            primary={Number(business.agentCode) === Number(worker.code) ? worker.userName + " — " + " نماینده" : worker.userName}
                                            secondary={worker.bio}
                                        />
                                        <ListItemText />
                                    </ListItemButton>
                                </ListItem>
                                <Divider variant="inset" />
                            </React.Fragment>
                        )
                    }))}
                    {logedUserCode === Number(business.agentCode) &&
                        <Stack display={"flex"} justifyContent={"flex-end"} direction="row" spacing={2} sx={{ direction: "ltr" }}>
                            <Button variant="outlined" color="error" startIcon={<DeleteIcon />}
                                onClick={() => dismissHandler()}>
                                اخراج
                            </Button>
                            <Button color="success" variant="outlined" endIcon={<SendIcon />}
                                onClick={() => signHandler()}>
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
                    <DialogTitle>{dialogMessage}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            کد کاربری را که میخواهید {dialogMessage} شود را وارد نمایید
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
                        <Button onClick={actionHandler}>{dialogMessage}</Button>
                    </DialogActions>
                </Dialog>
                <CustomSnackbar
                    open={openSnackbar}
                    onClose={() => { handleSnackbarClose, location.reload() }}
                    message={`گزارش ${dialogMessage} جهت آگاهی کاربر به ایشان ارسال شد`} />
            </Box>
        </Box>
    );
}
