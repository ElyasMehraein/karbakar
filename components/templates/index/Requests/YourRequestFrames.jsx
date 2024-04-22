import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Image from 'next/image'
import { Container } from "@mui/material";
import ItsAvatar from "@/components/modules/ItsAvatar";
import businessAvatar from "@/public/assets/businessAvatar.jpg";

const YourRequestFrames = ({ request }) => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            mr: 2
          }}
        >
          <Typography sx={{ fontSize: 12, m: 0, fontWeight: 'bold' }} textAlign={"right"}>
            {request.title}
          </Typography>
        </Box>
        <AvatarGroup dir="ltr" max={4}>
          {request.acceptedBy?.map((acceptor) => {
            return (
              <Avatar key={acceptor}>
                <ItsAvatar isAvatar={acceptor.isAvatar} userCodeOrBusinessBrand={acceptor.businessName} alt="workers avatar" />
              </Avatar>
            )
          })}
          {request.needMoreInfo?.map((infoSeeker) => {
            return (
              <Avatar key={infoSeeker}>
                <ItsAvatar isAvatar={infoSeeker.isAvatar} userCodeOrBusinessBrand={infoSeeker.businessName} alt="workers avatar" />
              </Avatar>
            )
          })}
        </AvatarGroup>
      </Box>
      <Typography
        paragraph
        // noWrap
        sx={{
          mr: 2, fontSize: 11,
          //later i deside if i need to use the below code
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2
        }} align="justify" dir="rtl" >{request.message}</Typography>

    </Container>
  );
};
export default YourRequestFrames;
