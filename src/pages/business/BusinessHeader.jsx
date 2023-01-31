import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import BHeader from "../../assets/businessHeader.jpg"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function BusinessHeader() {
  return (
    <Box
      // component="img"
      // src={BHeader}
      // alt={"some images"}
      sx={{
        backgroundImage: `url(${BHeader})`,
        display: "flex",
        justifyContent: "center",
        backgroundPosition: "center",
        height: "300px",
        width: "100%",
        backgroundSize: "cover"
      }} />
    // <Box
    //   sx={{
    //     backgroundImage: `url(${BHeader})`,
    //     backgroundRepeat: "no-repeat",
    //     backgroundColor: "black",
    //     // backgroundAttachment: "fixed",
    //     backgroundPosition: "center",
    //     // backgroundSize: "cover",
    //     height: 200,
    //     width: "100%",
    //     display: "flex",
    //     justifyContent: "center",
    //   }}
    // >

    // </Box>
  );
}


