"use client"
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import MyAppBar from '@/components/modules/MyAppBar'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Guild from "@/components/modules/Guild"
import { selectGuild } from '@/components/typoRepo';
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import { green } from '@mui/material/colors';

export default function createBusiness({ distinctGuilds }) {
    const router = useRouter()
    const [businessName, setBusinessName] = useState("")
    const [guildname, setGuildName] = useState("")
    const [snackbarError, setSnackbarError] = useState(false);
    const [snackbarErrorMessage, setSnackbarErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };
    const updateGuildname = (newGuildname) => {
        setGuildName(newGuildname);
    };

    async function createThisBusiness(businessName, guildname) {
        const res = await fetch('api/signbusiness', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ businessName, guildname })
        })
        console.log("response to creating new business is =>", res);
        if (res.status === 201) {
            setSuccess(true)
            router.push('/')
        } else if (res.status === 409) {
            setSnackbarError(true)
            setSnackbarErrorMessage("این نام قبلا ایجاد شده و تکراری است لطفا نام دیگری انتخاب کنید")

        } else if (res.status === 400) {
            setSnackbarError(true)
            setSnackbarErrorMessage("ورودیهای ستاره دار را کامل کنید")
        } else if (res.status === 405) {
            setSnackbarError(true)
            setSnackbarErrorMessage("عضویت در بیش از 3 کسب و کار مجاز نیست")

        } else if (res.status === 406) {
            setSnackbarError(true)
            setSnackbarErrorMessage(" برای نام کسب و کار تنها از حروف کوچک و بزرگ انگلیسی استفاده نمایید")
        }
    }
    return (
        <>
            <MyAppBar business={null} logedUserCode={null} whichUserProfile={null} />
            <Container maxWidth="md">
                <Box className='inMiddle'
                    sx={{
                        '& .MuiTextField-root': { width: '30ch' },
                        my: 3
                    }}
                    display="flex" flexDirection="column">
                    <Typography >یک نام برای کسب و کار خودانتخاب کنید</Typography>
                    <TextField
                        required
                        error={snackbarError}
                        sx={{ my: 3 }}
                        placeholder='حداکثر 30 کارکتر' variant="outlined"
                        label="نام کسب و کار"
                        onChange={(e) => { setSnackbarError(false); setBusinessName(e.target.value) }}
                    />
                    <Typography sx={{ py: 1, textAlign: "center" }}>{selectGuild}</Typography>

                    <Guild updateGuildname={updateGuildname} distinctGuilds={distinctGuilds} snackbarError={snackbarError} />
                    <Button sx={buttonSx} onClick={() => createThisBusiness(businessName, guildname)} variant="contained">
                        ایجاد کسب و کار
                    </Button>
                </Box>
            </Container>
            <CustomSnackbar
                open={snackbarError}
                onClose={() => setSnackbarError(false)}
                message={snackbarErrorMessage}
                severity="error"
            />
        </>
    )

}
