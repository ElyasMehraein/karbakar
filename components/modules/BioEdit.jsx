"use client"
import { Box, Container, TextField, } from '@mui/material'
import React, { useState } from 'react'
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import { Accordion, AccordionDetails, } from '@mui/material';
import saveHandler from '@/utils/saveHandler';
export default function BioEdit({ user, business, maxLengthError }) {
    const [newValue, setNewValue] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const changeHandler = (e) => {
        if (e.target.value.length > 149) {
            maxLengthError()
            setExpanded(false)
        }
        setExpanded(true);
        setNewValue(e.target.value);
    };

    return (
        <Container maxWidth="md">
            <Accordion expanded={expanded}>
                <Box
                    display="flex"
                    justifyContent='center'
                    sx={{ my: 1 }}
                >
                    <TextField
                        display="flex"
                        defaultValue={user ? user.bio : business?.bio}
                        id="outlined-multiline-static"
                        label="معرفی 150 کارکتری"
                        multiline
                        rows={2}
                        inputProps={{ maxLength: 150 }}
                        fullWidth
                        onChange={changeHandler}
                    />
                </Box>
                <AccordionDetails>
                    <Chip
                        label="ذخیره"
                        sx={{ mt: 1, direction: 'ltr' }}
                        onClick={() => saveHandler(user, business, "bio", newValue, setExpanded)}
                        icon={<DoneIcon />}
                    />
                </AccordionDetails>
            </Accordion>
        </Container>
    )
}