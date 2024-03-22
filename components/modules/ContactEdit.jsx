"use client"

import React, { useState } from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import EmailIcon from '@mui/icons-material/Email';
import ComputerIcon from '@mui/icons-material/Computer';
import Box from '@mui/material/Box'
import { Container, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import { Accordion, AccordionDetails } from '@mui/material';

export default function contactEdit({ user, business, maxLengthError }) {

    const { phone, email, personalPage, instagram } = user || business
    const [newValue, setNewValue] = useState(null);

    const [expandedPhone, setExpandedPhone] = useState(false);
    const [expandedEmail, setExpandedEmail] = useState(false);
    const [expandedPersonalPage, setExpandedPersonalPage] = useState(false);
    const [expandedInstagram, setExpandedInstagram] = useState(false);

    const phoneChangeHandler = (e) => {
        if (e.target.value.length === 11) {
            if (/^09\d*$/.test(e.target.value)) {
                setNewValue(e.target.value);
                setExpandedPhone(true)
            } else {
                maxLengthError("شماره تماس بایستی متشکل از اعداد باشد و با 09 شروع شود")
            }
        }
    };
    const changeHandler = (e) => {
        setNewValue(e.target.value);
    }

    const saveHandler = async (fieldName) => {
        let model = user ? "UserModel" : "BusinessModel"
        let id = user ? user._id : business._id
        const res = await fetch("/api/updateDB", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model, id, fieldName, newValue
            }),
        });
    }
    return (
        <Box>
            <Container maxWidth="md">

                <Box
                    sx={{ py: 1, mb: 1 }}
                >
                    <Box
                        sx={{ my: 2, '& .MuiTextField-root': { width: '25ch' } }}
                        display="flex" alignItems="center" align='center'>
                        <Box><AddIcCallIcon fontSize="large" /></Box>
                        <Box sx={{ width: '7ch', mx: 3 }}><Typography sx={{ fontSize: "14px" }}>تماس</Typography></Box>
                        <Accordion expanded={expandedPhone}>
                            <TextField
                                inputProps={{
                                    inputMode: 'numeric',
                                    maxLength: 11,
                                }}
                                size="small"
                                id="outlined-helperText"
                                InputLabelProps={{ sx: { fontSize: "14px" } }}
                                label="مثال 09123456789"
                                defaultValue={phone}
                                onChange={(e) => {
                                    phoneChangeHandler(e);
                                }}
                            />
                            <AccordionDetails>
                                <Chip
                                    label="ذخیره"
                                    sx={{ mt: 1, direction: 'ltr' }}
                                    onClick={() => { saveHandler("phone"); setExpandedPhone(false) }}
                                    icon={<DoneIcon />}
                                />
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    <Box
                        sx={{ '& .MuiTextField-root': { width: '25ch' } }}
                        display="flex" alignItems="center" align='center'  >
                        <Box><EmailIcon fontSize="large" /></Box>
                        <Box sx={{ width: '7ch', mx: 3 }}><Typography sx={{ fontSize: "14px" }}>ایمیل</Typography></Box>
                        <Accordion sx={{ pt: 2, }} expanded={expandedEmail}>
                            <TextField
                                id="outlined-helperText"
                                size="small"
                                InputLabelProps={{ sx: { fontSize: "14px" } }}
                                label="مثال karbakar@gmail.com"
                                defaultValue={email}
                                onChange={(e) => {
                                    changeHandler(e);
                                    setExpandedEmail(true)
                                }}
                            />
                            <Chip
                                label="ذخیره"
                                sx={{ mt: 1, direction: 'ltr' }}
                                onClick={() => { saveHandler("email"); setExpandedEmail(false) }}
                                icon={<DoneIcon />}
                            />
                        </Accordion>
                    </Box>
                    <Box
                        sx={{ my: 2, '& .MuiTextField-root': { width: '25ch' } }}
                        display="flex" alignItems="center" align='center'>
                        <Box><ComputerIcon fontSize="large" /></Box>
                        <Box sx={{ width: '7ch', mx: 3 }}><Typography sx={{ fontSize: "14px" }}>صفحه شخصی</Typography></Box>
                        <Accordion sx={{ pt: 2, }} expanded={expandedPersonalPage}>
                            <TextField
                                id="outlined-helperText"
                                size="small"
                                InputLabelProps={{ sx: { fontSize: "14px" } }}
                                label="مثال karbakar.ir"
                                defaultValue={personalPage}
                                onChange={(e) => {
                                    changeHandler(e);
                                    setExpandedPersonalPage(true)
                                }}
                            />
                            <Chip
                                label="ذخیره"
                                sx={{ mt: 1, direction: 'ltr' }}
                                onClick={() => { saveHandler("personalPage"); setExpandedPersonalPage(false) }}
                                icon={<DoneIcon />}
                            />
                        </Accordion>
                    </Box>
                    <Box
                        sx={{ my: 2, '& .MuiTextField-root': { width: '25ch' } }}
                        display="flex" alignItems="center" align='center'>
                        <Box><InstagramIcon fontSize="large" /></Box>
                        <Box sx={{ width: '7ch', mx: 3 }}><Typography sx={{ fontSize: "14px" }}>اینستاگرام</Typography></Box>
                        <Accordion sx={{ pt: 2, }} expanded={expandedInstagram}>
                            <TextField
                                id="outlined-helperText"
                                size="small"
                                InputLabelProps={{ sx: { fontSize: "14px" } }}
                                label="مثال instagram.com/karbakar.ir"
                                defaultValue={instagram}
                                onChange={(e) => {
                                    changeHandler(e);
                                    setExpandedInstagram(true)
                                }}
                            />
                            <Chip
                                label="ذخیره"
                                sx={{ mt: 1, direction: 'ltr' }}
                                onClick={() => { saveHandler("instagram"); setExpandedInstagram(false) }}
                                icon={<DoneIcon />}
                            />
                        </Accordion>
                    </Box>

                </Box>

            </Container >
        </Box >
    )
}
