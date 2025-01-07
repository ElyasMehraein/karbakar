"use client"
import { Box, Button, Container, TextField, Typography, Autocomplete } from '@mui/material'
import MyAppBar from '@/components/modules/MyAppBar'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import { green } from '@mui/material/colors';
import jobCategoriesData from "@/public/jobCategories";

export default function CreateBusiness() {
    const router = useRouter();
    const [guilds, setGuilds] = useState([]);
    const [businessName, setBusinessName] = useState("");
    const [guildName, setGuildName] = useState("");
    const [jobCategory, setJobCategory] = useState("");
    const [snackbarError, setSnackbarError] = useState(false);
    const [snackbarErrorMessage, setSnackbarErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const getGuilds = async () => {
            try {
                const res = await fetch("/api/getGuilds", { method: "GET" });
                if (res.status === 200) {
                    const { data } = await res.json();
                    const receivedGuilds = data.filter(guild => guild.jobCategory === jobCategory).map(guild => guild.guildName);
                    setGuilds(receivedGuilds.length ? receivedGuilds : []);
                } else if (res.status === 403) {
                    console.log("Unauthorized access");
                }
            } catch (error) {
                console.error("Error fetching Guilds:", error);
            }
        };
        if (jobCategory) getGuilds();
    }, [jobCategory]);

    const formattedOptions = Object.entries(jobCategoriesData).flatMap(([group, categories]) =>
        categories.map(category => ({ label: category, group }))
    );

    const changeHandler = (e, value) => setJobCategory(value?.label);

    const isOptionEqualToValue = (option, value) => option.label === value.label;

    const buttonSx = {
        mt: 5,
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    const createThisBusiness = async (businessName, guildName) => {
        try {
            const res = await fetch('api/signbusiness', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ businessName, guildName, jobCategory })
            });

            if (res.status === 201) {
                setSuccess(true);
                router.push('/');
            } else {
                const errorMessages = {
                    409: "این نام قبلا ایجاد شده و تکراری است لطفا نام دیگری انتخاب کنید",
                    400: "ورودیهای ستاره دار را کامل کنید",
                    405: "نام کسب و کاز بایستی بیشتر از 3 کلمه باشد",
                    406: "برای نام کسب و کار تنها از حروف کوچک و بزرگ انگلیسی بدون فاصله و نقطه استفاده نمایید"
                };
                setSnackbarError(true);
                setSnackbarErrorMessage(errorMessages[res.status] || "خطای ناشناخته");
            }
        } catch (error) {
            console.error("Error creating business:", error);
        }
    };

    return (
        <>
            <MyAppBar business={null} logedUserCode={null} whichUserProfile={null} />
            <Container maxWidth="md">
                <Box className='inMiddle'
                    sx={{ '& .MuiTextField-root': { width: '30ch' }, my: 3 }}
                    display="flex" flexDirection="column">

                    <Autocomplete
                        sx={{ m: 1 }}
                        size='small'
                        options={formattedOptions}
                        groupBy={(option) => option.group}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} label="انتخاب دسته بندی شغل" />}
                        isOptionEqualToValue={isOptionEqualToValue}
                        onChange={changeHandler}
                    />

                    {jobCategory && guilds.length > 0 && (
                        <Typography sx={{ py: 1, textAlign: "center", fontSize: 12 }}>
                            اگر عنوان های صنف موجود به کسب و کار شما مرتبط نیست یک نام مناسب تایپ کنید
                        </Typography>
                    )}

                    <Autocomplete
                        size='small'
                        sx={{ m: 1 }}
                        id="add-product"
                        freeSolo
                        options={guilds}
                        renderInput={(params) => <TextField {...params} label="عنوان صنف" />}
                        onInputChange={(event, newInputValue) => setGuildName(newInputValue)}
                    />

                    <TextField
                        required
                        size='small'
                        error={snackbarError}
                        sx={{ my: 1 }}
                        placeholder='حداکثر 30 کارکتر'
                        variant="outlined"
                        label="برند کسب و کار شما"
                        onChange={(e) => { setSnackbarError(false); setBusinessName(e.target.value); }}
                    />

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
    );
}
