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
// import BusinessModel from '@/models/Business';
// import connectToDB from '@/configs/db';

export default function NameEdit({ defaultValue, label }) {
    console.log("business.businessName", defaultValue);
    const [newBusinessName, setNewBusinessName] = useState(null);
    const [expanded, setExpanded] = useState(false);
    // connectToDB()
    const handleClick = async () => {
        return true
    }
    // const handleClick = async () => {
    //     try {
    //         const updatedBusiness = await BusinessModel.findByIdAndUpdate(
    //             business._id,
    //             { businessName: newBusinessName },
    //             { new: true }
    //         );

    //         console.log('businessName updated successfully', updatedBusiness);
    //         setExpanded(false);
    //     } catch (error) {
    //         console.error('Error updating businessName:', error);
    //     }
    // };

    const changeHandler = (e) => {
        setExpanded(true);
        setNewBusinessName(e.target.value);
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ '& .MuiTextField-root': { width: '30ch' }, mt: 3 }} display="flex" flexDirection="column">
                <Accordion expanded={expanded}>
                    <AccordionSummary>
                        <TextField
                            defaultValue={defaultValue}
                            variant="outlined"
                            onChange={changeHandler}
                            label={label}
                        />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Chip
                            label="ذخیره"
                            sx={{ mt: 1, direction: 'ltr' }}
                            onClick={handleClick}
                            icon={<DoneIcon />}
                        />
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Container>
    );
}
