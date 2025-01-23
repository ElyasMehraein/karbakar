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

export default function AddToReceiversButton({ relations, logedUser, business }) {

    const [answer, setAnswer] = useState(false)
    const [isAnswerNeed, setIsAnswerNeed] = useState(false)

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
                return ` منتظر پاسخ به ${matchingBusiness.businessBrand}`;
            } else {
                return `دریافت کننده محصول از ${matchingBusiness.businessBrand}`;
            }
        })
    const buttonText = providerBusinessNames[0] ? `${[...providerBusinessNames]} ` : "ارائه محصول به این کسب و کار";

    //checkBox
    const logedUserProviders = relations.filter(relation => {
        return logedUserBusinesses.find(business => business._id === relation.provider._id);
    }).map((relation) => relation.provider._id);

    const [selectedBusinesses, setSelectedBusinesses] = useState(logedUserProviders);

    function handleToggle(e) {
        setSelectedBusinesses((prevSelectedBusinesses) => {
            if (selectedBusinesses.includes(e)) {
                return prevSelectedBusinesses.filter((item) => item !== e);
            } else {
                return [...prevSelectedBusinesses, e];
            }
        });
    }


    //Snackbar

    const [open200Snackbar, setOpen200Snackbar] = useState(false);
    const [open201Snackbar, setOpen201Snackbar] = useState(false);
    const [openSnackbar409Error, setOpenSnackbar409Error] = useState(false);
    const [openSnackbar500Error, setOpenSnackbar500Error] = useState(false);
    const [openSnackbarNonSelectedError, setOpenSnackbarNonSelectedError] = useState(false);
    const [openSnackbarNoChangeError, setOpenSnackbarNoChangeError] = useState(false);
    const [businessRelationReportSnackbar, setBusinessRelationReportSnackbar] = useState(false);

    function handleSnackbarClose() {
        setOpen201Snackbar(false);
        setOpen200Snackbar(false);
        setOpenSnackbar409Error(false);
        setOpenSnackbarNonSelectedError(false);
        setOpenSnackbarNoChangeError(false);
        setOpenSnackbar500Error(false);
        setBusinessRelationReportSnackbar(false);
    };
    const handleShow201Snackbar = () => {
        setOpen201Snackbar(true);
    };


    // Dialog
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpen = () => {
        setOpenDialog(true)
    }
    const handleClose = () => {
        setOpenDialog(false);
    };
    const [isLoading, setIsLoading] = useState(false);
    const confirmHandler = () => {
        const ids1 = new Set(selectedBusinesses.map(id => id));
        const ids2 = new Set(logedUserProviders.map(id => id));
        if (ids1.size === ids2.size && [...ids1].every(id => ids2.has(id))) {
            setOpenSnackbarNoChangeError(true)
            return;
        }

        const removedItems = [...ids2].filter(id => !ids1.has(id));
        if (removedItems.length > 0) {
            removedItems.map((provider) => {
                try {
                    deleteABusinessRelation(provider, business._id)
                } catch (err) {
                    console.log("errr", err);
                }
                return
            })
        }

        const addedItems = [...ids1].filter(id => !ids2.has(id));
        if (addedItems.length > 0) {
            addedItems.map((provider) => {
                try {
                    addThisBusinessToMyBusinessReceivers(provider, business._id)
                } catch (err) {
                    console.log("errr", err);
                }
            })
        }
    }


    //Server Actions
    async function sendBusinessRelationReport(businessRelation) {

        const res = await fetch('api/reports/businessRelationReport', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ businessRelation })
        })
        if (res.status === 500) {
            console.log("server error");
            setOpenSnackbar500Error(true)
            setIsLoading(false)
        } else if (res.status === 201) {
            setIsLoading(false)
            console.log("businessRelationReport created successfully");
            setBusinessRelationReportSnackbar(true)
        }
    }
    async function addThisBusinessToMyBusinessReceivers(provider, receiver) {
        setIsLoading(true)
        const res = await fetch('api/setBusinessReceiver', {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ provider, receiver })
        })
        if (res.status === 500) {
            console.log("server error");
            setOpenSnackbar500Error(true)
            setIsLoading(false)
        } else if (res.status === 201) {
            const { data } = await res.json();
            setIsLoading(false)
            console.log("set BusinessReceiver successfully");
            handleShow201Snackbar(true)
            sendBusinessRelationReport(data._id)
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
            setOpenSnackbar409Error(true)
        }
        setIsLoading(false)

    }


    async function deleteABusinessRelation(provider, receiver) {
        const res = await fetch('api/deleteABusinessRelation', {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ provider, receiver })
        })
        if (res.status === 500) {
            console.log("server error");
            setOpenSnackbar500Error(true)
            setIsLoading(false)
        } else if (res.status === 200) {
            setIsLoading(false)
            console.log("BusinessRelation removed successfully");
            setOpen200Snackbar(true)
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
            setOpenSnackbar409Error(true)
        }
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
                    <DialogTitle>تعهدات شما</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText>
                            به این کسب و کار محصول می دهید؟
                        </DialogContentText> */}
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
                                            <ItsAvatar  userCodeOrBusinessBrand={business.businessName} />
                                        </Avatar>
                                        <ListItemText sx={{ mr: 1 }} align='right' primary={business.businessName} secondary={business.businessBrand} />
                                        <Checkbox
                                            edge="end"
                                            // onChange={(e) => handleToggle(e.target.value)}
                                            value={business._id}
                                            checked={selectedBusinesses?.some(selected => selected == business._id)}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>لغو</Button>
                        <Button onClick={confirmHandler}>تایید</Button>
                    </DialogActions>
                </Dialog>
                <Button
                    dir="ltr"
                    onClick={handleOpen}
                    fullWidth
                    sx={{ m: 1 }}
                    variant="contained"
                >
                    {buttonText}
                </Button>
                <CustomSnackbar
                    open={open201Snackbar}
                    onClose={() => { location.reload() }}
                    message={"درخواست شما با موفقیت ثبت شد"}
                />
                <CustomSnackbar
                    open={open200Snackbar}
                    onClose={() => { location.reload() }}
                    message={"حذف رابطه با موفقیت انجام شد"}
                />
                <CustomSnackbar
                    open={openSnackbar409Error}
                    onClose={() => { handleSnackbarClose() }}
                    message={"درخواست تکراری"}
                    severity="error"
                />
                <CustomSnackbar
                    open={openSnackbarNoChangeError}
                    onClose={() => { handleSnackbarClose() }}
                    message={"هنوز تغییری اعمال نکرده اید"}
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
                <CustomSnackbar
                    open={businessRelationReportSnackbar}
                    onClose={() => { handleSnackbarClose() }}
                    message={"گزارش درخواست ارائه محصول برای نماینده کسب و کار ارسال شد"}
                />
            </Box>
        </Container>
    )
}
