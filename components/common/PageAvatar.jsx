import UserAvatarImg from "@/public/assets/default/default-avatar.svg"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from "next/image";
import { grey } from '@mui/material/colors';
import { Container } from "@mui/material";
import ItsAvatar from "@/components/common/ItsAvatar"
export default function PageAvatar(user, bussiness) {

  console.log("user ", user, "bussiness", bussiness);
  const createdAt = "11"
  return (
    <Container maxWidth="md">
      <Box sx={{ justifyContent: 'flex-start' }} display="flex">
        <Avatar
          sx={{ width: 80, height: 80, mt: -5 }}
        >
          <ItsAvatar userCodeOrBusinessBrand={user?.code || bussiness?.businessName} alt={user?.userName || bussiness?.businessName} />
          {/* <Image
            alt="profile picture"
            src={UserAvatarImg}
            quality={100}
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
          /> */}
        </Avatar>
        <Box style={{ flexGrow: 1 }}></Box>
        <Typography display="inline" variant="subtitle2" sx={{ fontWeight: 'bold' }}>
          قدمت صفحه: {createdAt}
        </Typography>
      </Box>

    </Container>
  );
}
