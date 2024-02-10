import { Box, Container, TextField, Typography } from '@mui/material'
import React from 'react'

const ProfileExplain = () => {
    return (
        <Container maxWidth="md">

            <Box
                display="flex"
                // justifyContent='center'
                sx={{

                    my: 1,
                    // '& .MuiTextField-root': { width: '40ch' },
                }}
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
        </Container>
    )
}

export default ProfileExplain
