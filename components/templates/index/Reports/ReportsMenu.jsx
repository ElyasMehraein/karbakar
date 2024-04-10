import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ReportFrame from './ReportFrame';

export default function ReportsMenu({ user, anchorEl, open, handleClose }) {
    const [reports, setReports] = useState([])


    useEffect(() => {
    const getReports = async () => {
        try {
            const res = await fetch("/api/reports/getReports", { method: "GET" })
            if (res.status === 200) {
                const data = await res.json()
                setReports(data.data)
                setMounted(true)
            }
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    }

        getReports()
    }, []);


    return (
        <React.Fragment>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                // onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem sx={{ display: 'flex', flexDirection: "column-reverse" }}
                //  onClick={handleClose}
                >
                    {reports &&
                        reports.map((report) => {
                            return <ReportFrame user={user} report={report} key={report._id} />
                        })
                    }
                </MenuItem>
            </Menu>

        </React.Fragment>
    );
}
