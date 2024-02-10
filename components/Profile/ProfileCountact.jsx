import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import EmailIcon from '@mui/icons-material/Email';
import WebIcon from '@mui/icons-material/Web';
import ComputerIcon from '@mui/icons-material/Computer';
import Box from '@mui/material/Box'
import { Container, Typography } from '@mui/material';

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

                    display="flex"
                    justifyContent="space-evenly"
                >
                    <Box display="flex" flexDirection="column" align='center'>
                        <a style={{ textDecoration: "none", color: "inherit" }} underline="none"
                            color="inherit" href={`tel:${phone}`}>
                            <Box><AddIcCallIcon fontSize="large" /></Box>
                            <Box><Typography >تماس</Typography></Box>
                        </a>
                    </Box>
                    <Box sx={{ pr: 2 }}
                        display="flex" flexDirection="column" align='center'>
                        <a style={{ textDecoration: "none", color: "inherit" }} underline="none"
                            color="inherit" href={`tel:${email}`}>
                            <Box><EmailIcon fontSize="large" /></Box>
                            <Box><Typography >ایمیل</Typography></Box>
                        </a>
                    </Box>
                    <Box sx={{ pr: 2 }} display="flex" flexDirection="column" align='center'>
                        <a style={{ textDecoration: "none", color: "inherit" }} underline="none"
                            color="inherit" href={`tel:${personalPage}`}>
                            <Box><ComputerIcon fontSize="large" /></Box>
                            <Box><Typography >صفحه شخصی</Typography></Box>
                        </a>
                    </Box>
                    <Box sx={{ pr: 2 }} display="flex" flexDirection="column" align='center'>
                        <a style={{ textDecoration: "none", color: "inherit" }} underline="none"
                            color="inherit" href={`tel:${Instagram}`}>
                            <Box><InstagramIcon fontSize="large" /></Box>
                            <Box><Typography >اینستاگرام</Typography></Box>
                        </a>
                    </Box>
                </Box>
            </Container >
        </Box >
    )
}

export default ProfileCountact
