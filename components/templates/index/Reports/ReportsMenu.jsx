import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ReportFrame from './ReportFrame';

export default function ReportsMenu({ reports, user, anchorEl, open, handleClose }) {

    return (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            {reports &&
                reports.map((report) => {
                    return (
                        <MenuItem
                            key={report._id}
                            sx={{ display: 'flex', flexDirection: "column-reverse" }}
                        >
                            <ReportFrame user={user} report={report} handleClose={handleClose} />
                        </MenuItem>
                    )
                })
            }
        </Menu>
    );
}
