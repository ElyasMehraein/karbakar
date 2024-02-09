import UserAvatarImg from "@/public/assets/UserAvatarImg.jpg"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Image from "next/image";


export default function BusinessAvatar() {
  return (
    <Box>

      <Box display="flex"
        justifyContent="space-around"
      >
        <Box display="flex" flexDirection="row"
          sx={{ mr: 20, width: 160, height: 80 }}>
          <Avatar
            sx={{ width: 80, height: 80, ml: 4.75, mt: -2 }}
          >
            <Image
              alt="profile picture"
              src={UserAvatarImg}
              placeholder="blur"
              quality={100}
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover',
              }}
            />
          </Avatar>

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
