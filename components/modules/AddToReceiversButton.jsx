"use client"
import { Avatar, AvatarGroup, Box, Button, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
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

    const [answer, setAnswer] = useState(false)
    const [isAnswerNeed, setIsAnswerNeed] = useState(false)
    const [isDisable, setIsDisable] = useState(false)
    const [openDialog, setOpenDialog] = useState(false);
    const [newValue, setNewValue] = useState(null);

    const isNotOwner = Number(logedUser.code) !== Number(business.agentCode)

    const logedUserBusinesses = logedUser.businesses.map(business => {
        if (business.agentCode == logedUser.code) {
            return business
        }
    })

    // buttonText
    const providerBusinessNames = relations
        .filter((relation) => {
            return logedUserBusinesses.some(businessItem => businessItem._id === relation.provider._id)
        }).map(relation => {
            const matchingBusiness = logedUserBusinesses.find(businessItem => businessItem._id === relation.provider._id);
            if (relation.isAnswerNeed) {
                return `منتظر پاسخ ${matchingBusiness.businessBrand}`;
            } else {
                return `دریافت کننده محصول از ${matchingBusiness.businessBrand}`;
            }
        })
    const buttonText = providerBusinessNames[0] ? `${[...providerBusinessNames]} ` : "ارائه محصول به این کسب و کار";

    //checkBox
    const [selectedBusinesses, setSelectedBusinesses] = useState(logedUserBusinesses.map(business => business._id));
    console.log("selectedBusinesses", selectedBusinesses);

    // const ListItemButtonHandler = (event) => {
    //     console.log("event", );
    //     const currentIndex = selectedBusinesses.indexOf(value);
    //     const newSelected = [...selectedBusinesses];

    //     if (currentIndex === -1) {
    //       // If the business is not selected, add it
    //       newSelected.push(value);
    //     } else {
    //       // Otherwise, remove it
    //       newSelected.splice(currentIndex, 1);
    //     }

    //     setSelectedBusinesses(newSelected);
    // };
    function handleToggle(e, value) {
        console.log(value);

       const isSelected = selectedBusinesses.includes(e);

        setSelectedBusinesses((prevSelectedBusinesses) => {
            if (isSelected) {
                return prevSelectedBusinesses.filter((item) => item !== e); // Remove from selection
            } else {
                return [...prevSelectedBusinesses, e]; // Add to selection
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
    const [open201Snackbar, setOpen201Snackbar] = useState(false);
    const [openSnackbar407Error, setOpenSnackbar407Error] = useState(false);
    const [openSnackbar500Error, setOpenSnackbar500Error] = useState(false);
    const [openSnackbarNonSelectedError, setOpenSnackbarNonSelectedError] = useState(false);

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
    const [isLoading, setIsLoading] = useState(false);


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
        isNotOwner && logedUserBusinesses[0] &&
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
                            {logedUserBusinesses[1] ? "این کسب و کار مجاز به دریافت محصولات کدام کسب و کار شما شود؟" : "کسب و کار شما"}
                        </DialogContentText>
                        <List component="div" disablePadding>
                            {logedUserBusinesses.map((business) => (
                                <ListItem
                                    key={business._id}
                                    disablePadding
                                >
                                    <ListItemButton
                                        key={business._id}
                                        value={business._id}
                                        sx={{ minWidth: '250px' }}
                                        onClick={(event) => handleToggle(event.currentTarget.getAttribute('value'))}
                                    >
                                        <Avatar>
                                            <ItsAvatar isAvatar={business.isAvatar} userCodeOrBusinessBrand={business.businessName} />
                                        </Avatar>
                                        <ListItemText sx={{ mr: 1 }} align='right' primary={business.businessName} secondary={business.businessBrand} />
                                        {logedUserBusinesses[1] &&
                                            <Checkbox
                                                edge="end"
                                                onChange={(e, value) => handleToggle(e.target.value, value)}
                                                value={business._id}
                                                checked={selectedBusinesses.some(selected => selected == business._id)}
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
                >
                    {buttonText}
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
