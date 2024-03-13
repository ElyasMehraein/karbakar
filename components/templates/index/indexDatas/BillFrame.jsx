import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

export default function BillFrame({id, productName, unitOfMeasurement, amount, deleteFrame }) {
    return (
        <Box sx={{ m: 1, direction: "rtl", width: '100%', maxWidth: 360, bgcolor: '#eeeeee' }}>
            <List dense={true}>
                <ListItem>
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteFrame(id)}>
                        <DeleteIcon />
                    </IconButton>
                    <ListItemText primary={unitOfMeasurement} />
                    <ListItemText primary={amount} />
                    <ListItemText primary={productName} />
                </ListItem>
            </List>
            <Divider />
        </Box>
    );
}
