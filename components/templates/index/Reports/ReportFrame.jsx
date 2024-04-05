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


export default function ReportFrame({ user, report }) {

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
                reportID: report._id, parameter
            }),
        });
        res.status === 201 ? setSnackbarAccept(true) : setSnackbarServerError(true)
    }

    return (
        <Box >
            <Card sx={{ minWidth: 300, my: 1, bgcolor: "#e3f2fd" }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="body2">
                        {report.title === "jobOffer" && "درخواست همکاری"}
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
                {report.recepiant.code === user.code && report.isAnswerNeed && report.title === "jobOffer" ?

                    <Stack direction="row" spacing={2} sx={{ ml: 2, mb: 2, direction: "ltr" }}>
                        <Button variant="outlined" color="error"
                            onClick={() => answer(false)}>
                            لغو
                        </Button>
                        <Button color="success" variant="outlined"
                            onClick={() => answer(true)}>
                            تایید
                        </Button>
                    </Stack>
                    :
                    <CardContent>
                        <Typography component="div" variant="body2">
                            {` ${report.recepiant.userName} پیشنهاد کار پاسخ  ${report.answer ? "مثبت" : "منفی"} دریافت کرد`}
                        </Typography>
                        <CardHeader
                            sx={{ display: 'flex', alignItems: 'center', justifyItems: "center" }}
                            avatar={
                                <Avatar sx={{ ml: 1, width: 40, height: 40 }} >
                                    <ItsAvatar userCodeOrBusinessBrand={report.recepiant.code} />
                                </Avatar>
                            }
                            title={report.recepiant.code}
                            subheader={report.recepiant.userName}
                        />

                    </CardContent>
                }
            </Card>
            <CustomSnackbar
                open={snackbarAccept}
                onClose={() => { setSnackbarAccept(false), location.reload() }}
                message="پاسخ شما به نماینده کسب و کار ارسال شد"
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
