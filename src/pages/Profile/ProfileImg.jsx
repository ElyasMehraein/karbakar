import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import profileHeader from "../../assets/profileHeader.jpg"


export default function ProfileImg() {
  return (
    <Card sx={{ maxWidth: "md" }}>
      
        <CardMedia
          component="img"
          image={profileHeader}
          alt="green iguana"
          height={400}
        />
      
      
    </Card>
  );
}


