import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import EmailIcon from '@mui/icons-material/Email';
import Box from '@mui/material/Box'
import { Container, Typography } from '@mui/material';

const ProfileCountact = () => {
    return (
        <Box>
            <Container maxWidth="md">

                <Box
                    sx={{ mb: 1 }}

                    display="flex"
                    justifyContent="space-evenly"
                >
                    <Box display="flex" flexDirection="column" align='center'>
                        <Box><InstagramIcon fontSize="large" /></Box>
                        <Box><Typography >اینستاگرام</Typography></Box>
                    </Box>
                    <Box sx={{ pr: 2 }} display="flex" flexDirection="column" align='center'>
                        <Box><AddIcCallIcon fontSize="large" /></Box>
                        <Box><Typography >تماس</Typography></Box>
                    </Box>
                    <Box sx={{ pr: 2 }} display="flex" flexDirection="column" align='center'>
                        <Box><EmailIcon fontSize="large" /></Box>
                        <Box><Typography >ایمیل</Typography></Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default ProfileCountact
