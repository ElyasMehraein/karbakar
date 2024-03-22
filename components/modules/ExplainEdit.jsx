"use client"
import { Box, Container, TextField, } from '@mui/material'
import React, { useState } from 'react'
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from '@mui/material';
import saveHandler from '@/utils/saveHandler';

export default function ExplainEdit({ user, business, maxLengthError }) {
    const [newValue, setNewValue] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const changeHandler = (e) => {
        setExpanded(true);
        setNewValue(e.target.value);
        if (e.target.value.length > 299) {
            maxLengthError()
            setExpanded(false)
        }
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
                        inputProps={{ maxLength: 300 }}

                        display="flex"
                        defaultValue={user ? user.explain : business?.explain}
                        id="outlined-multiline-static"
                        label="توضیحات 300 کارکتری"
                        multiline
                        rows={4}
                        fullWidth
                        onChange={changeHandler}
                    />
                </Box>
                <AccordionDetails>
                    <Chip
                        label="ذخیره"
                        sx={{ mt: 1, direction: 'ltr' }}
                        onClick={() => saveHandler(user, business, "explain", newValue, setExpanded)}
                        icon={<DoneIcon />}
                    />
                </AccordionDetails>
            </Accordion>
        </Container>
    )
}