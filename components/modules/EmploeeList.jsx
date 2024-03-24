import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import ItsAvatar from './ItsAvatar';

export default function EmploeeList({ business }) {
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
                    <Typography align='right' sx={{ mr: 2, fontWeight: 'bold' }} >
                        لیست کارکنان کسب و کار
                    </Typography>

                    {business.workers.map((worker => {
                        return (
                            <React.Fragment key={worker._id}>
                                <ListItem >
                                    <ListItemAvatar >
                                        <Avatar sx={{ width: 40, height: 40 }} >
                                            <ItsAvatar
                                                userCodeOrBusinessBrand={worker.code}
                                                alt="workers avatar"
                                            />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText align='right' primary={worker.userName} secondary={worker.bio} />
                                </ListItem>
                                <Divider variant="inset" />
                            </React.Fragment>
                        )
                    }))}

                </List>
            </Box>
        </Box>
    );
}
