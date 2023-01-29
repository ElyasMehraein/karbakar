import React, { useEffect } from "react"
import Typography from '@mui/material/Typography';

function BusinessTexts() {
    return (
        <>
            <Typography align='left' sx={{ fontWeight: 'bold' }}>
تعمیرگاه استاد جلال            </Typography>
            <Typography sx={{  mt: 5 , fontWeight: 'bold' }}>
                محصولاتی که این کسب و کار به دیگران تحویل داده
            </Typography>
        </>
    )
}

export default BusinessTexts