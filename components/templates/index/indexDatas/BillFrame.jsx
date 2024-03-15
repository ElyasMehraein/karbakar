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
import BillProductFrame from './BillProductFrame';



export default function BillFrame({ user, bill }) {
    const [snackbarAccept, setSnackbarAccept] = React.useState(false);
    const [snackbarReject, setSnackbarReject] = React.useState(false);

    const saveHandler = async (newValue) => {
        console.log("newValue", newValue);
        let model = "BillModel"
        let id = bill._id
        let fieldName = "isAccept"
        await fetch("/api/updateDB", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model, id, fieldName, newValue
            }),
        });
    }

    return (
        <Box >
            <Container maxWidth="md">
                <Box >
                    <Card sx={{ my: 1, bgcolor: "#e3f2fd" }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ ml: 1, width: 40, height: 40 }} >
                                    <ItsAvatar userCodeOrBusinessBrand={bill.from.businessName} />
                                </Avatar>
                            }
                            title={bill.from.businessBrand}
                            subheader={bill.from.businessName}

                        />

                        <CardContent >
                            {bill.products.map(product => {
                                return <BillProductFrame key={bill.id} {...product} />
                            })
                            }
                            <Stack direction="row" spacing={2} sx={{ direction: "ltr" }}>
                                <Button variant="outlined" color="error" startIcon={<DeleteIcon />}
                                    onClick={() => deleteHandler}>
                                    لغو
                                </Button>
                                <Box style={{ flexGrow: 1 }}></Box>
                                <Button color="success" variant="outlined" endIcon={<SendIcon />}
                                    onClick={() => {
                                        saveHandler(true)
                                        setSnackbarAccept(true)
                                    }}>

                                    تایید
                                </Button>
                            </Stack>
                        </CardContent>

                    </Card>

                </Box>

            </Container>
            <CustomSnackbar
                open={snackbarAccept}
                onClose={() => setSnackbarAccept(false)}
                message="دریافت محصولات و خدمات صورتحساب تایید شد"
            />
            <CustomSnackbar
                open={snackbarReject}
                onClose={() => setSnackbarReject(false)}
                message="صورتحساب لغو گردید"
            />
        </Box>
    );
}
