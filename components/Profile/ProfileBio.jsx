import { Box, Typography } from '@mui/material'
import React from 'react'

const ProfileBio = () => {
    return (
        <Box
            display="flex"
            justifyContent='center'
            sx={{ m: 1}}
        >

            <Typography
                display="flex"
                align='center'
                sx={{ maxWidth: { xs: 300, md: 800 }, pb: 2 }}
            >
                پادشاه جهنم خودت باش نه کارگر بهشت دیگران
            </Typography>
        </Box>
    )
}

export default ProfileBio
