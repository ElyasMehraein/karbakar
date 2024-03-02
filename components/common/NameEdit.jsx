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

export default function NameEdit({ business, label }) {
    const router = useRouter()
    const [newBusinessName, setNewBusinessName] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const changeHandler = (e) => {
        setExpanded(true);
        setNewBusinessName(e.target.value);
    };
    const saveHandler = async () => {
        const res = await fetch("/api/updateDB", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "BusinessModel", id: business._id, fieldName: "businessName", newValue: newBusinessName
            }),
        });
        if (res.status === 200) { router.push(`/${newBusinessName}/edit`) }
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ '& .MuiTextField-root': { width: '30ch' }, mt: 3 }} display="flex" flexDirection="column">
                <Accordion expanded={expanded}>
                    <AccordionSummary>
                        <TextField
                            defaultValue={business.businessName}
                            variant="outlined"
                            onChange={changeHandler}
                            label={label}
                        />
                    </AccordionSummary>
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
