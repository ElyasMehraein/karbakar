"use client"
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { ListItemButton } from "@mui/material";
import Divider from '@mui/material/Divider';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import ItsAvatar from '@/components/modules/ItsAvatar';
import { useRouter } from 'next/navigation';



export default function UserJobs({ user }) {
    const router = useRouter()
    return (
        <Box dir="rtl" sx={{ display: 'flex', justifyContent: 'center', }}>
            <List sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper', }}>
                <Typography align='right' sx={{ mr: 2, fontWeight: 'bold' }} >
                    کسب و کارها
                </Typography>
                {user.businesses.map((business) => {
                    return (
                        <ListItem key={business._id} >
                            <ListItemButton onClick={() => router.push(`/${business.businessName}`)}>
                                <ListItemAvatar>
                                    <ItsAvatar userCodeOrBusinessBrand={business.businessName} alt="business avatar" />
                                </ListItemAvatar>
                                <ListItemText
                                    align='right'
                                    primary={business.businessName}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {business.businessBrand}
                                            </Typography>
                                            {` — ${business.bio}`}
                                        </React.Fragment>
                                    } />
                                <Divider variant="inset" />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    );
}
