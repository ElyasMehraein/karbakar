import { Box, Container, TextField, Typography } from '@mui/material'
import React from 'react'

function NameEdit(props) {
    return (
        <Container maxWidth="md" >
            <Box
                sx={{
                    '& .MuiTextField-root': { width: '20ch' },
                    mt: 3
                }}
                display="flex" flexDirection="column">
                <TextField
                    InputLabelProps={{
                        dir: 'rtl',
                    }}
                    variant="standard"
                    label="نام"
                />

            </Box>
            <Box
                sx={{
                    '& .MuiTextField-root': { width: '20ch' },
                    mt: 3
                }}
                display="flex" flexDirection="column">
                <TextField
                    defaultValue="آدرس خود را وارد کنید"
                    variant="standard"
                />
            </Box>
        </Container>
    )
}

export default NameEdit