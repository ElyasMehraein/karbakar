import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import BHeader from "../../assets/businessHeader.jpg"


export default function BusinessHeader() {
  return (
    <Card sx={{ maxWidth: 1000 }}>
      
        <CardMedia 
          component="img"
          height="220"
          image={BHeader}
          alt="business header image"
        />
      
      
    </Card>
  );
}


