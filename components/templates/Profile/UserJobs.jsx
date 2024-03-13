import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
// import businessAvatar from "../../assets/businessAvatar.jpg"
// import businessAvatar2 from "../../assets/businessAvatar2.jpg"
import Divider from '@mui/material/Divider';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

export default function UserJobs() {
    return (
        <Box>

            <Box dir="rtl"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >

                <List
                    sx={{

                        width: '100%',
                        maxWidth: 700,
                        bgcolor: 'background.paper',
                    }}
                >
                    <Typography align='right' sx={{mr:2 , fontWeight: 'bold'}} >
                        کسب و کار
                    </Typography>
                    <ListItem >

                        <ListItemAvatar>
                            <Avatar
                                alt="Remy Sharp"
                                // src={businessAvatar}
                            >

                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText align='right' primary="تعمیرگاه استاد جلال " secondary="تعمیر خودروهای خارجی موتور گیربکس و لوازم برقی" />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar
                                alt="Remy Sharp"
                                // src={businessAvatar2}
                            >
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText align='right' primary="کشاورزی جلال" secondary="سیفی جات عرضه فقط به مغازه" />
                    </ListItem>

                </List>
            </Box>
        </Box>
    );
}
