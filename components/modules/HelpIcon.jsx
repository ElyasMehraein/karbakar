import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';


export default function HelpIcon({ iconText }) {
    const [openDialog, setOpenDialog] = useState(false);

    const handleBusinessChange = () => {
        setOpenDialog(true);
    };
    const cancelHandler = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Box sx={{ mt: -2, display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={() => handleBusinessChange()}>
                    <HelpOutlineOutlinedIcon />
                </IconButton>
            </Box>
            <Dialog
                open={openDialog}
            >
                <DialogTitle>راهنمای کارباکار</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {iconText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelHandler}>بستن</Button>
                </DialogActions>
            </Dialog>
        </>

    );
};

