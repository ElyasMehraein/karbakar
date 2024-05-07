import * as React from 'react';
import Box from '@mui/material/Box';
import ItsAvatar from "@/components/modules/ItsAvatar"
import Typography from "@mui/material/Typography";
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import { CardActionArea, Container } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import BillProductFrame from './BillProductFrame';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function BillFrame({ user, bill }) {
    const [snackbarAccept, setSnackbarAccept] = React.useState(false);
    const [snackbarReject, setSnackbarReject] = React.useState(false);
    const [snackbarServerError, setSnackbarServerError] = React.useState(false);
    const router = useRouter()

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
        res.status === 200 ? setSnackbarReject(true) : setSnackbarServerError(true)
    }
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClose = () => {
        setOpenDialog(false);
    };
    return (
        <Box >
            <Container maxWidth="md">
                <Box >
                    <Card sx={{ my: 1, bgcolor: "#e3f2fd" }}>
                        <Suspense fallback={<p>Loading feed...</p>}>

                            <CardActionArea onClick={() => router.push(`/${bill.from.businessName}`)}>

                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ ml: 1 }}>
                                            <ItsAvatar isAvatar={bill.from.isAvatar} userCodeOrBusinessBrand={bill.from.businessName} />
                                        </Avatar>
                                    }
                                    title={bill.from.businessBrand}
                                    subheader={bill.from.businessName}
                                />
                            </CardActionArea>
                        </Suspense>

                        <CardContent >
                            {bill.products.map(product => {
                                return <BillProductFrame key={product.productName} {...product} />
                            })
                            }
                            <Stack direction="row" spacing={2} sx={{ direction: "ltr" }}>
                                <Button variant="outlined" color="error" startIcon={<DeleteIcon />}
                                    onClick={() => deleteHandler()}>
                                    لغو
                                </Button>
                                <Box style={{ flexGrow: 1 }}></Box>
                                <Button color="success" variant="outlined" endIcon={<SendIcon />}
                                    onClick={() => setOpenDialog(true)}>
                                    تایید
                                </Button>
                            </Stack>
                        </CardContent>

                    </Card>

                </Box>

            </Container>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>تایید دریافت محصول یا خدمت</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Typography sx={{ my: 2 }} color="error">
                           تایید شما به معنی تایید کمیت و کیفیت و رضایت شما از محصولات دریافتی است
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>لغو</Button>
                    <Button onClick={() => saveHandler(true)}>دریافت شد</Button>
                </DialogActions>
            </Dialog>
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
