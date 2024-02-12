import { Box, Container, TextField, Typography } from '@mui/material'
import React from 'react'

function UserName(props) {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    '& .MuiTextField-root': { width: '20ch' },
                    mt:3
                }}
                display="flex" flexDirection="column">
                <TextField
                    defaultValue="جلال شوقی"
                    variant="standard"
                />
            </Box>
        </Container>
    )
}

export default UserName