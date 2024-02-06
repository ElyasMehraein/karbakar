// import UserAvatarImg from "../../assets/UserAvatarImg.jpg"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';


export default function BusinessAvatar() {
  return (
    <Box>

      <Box display="flex"
        justifyContent="space-around"
      >
        <Box display="flex" flexDirection="row"
          sx={{ mr:20, width: 160, height: 80 }}>
          <Avatar
            alt="Remy Sharp"
            // src={UserAvatarImg}
            sx={{ width: 80, height: 80, ml: 4.75, mt: -2 }}
          />

          <Box display="flex" flexDirection="column">
            <Typography sx={{ fontWeight: 'bold' }}>
              جلال شوقی        </Typography>
            <Typography sx={{ fontWeight: 'bold' }}>
              @Jalal.shoghi </Typography>
          </Box>

        </Box>
        <Box

          sx={{ width: 180 }}
        >

          <Typography display="inline" variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            سابقه فعالیت : 3 سال
          </Typography>

        </Box>
      </Box>

    </Box>

  );
}
