import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import EmailIcon from '@mui/icons-material/Email';
import WebIcon from '@mui/icons-material/Web';
import ComputerIcon from '@mui/icons-material/Computer';
import Box from '@mui/material/Box'
import { Container, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

const phone = "09305845526"
const email = "aa@bb.com"
const personalPage = "google.com"
const Instagram = "instagram.com"

const ProfileCountact = () => {
    return (
        <Box>
            <Container maxWidth="md">

                <Box
                    sx={{ mb: 1 }}
                >
                    <Box display="flex" alignItems="center" align='center'>
                        <Box><AddIcCallIcon fontSize="large" /></Box>
                        <Box sx={{ width: '7ch', mx: 3 }}><Typography >تماس</Typography></Box>
                        <TextField 
                            id="outlined-helperText"
                            label="مثال 09123456789"
                        />

                    </Box>
                    <Box
                        display="flex" alignItems="center" align='center' >
                        <Box><EmailIcon fontSize="large" /></Box>
                        <Box sx={{width: '7ch', mx: 3 }}><Typography >ایمیل</Typography></Box>
                        <TextField
                            id="outlined-helperText"
                            label="مثال 09123456789"
                        />

                    </Box>
                    <Box display="flex" alignItems="center" align='center'>
                        <Box><ComputerIcon fontSize="large" /></Box>
                        <Box sx={{ width: '7ch',mx: 3 }}><Typography >صفحه شخصی</Typography></Box>
                        <TextField
                            id="outlined-helperText"
                            label="مثال 09123456789"
                        />

                    </Box>
                    <Box display="flex" alignItems="center" align='center'>
                        <Box><InstagramIcon fontSize="large" /></Box>
                        <Box sx={{width: '7ch', mx: 3 }}><Typography >اینستاگرام</Typography></Box>
                        <TextField
                            id="outlined-helperText"
                            label="مثال 09123456789"
                        />

                    </Box>
                </Box>
            </Container >
        </Box >
    )
}

export default ProfileCountact
