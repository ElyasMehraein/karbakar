import { Box, Typography } from '@mui/material'
import React from 'react'

const ProfileExplain = ({user}) => {
    const { explain } = user

    return (
        <Box
            display="flex"
            justifyContent='center'
            sx={{ m: 1 }}
        >

            <Typography
                display="flex"
                align='center'
                sx={{ maxWidth: { xs: 300, md: 800 }, p: 1 }}
            >
                {explain}
            </Typography>
        </Box>
    )
}

export default ProfileExplain
