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

export default function BillProductFrame({ productName, unitOfMeasurement, amount }) {
    return (
        <Box  >
            <List sx={{direction:"ltr"}} dense={true}>
                <ListItem sx={{ width: '100%', minWidth: 300, bgcolor: '#e0e0e0' }} >
                    <ListItemText sx={{display:"flex", justifyContent:"center"}} primary={productName} />
                    <ListItemText  sx={{display:"flex", justifyContent:"center"}} primary={unitOfMeasurement} />
                    <ListItemText  sx={{display:"flex", justifyContent:"center"}} primary={amount} />
                </ListItem>
            </List>
        </Box>
    );
}
