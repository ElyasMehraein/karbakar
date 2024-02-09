import { Box, Typography } from '@mui/material'
import React from 'react'

const ProfileExplain = () => {
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
           
                لورم ایپسه در ستون و سطرآنچنانی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                تعمیر انواع خودرو سواری خارجی
                موتور گیربکس و لوازم برقی

            </Typography>
        </Box>
    )
}

export default ProfileExplain
