import React from "react"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Workers() {
    return (
        <Box>

            <Box
                sx={{
                    backgroundColor: grey[200], borderRadius: '30px',
                    p: 1,
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {

                        width: "100%",
                        height: 1000,

                    },
                }}
            >




                <Typography sx={{ variant: "subtitle2", m: 1, fontWeight: 'bold' }}>
                    محصولاتی که این کسب و کار به دیگران تحویل داده
                </Typography>
            </Box>
        </Box>
    )
}

