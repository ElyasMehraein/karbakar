"use client"
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Image from 'next/image'


export default function PageAvatar({ user, business }) {
  const userCodeOrBusinessBrand = user?.code || business?.businessName;
  const [isAvatarUrl, setIsAvatarUrl] = useState(user?.avatarUrl || business?.avatarUrl)
  const [avatarUrl, setAvatartUrl] = useState(`/images/avatars/${userCodeOrBusinessBrand}.jpg`)
  useEffect(() => {
    setAvatartUrl(`/images/avatars/${userCodeOrBusinessBrand}.jpg?timestamp=${new Date().getTime()}`)
  }, [isAvatarUrl])

  //قدمت صفحه
  const createdAt = new Date(user?.createdAt || business.createdAt)
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - createdAt.getTime();
  const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24))


  return (
    <Container maxWidth="md">
      <Box sx={{ justifyContent: 'flex-start' }} display="flex">
        <Avatar sx={{ width: 70, height: 70, mt: -5 }}>
          {isAvatarUrl ? (
            <Image
              src={avatarUrl}
              alt={userCodeOrBusinessBrand}
              quality={100}
              fill
              sizes="100px"
              style={{ objectFit: 'cover' }}
              onError={() => setIsAvatarUrl(false)}
            />
          ) : user ? (
            <AccountCircle sx={{ width: 70, height: 70 }} />
          ) : (
            <BusinessIcon />
          )}
        </Avatar>
        <Box style={{ flexGrow: 1 }}></Box>
        <Box display={"flex"} flexDirection={"column"}>
          <Typography display="inline" variant="subtitle2" >
            قدمت صفحه: {daysPassed} روز
          </Typography>
          {business ?
            <Typography display="inline" variant="subtitle2">
              صنف :  {business.guild.guildName}
            </Typography>
            :
            <Typography display="inline" variant="subtitle2">
              کد کاربری : {user.code}
            </Typography>
          }
        </Box>
      </Box>

    </Container>
  );
}
