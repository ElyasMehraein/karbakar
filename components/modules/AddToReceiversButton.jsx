"use client"
import { Avatar, AvatarGroup, Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import ItsAvatar from './ItsAvatar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import LoadingButton from '@mui/lab/LoadingButton';

export default function AddToReceiversButton({ relations, logedUser, business }) {
    const isNotOwner = Number(logedUser.code) !== Number(business.agentCode)

    const userBusinesses = logedUser.businesses.map(business => {
        if (business.agentCode == logedUser.code) {
            return business
        }
    })


    const [answer, setAnswer] = React.useState(false)
    const [isAnswerNeed, setIsAnswerNeed] = React.useState(false)
    const [isDisable, setIsDisable] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false);
    const [newValue, setNewValue] = React.useState(null);


    const ButtonText = isAnswerNeed ? "منتظر پاسخ" : answer ? `دریافت کننده محصولات${logedUser.code}` : "ارائه محصول به این کسب و کار"

    //checkBox
    const [selectedBusinesses, setSelectedBusinesses] = React.useState(userBusinesses);
    function handleToggle(e) {
        const newValue = e.target.value;
        const isSelected = selectedBusinesses.includes(newValue);

        setSelectedBusinesses((prevSelectedBusinesses) => {
            if (isSelected) {
                return prevSelectedBusinesses.filter((item) => item !== newValue); // Remove from selection
            } else {
                return [...prevSelectedBusinesses, newValue]; // Add to selection
            }
        });
    }


    // let providers = relations?.filter(relation => relation.provider === business._id);
    // let receivers = relations?.filter(relation => relation.receiver === business._id);
    let test = relations.map((relation) => {
        logedUser.businesses.filter(logedUserBusiness => {
            
            return relation.provider == logedUserBusiness._id
        })
    })

    const ReportContentForJobOffer = {
        recepiantCode: newValue,
        business,
        title: "jobOffer",
    }

    //Snackbar
    const [open201Snackbar, setOpen201Snackbar] = React.useState(false);
    const [openSnackbar407Error, setOpenSnackbar407Error] = React.useState(false);
    const [openSnackbar500Error, setOpenSnackbar500Error] = React.useState(false);
    const [openSnackbarNonSelectedError, setOpenSnackbarNonSelectedError] = React.useState(false);

    function handleSnackbarClose() {
        setOpen201Snackbar(false);
        setOpenSnackbar407Error(false);
        setOpenSnackbarNonSelectedError(false);
    };
    const handleShow201Snackbar = () => {
        setOpen201Snackbar(true);
    };


    const confirmHandler = () => {
        if (!selectedBusinesses[0]) {
            setOpenSnackbarNonSelectedError(true)
        } else {
            selectedBusinesses.map((provider) => {
                try {
                    addThisBusinessToMyBusinessReceivers(provider, business._id)

                } catch (err) {
                    console.log("errr", err);
                }
            })
        }

    };

    const handleClose = () => {
        setOpenDialog(false);
    };
    const [isLoading, setIsLoading] = React.useState(false);


    async function addThisBusinessToMyBusinessReceivers(provider, receiver) {

        setIsLoading(true)
        const res = await fetch('api/setBusinessReceiver', {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ provider, receiver })
        })
        console.log("res", res);
        if (res.status === 500) {
            console.log("server error");
            setOpenSnackbar500Error(true)
            setIsLoading(false)
        } else if (res.status === 201) {
            setIsLoading(false)
            console.log("set BusinessReceiver successfully");
            handleShow201Snackbar()
        } else if (res.status === 401) {
            setIsLoading(false)
            console.log("log in first");
        } else if (res.status === 404) {
            setIsLoading(false)
            console.log("not found");
        } else if (res.status === 403) {
            setIsLoading(false)
            console.log("403 Unauthorized access");
        } else if (res.status === 409) {
            setIsLoading(false)
            setOpenSnackbar407Error(true)
        }
        setIsLoading(false)

    }
    const clickHandler = () => {
        setOpenDialog(true)
        setIsDisable(true)
        setIsLoading(true)
    }
    return (
        isNotOwner && userBusinesses[0] &&
        <Container
            sx={{ display: "flex", justifyContent: "center", alignItems: 'center' }}
        >
            <Box >
                <Dialog
                    open={openDialog}
                    onClose={handleClose}
                >
                    <DialogTitle>توجه</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {userBusinesses[1] ? "این کسب و کار مجاز به دریافت محصولات کدام کسب و کار شما شود؟" : "کسب و کار شما"}
                        </DialogContentText>
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
                                        {userBusinesses[1] &&
                                            <Checkbox
                                                edge="end"
                                                onChange={(e, value) => handleToggle(e, value)}
                                                value={business._id}
                                            />}
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <DialogContentText>
                            به ارائه محصول به این کسب و کار متعهد می شوید؟
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>لغو</Button>
                        <Button onClick={confirmHandler}>تایید</Button>
                    </DialogActions>
                </Dialog>
                <LoadingButton
                    dir="ltr"
                    onClick={clickHandler}
                    fullWidth
                    sx={{ m: 1 }}
                    variant="contained"
                    loading={isLoading}
                // disabled={isDisable}

                >
                    {ButtonText}
                </LoadingButton>
                <CustomSnackbar
                    open={open201Snackbar}
                    onClose={() => { location.reload() }}
                    message={"درخواست شما با موفقیت ثبت شد"}
                />
                <CustomSnackbar
                    open={openSnackbar407Error}
                    onClose={() => { handleSnackbarClose() }}
                    message={"درخواست تکراری"}
                    severity="error"
                />
                <CustomSnackbar
                    open={openSnackbarNonSelectedError}
                    onClose={() => { handleSnackbarClose() }}
                    message={"حداقل یک کسب و کار انتخاب کنید"}
                    severity="error"
                />
                <CustomSnackbar
                    open={openSnackbar500Error}
                    onClose={() => { handleSnackbarClose() }}
                    message={"خطای اتصال به سرور"}
                    severity="error"
                />
            </Box>
        </Container>
    )
}
