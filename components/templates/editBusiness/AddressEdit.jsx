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
export default function AddressEdit({ business , maxLengthError}) {
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
                        defaultValue={business?.mapDetail}
                        inputProps={{ maxLength: 30 }}
                        variant="outlined"
                        onChange={changeHandler}
                        label={"جزئیات آدرس روی نقشه"}
                    />
                    <AccordionDetails>
                        <Chip
                            label="ذخیره"
                            sx={{ mt: 1, direction: 'ltr' }}
                            onClick={() => saveHandler(null, business, "mapDetail", newValue, setExpanded)}
                            icon={<DoneIcon />}
                        />
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Container>
    );
}
