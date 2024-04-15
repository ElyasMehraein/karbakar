"use client"
import { Avatar, Box, Button, Container, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material'
import MyAppBar from '@/components/modules/MyAppBar'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Guild from "@/components/modules/Guild"
import { AllBusinessesText, selectGuild } from '@/components/typoRepo';
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import { green } from '@mui/material/colors';
import ItsAvatar from '@/components/modules/ItsAvatar'
import ShowMyLocation from '@/components/modules/ShowMyLocation'

export default function AllBusinesses({ }) {

    return (

        <>
            <MyAppBar business={null} logedUserCode={null} whichUserProfile={null} />
            <Container maxWidth="md">
                <Box className='inMiddle'
                    sx={{
                        '& .MuiTextField-root': { width: '30ch' },
                        my: 3
                    }}
                    display="flex" flexDirection="column">
                    <AllBusinessesText/>
                    <ShowMyLocation/>
                    <Guild
                    //  updateGuildname={updateGuildname} distinctGuilds={distinctGuilds} snackbarError={snackbarError}
                    />
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{ width: 40, height: 40 }} >
                                    <ItsAvatar userCodeOrBusinessBrand={1000} alt="workers avatar" />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText align='right' primary="Photos" secondary="Jan 9, 2014" />
                        </ListItem>
                    </List>
                </Box>
            </Container>
        </>
    )

}
