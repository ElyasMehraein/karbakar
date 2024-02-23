import { Box, Container, Typography } from '@mui/material'
import React from 'react'

function UserName({ user }) {
    const { userName } = user
    return (
        <Container maxWidth="md">
            <Box display="flex" flexDirection="column">
                <Typography sx={{ fontWeight: 'bold' }}>
                    {userName}
                </Typography>
            </Box>
        </Container>
    )
}

export default UserName