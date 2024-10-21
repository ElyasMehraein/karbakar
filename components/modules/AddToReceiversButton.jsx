"use client"
import { Avatar, AvatarGroup, Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import { ListItemButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

export default function AddToReceiversButton({ business }) {
    const [receivers, setReceivers] = React.useState(business.receivers)
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
    const actionHandler = () => {

        if (dialogMessage === "استخدام") {
            sendJobOffer()
        }
        if (dialogMessage === "اخراج") {
            dismissalHandler()
        }
    };
    async function addThisBusinessToMyBusinessReceivers() {

        // const res = await fetch('api/setBusinessReceivers', {
        //     method: "PUT",
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ businessID: selectedBusiness._id, receivers })
        // })
        // if (res.status === 500) {
        //     console.log("server error");
        //     setOpenSnackbar500Error(true)
        //     setIsLoading(false)
        // } else if (res.status === 201) {
            console.log("updateMonthlyCommitment sited successfully");
            handleShowSnackbar()
            // setIsLoading(false)
        // } else if (res.status === 404) {
        //     setOpenSnackbar404Error(true)
        //     setIsLoading(false)
        // } else if (res.status === 406) {
        //     setOpenSnackbarError(true)
        //     setIsLoading(false)
        // } else if (res.status === 407) {
        //     setOpenSnackbar407Error(true)
        //     setIsLoading(false)
        // }
    }
    return (
        <Container
            sx={{ display: "flex", justifyContent: "center", alignItems: 'center' }}
        >
            <Box sx={{
                display: "flex", flexDirection: { xs: "column", md: "row" },
                minWidth: { xs: 280, sm: 500, md: 900 },
            }} >
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
                <Button onClick={addThisBusinessToMyBusinessReceivers} fullWidth sx={{ m: 1 }} dir="ltr" variant="contained">
                    ارائه محصول به این کسب و کار
                </Button>
                <CustomSnackbar
                    open={openSnackbar}
                    onClose={() => { handleSnackbarClose, location.reload() }}
                    message={"درخواست شما با موفقیت ثبت شد"}
                />
            </Box>
        </Container>
    )
}
