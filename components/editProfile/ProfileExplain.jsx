import { Box, Container, TextField, Typography } from '@mui/material'
import React from 'react'
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
const ProfileExplain = () => {
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };
    return (
        <Container maxWidth="md">
            <Box
                display="flex"
                justifyContent='center'
                sx={{ my: 1 }}
            >
                <TextField
                    display="flex"
                    defaultValue=""
                    id="outlined-multiline-static"
                    label="معرفی 300 کارکتری"
                    multiline
                    rows={4}
                    fullWidth
                />
            </Box>
            <Chip
                label="ذخیره"
                sx={{mb:5, direction: 'ltr' }}
                onClick={handleClick}
                icon={<DoneIcon />}
            />
        </Container>
    )
}

export default ProfileExplain
