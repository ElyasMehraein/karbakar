import { Box, Container, TextField, Typography } from '@mui/material'
import React from 'react'

const ProfileBio = () => {
    return (
        <Container maxWidth="md">
            <Box
                display="flex"
                // justifyContent='center'
                sx={{ my: 1 }}
            >

                <TextField
                    fullWidth
                    display="flex"
                    align='center'
                    defaultValue=""
                    id="outlined-multiline-static"
                    label="معرفی 150 کارکتری"
                    multiline
                    rows={2}
                />

            </Box>
        </Container>
    )
}

export default ProfileBio
