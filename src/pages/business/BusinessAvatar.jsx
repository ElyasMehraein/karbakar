import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import businessAvatar from "../../assets/businessAvatar.jpg"
import Typography from '@mui/material/Typography';


export default function BusinessAvatar() {
  return (
    <Box>

      <Box display="flex"
        justifyContent="space-around"
      >
        <Box display="flex"
          flexDirection="column"

          sx={{  width: 160, height: 140, mt: -5 }}>

          <Avatar

            alt="Remy Sharp"
            src={businessAvatar}

            sx={{ width: 80, height: 80, ml: 4.75 }}
          />
          <Typography align='center' sx={{ fontWeight: 'bold' }}>
            تعمیرگاه استاد جلال            </Typography>
          <Typography align='left' sx={{ fontWeight: 'bold' }}>
            @JalalVehicleRepairs </Typography>
        </Box>
        {/* right content */}
        <Box
        
          align='right'
          sx={{width: 180 }}
        >

          <Typography display="inline" align='right' variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            سابقه فعالیت : 3 سال
          </Typography>
          <Typography align='right' variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            صنف: تعمیرکاران </Typography>
          <Typography align='right' variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            آدرس: تهران خیابان ولی عصر کوچه اول پلاک 20 </Typography>
        </Box>
      </Box>
    
    </Box>

  );
}
