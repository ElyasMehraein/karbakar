import { Box, Typography } from '@mui/material'
import React from 'react'

const ProfileBio = ({ user , business}) => {
    const { bio } = user || business
    return (
        <Box
            display="flex"
            justifyContent='center'
            sx={{ m: 1 }}
        >

            <Typography
                display="flex"
                align='center'
                sx={{ maxWidth: { xs: 300, md: 800 }, pb: 2 }}
            >
                {bio}
            </Typography>
        </Box>
    )
}

export default ProfileBio
