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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ReportFrame({ user, report }) {
    const [hideQuestion, setHideQuestion] = React.useState(false);
    const [snackbarAccept, setSnackbarAccept] = React.useState(false);
    const [snackbarReject, setSnackbarReject] = React.useState(false);
    const [snackbarServerError, setSnackbarServerError] = React.useState(false);
    const [userCode, setUserCode] = React.useState(null);
    console.log("fffdsss", userCode);
    React.useEffect(() => {

        setUserCode(report.recepiant)
    }, [userCode]);
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
        if (res.status === 201) {
            setHideQuestion(true)
            setSnackbarAccept(true)
        }
    }

    return (
        <Box >
            <Card sx={{ minWidth: 300, my: 1, bgcolor: "#e3f2fd" }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="body2">
                        {report.title === "jobOffer" && "درخواست همکاری"}
                        {report.title === "dismissal" && "گزارش اخراج"}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
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
                    <ArrowBackIcon sx={{ margin: 'auto' }} />
                    <CardHeader
                        sx={{ display: 'flex', alignItems: 'center', justifyItems: "center" }}
                        avatar={
                            <Avatar sx={{ ml: 1, width: 40, height: 40 }} >
                                <ItsAvatar userCodeOrBusinessBrand={userCode} />
                            </Avatar>
                        }
                        title={userCode}
                        subheader={report.recepiant.userName}
                    />
                </Box>
                {report.recepiant.code === user.code && report.isAnswerNeed && report.title === "jobOffer" && !hideQuestion ?

                    <Stack direction="row" spacing={2} sx={{ ml: 2, mb: 2, direction: "ltr" }}>
                        <Button variant="outlined" color="error"
                            onClick={() => answer(false)}>
                            رد
                        </Button>
                        <Button color="success" variant="outlined"
                            onClick={() => answer(true)}>
                            تایید
                        </Button>
                    </Stack>
                    : (!report.isAnswerNeed &&
                        <CardContent>
                            {report.title === "jobOffer" &&
                                <Typography component="div" variant="body2">
                                    {`  پیشنهاد کار توسط ${report.recepiant.userName || "کاربر"} پاسخ  ${report.answer ? "مثبت" : "منفی"} دریافت کرد`}
                                </Typography>}
                            {report.title === "dismissal" &&
                                <Typography component="div" variant="body2">
                                    {`${report.recepiant.userName || "کاربر"}  از کسب و کار  ${report.business.businessBrand || report.business.businessName} اخراج شد`}
                                </Typography>}
                        </CardContent>
                    )
                }
            </Card>
            <CustomSnackbar
                open={snackbarAccept}
                onClose={() => { setSnackbarAccept(false) }}
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
                onClose={() => { setSnackbarReject(false) }}
                message="صورتحساب لغو گردید"
                severity="info"
            />
        </Box>
    );
}
