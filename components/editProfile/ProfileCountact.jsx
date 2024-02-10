import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import EmailIcon from '@mui/icons-material/Email';
import Box from '@mui/material/Box'
import { Container, Typography } from '@mui/material';
const phone = "09305845526"
const ProfileCountact = () => {
    return (
        <Box>
            <Container maxWidth="md">

                <Box
                    sx={{ mb: 1 ,textDecoration:"none"}}

                    display="flex"
                    justifyContent="space-evenly"
                >
                    <Box display="flex" flexDirection="column" align='center'>
                        <Box><InstagramIcon fontSize="large" /></Box>
                        <Box><Typography >اینستاگرام</Typography></Box>

                    </Box>
                    {/* < sx={{ pr: 2 }} display="flex" flexDirection="column" align='center'> */}


                    <a href={`tel:${phone}`}>
                        <AddIcCallIcon fontSize="large" />
                        <Typography >تماس</Typography>
                    </a>
                <Box sx={{ pr: 2 }} display="flex" flexDirection="column" align='center'>
                    <Box><EmailIcon fontSize="large" /></Box>
                    <Box><Typography >ایمیل</Typography></Box>
                </Box>
        </Box >
            </Container >
        </Box >
    )
}

export default ProfileCountact
