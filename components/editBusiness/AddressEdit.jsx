import { Box, Container, TextField, Typography } from '@mui/material'
import React from 'react'



function NameEdit({ defaultValue, label }) {
    return (

        <Container maxWidth="md" >
            <Box
                sx={{ my: 1 }}
                display="flex" flexDirection="column">
                <TextField
                    defaultValue={defaultValue}
                    variant="outlined"
                    label={label}
                />
            </Box>
        </Container>
    )
}

export default NameEdit