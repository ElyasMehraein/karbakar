import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import FolderIcon from '@mui/icons-material/Folder'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import IconButton from '@mui/material/IconButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'

export default function CreateBillFrame({
  id,
  productName,
  unitOfMeasurement,
  amount,
  deleteFrame,
}) {
  return (
    <Box>
      <List dense={true}>
        <ListItem sx={{ p: 2, width: '100%', minWidth: 300, bgcolor: '#e0e0e0' }}>
          <ListItemText primary={amount} />
          <ListItemText primary={unitOfMeasurement} />
          <ListItemText primary={productName} />

          <IconButton onClick={() => deleteFrame(id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      </List>
    </Box>
  )
}
