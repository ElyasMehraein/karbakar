import Image from 'next/image';
import * as React from 'react';
import profileHeader from "@/public/assets/profileHeader.jpg"
import IconButton from '@mui/material/IconButton';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Box, Button, Icon } from '@mui/material';

export default function Background() {
  return (
    <div
      style={{
        // use relative position for the parent div
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
      <IconButton sx={{ bgcolor: 'text.primary' }}
      >
        <AddAPhotoIcon sx={{ color:'text.disabled',fontSize: 40 }} />
      </IconButton>



    </div>
  )
}
