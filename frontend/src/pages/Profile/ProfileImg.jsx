import * as React from 'react';
import Box from '@mui/material/Box';
import profileHeader from "../../assets/profileHeader.jpg"


export default function ProfileImg() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${profileHeader})`,
        display: "flex",
        justifyContent: "center",
        backgroundPosition: "center",
        height: "300px",
        width: "100%",
        backgroundSize: "cover"
      }} />

  );
}


