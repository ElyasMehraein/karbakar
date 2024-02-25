"use client"

import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import EmailIcon from '@mui/icons-material/Email';
import ComputerIcon from '@mui/icons-material/Computer';
import Box from '@mui/material/Box'
import { Container, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import MyLocation from '../EditProfile/MyLocation';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';


const phone = "09305845526"
const email = "aa@bb.com"
const personalPage = "google.com"
const Instagram = "instagram.com"

const ProfileCountact = () => {

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    return (
        <Box>
            <Container maxWidth="md">

                <Box
                    sx={{py:1, mb: 1 }}
                >
                    <Box
                        sx={{ '& .MuiTextField-root': { width: '25ch' } }}
                        display="flex" alignItems="center" align='center'>

                        <Box><AddIcCallIcon fontSize="large" /></Box>
                        <Box sx={{ width: '7ch', mx: 3 }}><Typography sx={{ fontSize: "14px" }}>تماس</Typography></Box>
                        <TextField
                            size="small"
                            id="outlined-helperText"
                            InputLabelProps={{ sx: { fontSize: "14px" } }}
                            label="مثال 09123456789"
                        />
                        <Chip
                            label="ذخیره"
                            sx={{ direction: 'ltr' }}
                            onClick={handleClick}
                            icon={<DoneIcon />}
                        />
                    </Box>


                    <Box
                        sx={{ '& .MuiTextField-root': { width: '25ch' } }}
                        display="flex" alignItems="center" align='center'  >
                        <Box><EmailIcon fontSize="large" /></Box>
                        <Box sx={{ width: '7ch', mx: 3 }}><Typography sx={{ fontSize: "14px" }}>ایمیل</Typography></Box>
                        <TextField
                            id="outlined-helperText"
                            size="small"
                            InputLabelProps={{ sx: { fontSize: "14px" } }}
                            label="مثال karbakar@gmail.com"
                        />
                        <Chip
                            label="ذخیره"
                            sx={{ direction: 'ltr' }}
                            onClick={handleClick}
                            icon={<DoneIcon />}
                        />
                    </Box>
                    <Box
                        sx={{ '& .MuiTextField-root': { width: '25ch' } }}
                        display="flex" alignItems="center" align='center'>
                        <Box><ComputerIcon fontSize="large" /></Box>
                        <Box sx={{ width: '7ch', mx: 3 }}><Typography sx={{ fontSize: "14px" }}>صفحه شخصی</Typography></Box>
                        <TextField
                            id="outlined-helperText"
                            size="small"
                            InputLabelProps={{ sx: { fontSize: "14px" } }}
                            label="مثال karbakar.ir"
                        />
                        <Chip
                            label="ذخیره"
                            sx={{ direction: 'ltr' }}
                            onClick={handleClick}
                            icon={<DoneIcon />}
                        />
                    </Box>
                    <Box
                        sx={{ '& .MuiTextField-root': { width: '25ch' } }}
                        display="flex" alignItems="center" align='center'>
                        <Box><InstagramIcon fontSize="large" /></Box>
                        <Box sx={{ width: '7ch', mx: 3 }}><Typography sx={{ fontSize: "14px" }}>اینستاگرام</Typography></Box>
                        <TextField
                            id="outlined-helperText"
                            size="small"
                            InputLabelProps={{ sx: { fontSize: "14px" } }}
                            label="مثال instagram.com/karbakar.ir"
                        />
                        <Chip
                            label="ذخیره"
                            sx={{ direction: 'ltr' }}
                            onClick={handleClick}
                            icon={<DoneIcon />}
                        />
                    </Box>
                    <Box
                        sx={{ '& .MuiTextField-root': { width: '25ch' } }}
                        display="flex" alignItems="center" align='center'>
                        <Box><PersonPinCircleIcon fontSize="large" /></Box>
                        <Box sx={{ width: '7ch', mx: 3 }}><Typography sx={{ fontSize: "14px" }}>موقعیت مکانی</Typography></Box>
                        <MyLocation/>
                        <Chip
                            label="بروزرسانی موقعیت مکانی"
                            sx={{ direction: 'ltr' }}
                            onClick={handleClick}
                            icon={<DoneIcon />}
                        />
                    </Box>
                </Box>
                
            </Container >
        </Box >
    )
}

export default ProfileCountact
