import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import BHeader from "../../assets/businessHeader.jpg"


export default function BusinessHeader() {
  return (
    <Card
    sx={{ maxWidth: "md" }} 

    >

      <CardMedia
        component="img"
        image={BHeader}
        alt="business header image"
        height={500}
        


      />


    </Card>
  );
}


