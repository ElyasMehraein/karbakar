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


export default function ContactEdit({ user, business, maxLengthError }) {

    const [isSaving, setIsSaving] = useState(false);
    const { phone, email, personalPage, instagram } = user || business;
    const [newValue, setNewValue] = useState(null);
    const [expandedSection, setExpandedSection] = useState({
        phone: false,
        email: false,
        personalPage: false,
        instagram: false
    });

    //phoneChangeHandler
    const phoneChangeHandler = (e) => {
        let value = e.target.value;
        if (value.length === 11) {
            if (/^09\d*$/.test(e.target.value)) {
                setNewValue(e.target.value);
                setExpandedSection({ ...expandedSection, phone: true });
            } else {
                maxLengthError("شماره تماس بایستی متشکل از اعداد باشد و با 09 شروع شود");
            }
        } else if (value.length > 11) {
            maxLengthError();
            setExpandedSection({ ...expandedSection, phone: false });
        } else {
            setExpandedSection({ ...expandedSection, phone: false });
        }
    };

    //mailChangeHandler
    const mailChangeHandler = (e) => {
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value)) {
            setNewValue(e.target.value);
            setExpandedSection({ ...expandedSection, email: true });

        } else {
            setExpandedSection({ ...expandedSection, email: false });
        }
    };


    //instagramChangeHandler
    const instagramChangeHandler = (e) => {
        if (/^(?!.*\.\.)(?!.*\.$)[a-zA-Z0-9._]{5,30}$/.test(e.target.value)) {
            setNewValue(e.target.value);
            setExpandedSection({ ...expandedSection, instagram: true });

        } else {
            setExpandedSection({ ...expandedSection, instagram: false });
        }
    };


    //changeHandler
    const changeHandler = (e) => {
        setNewValue(e.target.value);
    };



    //saveHandler
    const saveHandler = async (fieldName) => {
        setIsSaving(true);
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
        setIsSaving(false);
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
                                label={isSaving ? "در حال ذخیره..." : "ذخیره"}
                                onClick={() => saveHandler("phone")}
                                icon={<DoneIcon />}
                                sx={{ direction: "ltr", }}

                            />
                        )}
                    </Box>

                    {/* Email Section */}
                    <Box sx={{ '& .MuiTextField-root': { width: '25ch' } }} display="flex" alignItems="center" align='center'>
                        <Box><EmailIcon fontSize="large" /></Box>
                        <Box sx={{ width: '7ch', mx: 3 }}><Typography sx={{ fontSize: "14px" }}>ایمیل</Typography></Box>
                        <TextField
                            size="small"
                            label="مثال example@gmail.com"
                            defaultValue={email}
                            onChange={mailChangeHandler}
                        />
                        {expandedSection.email && (
                            <Chip
                                label={isSaving ? "در حال ذخیره..." : "ذخیره"}
                                onClick={() => saveHandler("email")}
                                icon={<DoneIcon />}
                                sx={{ direction: "ltr", }}
                            />
                        )}
                    </Box>

                    {/* Instagram Section */}
                    <Box sx={{ mt: 1, '& .MuiTextField-root': { width: '25ch' } }} display="flex" alignItems="center" align='center'>
                        <Box><InstagramIcon fontSize="large" /></Box>
                        <Box sx={{ width: '7ch', mx: 3 }}><Typography sx={{ fontSize: "14px" }}>اینستاگرام</Typography></Box>
                        <TextField
                            size="small"
                            label="مثال:karbakar"
                            defaultValue={instagram}
                            onChange={instagramChangeHandler}
                        />
                        {expandedSection.instagram && (
                            <Chip
                                label={isSaving ? "در حال ذخیره..." : "ذخیره"}
                                onClick={() => saveHandler("instagram")}
                                icon={<DoneIcon />}
                                sx={{ direction: "ltr", }}
                            />
                        )}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
