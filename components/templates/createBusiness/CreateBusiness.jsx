"use client"
import { Box, Button, Container, TextField, Typography, Autocomplete } from '@mui/material'
import MyAppBar from '@/components/modules/MyAppBar'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { selectGuild } from '@/components/typoRepo';
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import { green } from '@mui/material/colors';
import jobCategoriesData from "@/public/jobCategories";

export default function createBusiness({ distinctGuilds }) {
    const router = useRouter()
    const [businessName, setBusinessName] = useState("")
    const [guildName, setGuildName] = useState("")
    const [jobCategory, setJobCategory] = useState("")
    const [snackbarError, setSnackbarError] = useState(false);
    const [snackbarErrorMessage, setSnackbarErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    console.log("jobCategory",jobCategory);

    const formattedOptions = Object.entries(jobCategoriesData).flatMap(([group, categories]) =>
        categories.map(category => ({ label: category, group }))
    );
    let changeHandler = (e, value) => setJobCategory(value.label)
    const isOptionEqualToValue = (option, value) => {
        return option.label === value.label;
      };
    const buttonSx = {
        mt: 5,
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };
    const updateGuildName = (newGuildName) => {
        setGuildName(newGuildName);
    };

    async function createThisBusiness(businessName, guildName) {
        const res = await fetch('api/signbusiness', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ businessName, guildName })
        })
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
            setSnackbarErrorMessage("نام کسب و کاز بایستی بیشتر از 3 کلمه باشد")
        } else if (res.status === 409) {
            setSnackbarError(true)
            setSnackbarErrorMessage("عضویت در بیش از 3 کسب و کار مجاز نیست")

        } else if (res.status === 406) {
            setSnackbarError(true)
            setSnackbarErrorMessage(" برای نام کسب و کار تنها از حروف کوچک و بزرگ انگلیسی بدون فاصله و نقطه استفاده نمایید")
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
                    <Autocomplete
                        sx={{ my: 3 }}
                        size='small'
                        options={formattedOptions}
                        groupBy={(option) => option.group}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} label="انتخاب دسته" />}
                        isOptionEqualToValue={isOptionEqualToValue}
                        onChange={changeHandler}
                    />
                    <Typography sx={{ fontSize: 12 }} >یک ID لاتین برای کسب و کار خود انتخاب کنید</Typography>
                    <TextField
                        required
                        size='small'
                        error={snackbarError}
                        sx={{ my: 3 }}
                        placeholder='حداکثر 30 کارکتر' variant="outlined"
                        label="برند کسب و کار شما"
                        onChange={(e) => { setSnackbarError(false); setBusinessName(e.target.value) }}
                    />
                    <Typography sx={{ py: 1, textAlign: "center", fontSize: 12 }}>{selectGuild}</Typography>

                    <Button sx={buttonSx} onClick={() => createThisBusiness(businessName, guildName)} variant="contained">
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
