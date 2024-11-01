"use client"
import { Avatar, AvatarGroup, Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import ItsAvatar from './ItsAvatar'

export default function Receivers({business}) {
    const [receivers, setReceivers] = React.useState(business.receivers)

    async function addThisBusinessToMyBusinessReceivers() {

        const res = await fetch('api/setBusinessReceivers', {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ businessID: selectedBusiness._id, receivers })
        })
        if (res.status === 500) {
            console.log("server error");
            setOpenSnackbar500Error(true)
            setIsLoading(false)
        } else if (res.status === 201) {
            console.log("updateMonthlyCommitment sited successfully");
            handleShowSnackbar()
            setIsLoading(false)
        } else if (res.status === 404) {
            setOpenSnackbar404Error(true)
            setIsLoading(false)
        } else if (res.status === 406) {
            setOpenSnackbarError(true)
            setIsLoading(false)
        } else if (res.status === 407) {
            setOpenSnackbar407Error(true)
            setIsLoading(false)
        }
    }
    return (
        <Container
            sx={{ display: "flex", justifyContent: "center", alignItems: 'center' }}
        >
            <Box sx={{
                display: "flex", flexDirection: { xs: "column", md: "row" },
                minWidth: { xs: 280, sm: 500, md: 900 },
            }} >
                <Button fullWidth sx={{ m: 1 }} dir="ltr" variant="outlined">
                    <AvatarGroup max={4}>
                        <Avatar>
                            <ItsAvatar userCodeOrBusinessBrand={"nikkala"} isAvatar={true} alt="none" />
                        </Avatar>
                        <Avatar>

                            <ItsAvatar userCodeOrBusinessBrand={"sobhanmine"} isAvatar={true} alt="none" />
                        </Avatar>
                        <Avatar>

                            <ItsAvatar userCodeOrBusinessBrand={"modelpelast"} isAvatar={true} alt="none" />
                        </Avatar>
                        <Avatar>

                            <ItsAvatar userCodeOrBusinessBrand={"shahramfarm"} isAvatar={true} alt="none" />
                        </Avatar>

                    </AvatarGroup>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography color="NavyDarkSlateGray" variant="button" >
                        دریافت کنندگان
                    </Typography>
                </Button>
            </Box>
        </Container>
    )
}
