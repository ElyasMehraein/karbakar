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
import Search from './Search';
export default function EmployeeList({ business , logedUserCode, users}) {
    return (
        <Box>
            <Box dir="rtl" sx={{ display: 'flex', justifyContent: 'center' }}>
                <List sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
                    <Typography align='right' sx={{ mr: 2, fontWeight: 'bold' }} >
                        لیست کارکنان کسب و کار
                    </Typography>
                    {logedUserCode === Number(business.agentCode) &&
                        <Search/>
                    }
                    {business.workers.sort((a, b) => Number(business.agentCode) === Number(a.code) ? -1 : Number(business.agentCode) === Number(b.code) ? 1 : 0).map((worker => {
                        return (
                            <React.Fragment key={worker._id}>
                                <ListItem >
                                    <ListItemAvatar >
                                        <Avatar sx={{ width: 40, height: 40 }} >
                                            <ItsAvatar userCodeOrBusinessBrand={worker.code} alt="workers avatar" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        align='right'
                                        primary={Number(business.agentCode) === Number(worker.code) ? worker.userName + " — " + " نماینده" : worker.userName}
                                        secondary={worker.bio}
                                    />
                                    <ListItemText />
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
