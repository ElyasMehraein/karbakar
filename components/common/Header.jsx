import Image from 'next/image';
import * as React from 'react';
import profileHeader from "@/public/assets/profileHeader.jpg"
import { Box } from '@mui/material';
import DefaultHeader from "@/public/assets/default/DefaultHeader"

const isUserprofileHeaderExist = false


export default function Header() {
  return (
    <div>

      {isUserprofileHeaderExist ? (
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
      ) :
        <DefaultHeader />
      }
    </div>
  )
}
