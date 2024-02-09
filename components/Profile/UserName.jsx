import { Box, Container, Typography } from '@mui/material'
import React from 'react'

function UserName(props) {
    return (
        <Container maxWidth="md">
            <Box display="flex" flexDirection="column">
                <Typography sx={{ fontWeight: 'bold' }}>
                    جلال شوقی
                </Typography>
            </Box>
        </Container>
    )
}

export default UserName