import * as React from 'react';
import Box from '@mui/material/Box';
import ItsAvatar from "@/components/modules/ItsAvatar"
import Typography from "@mui/material/Typography";
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';


export default function ReportFrame({ report }) {
    const theme = useTheme();
    const [snackbarAccept, setSnackbarAccept] = React.useState(false);
    const [snackbarReject, setSnackbarReject] = React.useState(false);
    const [snackbarServerError, setSnackbarServerError] = React.useState(false);

    const answer = async (parameter) => {
        const res = await fetch("/api/reports/answerJobOffer", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                parameter, reportID:report._id
            }),
        });
        console.log("res", res);
        res.status === 201 ? setSnackbarAccept(true) : setSnackbarServerError(true)
    }

   
    return (
        <Box >
            <Card sx={{ minWidth: 300, my: 1, bgcolor: "#e3f2fd" }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="body2">
                        درخواست همکاری
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardHeader
                        sx={{ display: 'flex', alignItems: 'center', justifyItems: "center" }}
                        avatar={
                            <Avatar sx={{ ml: 1, width: 40, height: 40 }} >
                                <ItsAvatar userCodeOrBusinessBrand={report.business.businessName} />
                            </Avatar>
                        }
                        title={report.business.businessBrand}
                        subheader={report.business.businessName}
                    />
                </Box>
                    <Stack direction="row" spacing={2} sx={{ml:2, mb:2, direction: "ltr" }}>
                        <Button variant="outlined" color="error"
                            onClick={() => answer(false)}>
                            لغو
                        </Button>
                        <Button color="success" variant="outlined"
                            onClick={() => answer(true)}>
                            تایید
                        </Button>
                    </Stack>

            </Card>
            <CustomSnackbar
                open={snackbarAccept}
                onClose={() => { setSnackbarAccept(false), location.reload() }}
                message="دریافت محصولات و خدمات صورتحساب تایید شد"
            />
            <CustomSnackbar
                open={snackbarServerError}
                onClose={() => setSnackbarServerError(false)}
                message="خطا در اتصال به سرور"
                severity="error"
            />
            <CustomSnackbar
                open={snackbarReject}
                onClose={() => { setSnackbarReject(false), location.reload() }}
                message="صورتحساب لغو گردید"
                severity="info"
            />
        </Box>
    );
}
