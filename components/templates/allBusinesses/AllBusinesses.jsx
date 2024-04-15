"use client"
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import MyAppBar from '@/components/modules/MyAppBar'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Guild from "@/components/modules/Guild"
import { selectGuild } from '@/components/typoRepo';
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import { green } from '@mui/material/colors';

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
                    <Typography>salam khobi</Typography>
                    <Typography sx={{ fontSize: 12 }} >یک نام برای کسب و کار خودانتخاب کنید</Typography>
                    <TextField
                        required
                        size='small'
                        // error={snackbarError}
                        sx={{ my: 3 }}
                        placeholder='حداکثر 30 کارکتر' variant="outlined"
                        label="نام کسب و کار"
                        // onChange={(e) => { setSnackbarError(false); setBusinessName(e.target.value) }}
                    />
                    <Typography sx={{ py: 1, textAlign: "center", fontSize: 12 }}>{selectGuild}</Typography>

                    <Guild 
                    //  updateGuildname={updateGuildname} distinctGuilds={distinctGuilds} snackbarError={snackbarError}
                      />

                </Box>
            </Container>
        </>
    )

}
