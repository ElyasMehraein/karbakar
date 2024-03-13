import Image from 'next/image';
import * as React from 'react';
import profileHeader from "@/public/assets/profileHeader.jpg"
import IconButton from '@mui/material/IconButton';
import DefaultHeader from "@/public/assets/default/DefaultHeader"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Box, Button, Icon } from '@mui/material';
import { grey } from '@mui/material/colors';

const isUserprofileHeaderExist = false



const color = grey[900];

export default function Background() {
  return (<div>

    {isUserprofileHeaderExist ? (
      <Box
        display="flex" alignItems="flex-end" justifyContent="left"
        style={{
          // use relative position for the parent Box

          position: "relative",
          width: "100vw",
          height: "40vh",
        }}>
        <Image
          alt="profile picture"
          src={profileHeader}
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
        />
        <IconButton sx={{ ml: 5, mb: 5, bgcolor: color }}>
          <AddAPhotoIcon sx={{ color: 'white' }} />
        </IconButton>
      </Box    >
    ) :

      <Box
        display="flex" alignItems="flex-end" justifyContent="left"
        style={{
          // use relative position for the parent Box

          position: "relative",
          width: "100vw",
          height: "30vh",
        }}
        sx={{ bgcolor: '#cfe8fc', width: "100vw", height: "30vh", background: 'linear-gradient(to right bottom, #36EAEF, #6B0AC9)', }}
      >
        <IconButton sx={{ ml: 5, mb: 5, bgcolor: color }}>
          <AddAPhotoIcon sx={{ color: 'white' }} />
        </IconButton>

      </Box    >

    }
  </div>
  )
}
