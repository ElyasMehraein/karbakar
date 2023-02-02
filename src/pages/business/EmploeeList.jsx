import React from 'react'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import avatar1 from "../../assets/1.jpg"
import avatar2 from "../../assets/2.jpg"
import avatar3 from "../../assets/3.jpg"
import avatar4 from "../../assets/4.jpg"
import avatar5 from "../../assets/5.jpg"
import { Box, Paper } from '@mui/material';
import { grey, blue } from '@mui/material/colors';
import Divider from '@mui/material/Divider';

const EmploeeList = () => {
    return (
        <Paper
            sx={{
                display: 'flex',
                justifyContent: 'center',

            }}
        >
            <Box sx={{ width: "100%", maxWidth: 700, m: 1, backgroundColor: grey[200], borderRadius: '30px' }}
            >
                <Typography sx={{ variant: "subtitle2", m: 1, fontWeight: 'bold' }} >
                    لیست کارکنان کسب و کار
                </Typography>
                <Box>

                    <Stack sx={{ m: 2 }} dir="rtl" direction="column" spacing={2}>
                        <Box sx={{ display: "flex" }} >
                            <Avatar alt="Remy Sharp" src={avatar1} />
                            <Box>

                                <Typography sx={{ mr: 1 }}>جهانشاه کریمی زاده </Typography>
                                <Typography sx={{ fontSize: 12, fontWeight: 'bold' }} color={grey[500]}>نماینده کسب و کار</Typography>
                            </Box>

                        </Box>
                            <Divider />
                        <Box sx={{ display: "flex" }} >
                            <Avatar alt="Travis Howard" src={avatar2} />
                            <Typography sx={{ mt: 1, mr: 1 }}> رامین افغانی </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: "flex" }} >
                            <Avatar alt="Cindy Baker" src={avatar3} />
                            <Typography sx={{ mt: 1, mr: 1 }}>پرنیان صمیعی</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: "flex" }} >
                            <Avatar alt="Cindy Baker" src={avatar4} />
                            <Typography sx={{ mt: 1, mr: 1 }}> مهناز جوادیان </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: "flex" }} >
                            <Avatar alt="Cindy Baker" src={avatar5} />
                            <Typography sx={{ mt: 1, mr: 1 }}>سیامک کامکار </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Box >
        </Paper >
    )
}

export default EmploeeList

