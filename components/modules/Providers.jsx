"use client"
import { Avatar, AvatarGroup, Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import ItsAvatar from './ItsAvatar'

export default function Providers({ relations, business }) {

    let receivers = relations?.filter((relation) => {

        relation.receiver._id == business._id
    })
    
    console.log("juju", receivers )


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
                    </AvatarGroup>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography color="NavyDarkSlateGray" variant="button" >
                        تامین کنندگان
                    </Typography>
                </Button>
            </Box>
        </Container>
    )
}
