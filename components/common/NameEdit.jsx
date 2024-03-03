"use client"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Chip,
    Container,
    TextField
} from '@mui/material';
import React, { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import { useRouter } from 'next/navigation';

export default function NameEdit({ user, business, label }) {
    const [newValue, setNewValue] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const changeHandler = (e) => {
        setExpanded(true);
        setNewValue(e.target.value);
    };
    const saveHandler = async () => {
        let model = user ? "UserModel" : "BusinessModel"
        let id = user ? user._id : business._id
        let fieldName = user? "userName": "businessBrand"
        await fetch("/api/updateDB", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model, id, fieldName, newValue
            }),
        });
        setExpanded(false);
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ '& .MuiTextField-root': { width: '30ch' }, mt: 3 }} display="flex" flexDirection="column">
                <Accordion expanded={expanded}>
                        <TextField
                            defaultValue={user ? user.userName : business.businessBrand}
                            variant="outlined"
                            onChange={changeHandler}
                            label={label}
                        />
                    <AccordionDetails>
                        <Chip
                            label="ذخیره"
                            sx={{ mt: 1, direction: 'ltr' }}
                            onClick={saveHandler}
                            icon={<DoneIcon />}
                        />
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Container>
    );
}
