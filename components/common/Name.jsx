import { Box, Container, Typography } from '@mui/material'
import React from 'react'

export default function Name({ user , business}) {
    const name  = user?.userName || business.businessName
    return (
        <Container maxWidth="md">
            <Box sx={{width:160}} textAlign={"center"}>
                <Typography sx={{ fontWeight: 'bold' }}>
                    {name}
                </Typography>
            </Box>
        </Container>
    )
}

