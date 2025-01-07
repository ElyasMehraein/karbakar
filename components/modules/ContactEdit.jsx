"use client"

import React, { useState } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import EmailIcon from '@mui/icons-material/Email';
import ComputerIcon from '@mui/icons-material/Computer';
import Box from '@mui/material/Box';
import { Container, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import { Accordion, AccordionDetails } from '@mui/material';

export default function ContactEdit({ user, business, maxLengthError }) {

    const { phone, email, personalPage, instagram } = user || business;
    const [newValue, setNewValue] = useState(null);
    const [expandedSection, setExpandedSection] = useState({
        phone: false,
        email: false,
        personalPage: false,
        instagram: false
    });

    const phoneChangeHandler = (e) => {
        if (e.target.value.length === 11) {
            if (/^09\d*$/.test(e.target.value)) {
                setNewValue(e.target.value);
                setExpandedSection({ ...expandedSection, phone: true });
            } else {
                maxLengthError("شماره تماس بایستی متشکل از اعداد باشد و با 09 شروع شود");
            }
        }
    };

    const changeHandler = (e) => {
        setNewValue(e.target.value);
    };

    const saveHandler = async (fieldName) => {
        const model = user ? "UserModel" : "BusinessModel";
        const id = user ? user._id : business._id;
        await fetch("/api/updateDB", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ model, id, fieldName, newValue }),
        });
        setExpandedSection({ ...expandedSection, [fieldName]: false });
    };

    return (
        <Box>
            <Container maxWidth="md">
                <Box sx={{ py: 1, mb: 1 }}>
                    {/* Phone Section */}
                    <Box sx={{ my: 2, '& .MuiTextField-root': { width: '25ch' } }} display="flex" alignItems="center" align='center'>
                        <Box><AddIcCallIcon fontSize="large" /></Box>
                        <Box sx={{ width: '7ch', mx: 3 }}><Typography sx={{ fontSize: "14px" }}>تماس</Typography></Box>
                        <TextField
                            size="small"
                            label="مثال 09123456789"
                            defaultValue={phone}
                            onChange={phoneChangeHandler}
                        />
                        {expandedSection.phone && (
                            <Chip
                                label="ذخیره"
                                onClick={() => saveHandler("phone")}
                                icon={<DoneIcon />}
                            />
                        )}
                    </Box>

                    {/* Email Section */}
                    <Box sx={{ my: 2, '& .MuiTextField-root': { width: '25ch' } }} display="flex" alignItems="center" align='center'>
                        <Box><EmailIcon fontSize="large" /></Box>
                        <Box sx={{ width: '7ch', mx: 3 }}><Typography sx={{ fontSize: "14px" }}>ایمیل</Typography></Box>
                        <TextField
                            size="small"
                            label="مثال example@gmail.com"
                            defaultValue={email}
                            onChange={changeHandler}
                        />
                        {expandedSection.email && (
                            <Chip
                                label="ذخیره"
                                onClick={() => saveHandler("email")}
                                icon={<DoneIcon />}
                            />
                        )}
                    </Box>

                    {/* Instagram Section */}
                    <Box sx={{ my: 2, '& .MuiTextField-root': { width: '25ch' } }} display="flex" alignItems="center" align='center'>
                        <Box><InstagramIcon fontSize="large" /></Box>
                        <Box sx={{ width: '7ch', mx: 3 }}><Typography sx={{ fontSize: "14px" }}>اینستاگرام</Typography></Box>
                        <TextField
                            size="small"
                            label="مثال @username"
                            defaultValue={instagram}
                            onChange={changeHandler}
                        />
                        {expandedSection.instagram && (
                            <Chip
                                label="ذخیره"
                                onClick={() => saveHandler("instagram")}
                                icon={<DoneIcon />}
                            />
                        )}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
