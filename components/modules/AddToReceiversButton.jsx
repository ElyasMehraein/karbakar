"use client"
import { Avatar, AvatarGroup, Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ItsAvatar from './ItsAvatar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';

export default function AddToReceiversButton({ relations, logedUser, business }) {
    const isNotOwner = Number(logedUser.Code) !== Number(business.agentCode)
    const userBusinesses = logedUser.businesses.map(business => {
        // if (business.agentCode === logedUser.code) {
        return business

    })
    console.log("userBusinesses", userBusinesses);

    const [answer, setAnswer] = React.useState(false)
    const [isAnswerNeed, setIsAnswerNeed] = React.useState(false)
    const [isDisable, setIsDisable] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false);
    const [newValue, setNewValue] = React.useState(null);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    // const [dialogMessage, setDialogMessage] = React.useState("اضافه به کسب و کار");

    const ButtonText = isAnswerNeed ? "منتظر پاسخ" : answer ? `دریافت کننده محصولات${logedUser.code}` : "ارائه محصول به این کسب و کار"

    const [checked, setChecked] = React.useState([1]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    let providers = relations?.filter(relation => relation.provider.equals(business._id));
    let receivers = relations?.filter(relation => relation.receiver.equals(business._id));


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

    const businessSelectHandler = (e) => {
        setOpenDialog(!openDialog)
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
        setOpenDialog(false);
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
    const clickHandler = () => {
        setOpenDialog(true)
        setIsDisable(true)

    }
    return (
        isNotOwner &&
        <Container
            sx={{ display: "flex", justifyContent: "center", alignItems: 'center' }}
        >
            <Box sx={{
                display: "flex", flexDirection: { xs: "column", md: "row" },
                minWidth: { xs: 280, sm: 500, md: 900 },
            }} >
                <Dialog
                    open={openDialog}
                    onClose={handleClose}
                >
                    <DialogTitle>افزودن به لیست دریافت کنندگان</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            مجاز به دریافت محصول از کدام کسب و کار شود؟
                        </DialogContentText>
                        <List>
                            <Collapse in={openDialog} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {userBusinesses.map((business) => (
                                        <ListItem
                                            key={business._id}
                                            disablePadding
                                        >
                                            <ListItemButton
                                                key={business._id}
                                                value={business._id}
                                                sx={{ minWidth: '250px' }}
                                            // onClick={() => handleBusinessChange(business)}
                                            >
                                                <Avatar>
                                                    <ItsAvatar isAvatar={business.isAvatar} userCodeOrBusinessBrand={business.businessName} />
                                                </Avatar>
                                                <ListItemText sx={{ mr: 1 }} align='right' primary={business.businessName} secondary={business.businessBrand} />
                                                <Checkbox
                                                    edge="end"
                                                    // onChange={handleToggle(value)}
                                                    // checked={checked.includes(value)}
                                                    // inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse >
                        </List >

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>لغو</Button>
                        <Button onClick={handleClose}>تایید</Button>
                    </DialogActions>
                </Dialog>
                <Button
                    dir="ltr"
                    onClick={clickHandler}
                    fullWidth
                    sx={{ m: 1 }}
                    variant="contained"
                    disabled={isDisable}

                >
                    {ButtonText}
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
