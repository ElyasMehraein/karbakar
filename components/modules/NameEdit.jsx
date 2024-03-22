"use client"
import {
    Accordion,
    AccordionDetails,
    Box,
    Chip,
    Container,
    TextField
} from '@mui/material';
import React, { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import saveHandler from '@/utils/saveHandler';
export default function NameEdit({ user, business, label, maxLengthError }) {
    const [newValue, setNewValue] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const changeHandler = (e) => {
        setExpanded(true);
        setNewValue(e.target.value);
        if (e.target.value.length > 29) {
            maxLengthError()
            setExpanded(false)
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ '& .MuiTextField-root': { width: '30ch' }, mt: 3 }} display="flex" flexDirection="column">
                <Accordion expanded={expanded}>
                    <TextField
                        defaultValue={user ? user.userName : business?.businessBrand}
                        variant="outlined"
                        onChange={changeHandler}
                        label={label}
                        inputProps={{ maxLength: 30 }}
                    />
                    <AccordionDetails>
                        <Chip
                            label="ذخیره"
                            sx={{ mt: 1, direction: 'ltr' }}
                            onClick={() => saveHandler(user, business, "businessBrand", newValue, setExpanded)}
                            icon={<DoneIcon />}
                        />
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Container>
    );
}
