import Image from 'next/image';
import * as React from 'react';
import profileHeader from "@/public/assets/profileHeader.jpg"
import { Box } from '@mui/material';



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
    </div>
  )
}
