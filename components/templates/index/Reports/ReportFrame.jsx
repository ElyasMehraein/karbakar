import * as React from 'react';
import Box from '@mui/material/Box';
import ItsAvatar from "@/components/modules/ItsAvatar"
import Typography from "@mui/material/Typography";
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import { Container } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function ReportFrame({ report }) {
    console.log("report in frame", report);

    const [snackbarAccept, setSnackbarAccept] = React.useState(false);
    const [snackbarReject, setSnackbarReject] = React.useState(false);
    const [snackbarServerError, setSnackbarServerError] = React.useState(false);

    const saveHandler = async () => {
        let billId = bill._id
        const res = await fetch("/api/AcceptBill", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                billId,
            }),
        });
        console.log("res", res);
        res.status === 200 ? setSnackbarAccept(true) : setSnackbarServerError(true)
    }

    const deleteHandler = async () => {
        const res = await fetch("/api/billDelete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                billId: bill._id
            }),
        });
        console.log("res", res);
        res.status === 200 ? setSnackbarReject(true) : setSnackbarServerError(true)
    }

    return (
        <Box >
            <Container maxWidth="md">
                <Card sx={{ minWidth: 250, my: 1, bgcolor: "#e3f2fd" }}>
                    <Typography variant="body2" color="initial">درخواست همکاری </Typography>

                    <CardHeader
                        avatar={
                            <Avatar sx={{ ml: 1, width: 40, height: 40 }} >
                                <ItsAvatar userCodeOrBusinessBrand={report.business.businessName} />
                            </Avatar>
                        }
                        title={report.business.businessBrand}
                        subheader={report.business.businessName}
                    />
                    <Stack direction="row" spacing={2} sx={{ direction: "ltr" }}>
                        <Button variant="outlined" color="error" startIcon={<DeleteIcon />}
                            onClick={() => deleteHandler()}>
                            لغو
                        </Button>
                        <Button color="success" variant="outlined" endIcon={<SendIcon />}
                            onClick={() => saveHandler(true)}>
                            تایید
                        </Button>
                    </Stack>
                    <CardContent >

                        {/* {report.bill?.products.map(product => {
                            return <BillProductFrame key={product.productName} {...product} />
                        })
                        }
                        {!report.isjobOffersAnswerd ?
                            <Stack direction="row" spacing={2} sx={{ direction: "ltr" }}>
                                <Button variant="outlined" color="error" startIcon={<DeleteIcon />}
                                    onClick={() => deleteHandler()}>
                                    لغو
                                </Button>
                                <Box style={{ flexGrow: 1 }}></Box>
                                <Button color="success" variant="outlined" endIcon={<SendIcon />}
                                    onClick={() => saveHandler(true)}>
                                    تایید
                                </Button>
                            </Stack>
                            : report.jobOfferAnswer ?
                                <Typography>شما به این درخواست پاسخ مثبت دادید</Typography> :
                                <Typography>شما به این درخواست پاسخ منفی دادید</Typography>

                        } */}
                    </CardContent>
                </Card>
            </Container>
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
