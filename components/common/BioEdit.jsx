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

export default function BioEdit({ user, business }) {
    const [newValue, setNewValue] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const changeHandler = (e) => {
        setExpanded(true);
        setNewValue(e.target.value);
    };
    const saveHandler = async () => {
        let model = user ? "UserModel" : "BusinessModel"
        let id = user ? user._id : business._id
        const res = await fetch("/api/updateDB", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model, id, fieldName:"bio", newValue
            }),
        });
    }
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
                            defaultValue={user ? user.bio : business.bio}
                            id="outlined-multiline-static"
                            label="معرفی 150 کارکتری"
                            multiline
                            rows={2}
                            fullWidth
                            onChange={changeHandler}
                        />
                    </Box>
                <AccordionDetails> 
                    <Chip
                        label="ذخیره"
                        sx={{ mt: 1, direction: 'ltr' }}
                        onClick={saveHandler}
                        icon={<DoneIcon />}
                    />
                </AccordionDetails>
            </Accordion>
        </Container>
    )
}