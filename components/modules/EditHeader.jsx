import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import DefaultHeader from "@/public/assets/default/DefaultHeader"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Button, Icon } from '@mui/material';
import { grey } from '@mui/material/colors';

const color = grey[900];

export default function EditHeader() {
  const [imageKey, setImageKey] = useState(null);
  const AvatarImg = `/avatars/${user?.code || business?.businessName}.jpg${imageKey ? `?key=${imageKey}` : ''}`

  useEffect(() => {
    setImageKey(Date.now());
  }, []);

  const handleImageUpload = async (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    formData.append("imagePath", `headers/${user?.code || business?.businessName}.jpg`);

    try {
      const response = await fetch('/api/uploadImg', {
        method: 'PUT',
        body: formData,
      });
      
      if(response.status===201){
        console.log('image Uploaded successfully');
        setImageKey(Date.now());
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <Box
      display="flex" alignItems="flex-end" justifyContent="left"
      style={{
        position: "relative",
        width: "100vw",
        height: "30vh",
      }}
      sx={{ bgcolor: '#cfe8fc', width: "100vw", height: "30vh", background: 'linear-gradient(to right bottom, #36EAEF, #6B0AC9)', }}
    >
              <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="raised-button-file">
      <IconButton component="span" sx={{ ml: 5, mb: 5, bgcolor: color }}>
        <AddAPhotoIcon sx={{ color: 'white' }} />
      </IconButton>
      </label>
    </Box>
  )
}



