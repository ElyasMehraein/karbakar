import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import BHeader from "@/public/assets/businessHeader.jpg"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function BusinessHeader() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${BHeader})`,
        display: "flex",
        justifyContent: "center",
        backgroundPosition: "center",
        height: "300px",
        width: "100%",
        backgroundSize: "cover"
      }} />

  );
}


