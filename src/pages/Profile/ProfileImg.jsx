import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import profileHeader from "../../assets/profileHeader.jpg"


export default function ProfileImg() {
  return (
    <Card sx={{ maxWidth: 400 }}>
      
        <CardMedia
          component="img"
          height="220"
          image={profileHeader}
          alt="green iguana"
        />
      
      
    </Card>
  );
}


