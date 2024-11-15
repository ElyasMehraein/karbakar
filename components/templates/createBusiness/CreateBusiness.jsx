"use client"
import { Box, Button, Container, TextField, Typography, Autocomplete } from '@mui/material'
import MyAppBar from '@/components/modules/MyAppBar'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import { green } from '@mui/material/colors';
import jobCategoriesData from "@/public/jobCategories";

export default function createBusiness() {
    const router = useRouter()
    const [guilds, setGuilds] = useState([])

    const [businessName, setBusinessName] = useState("")
    const [guildName, setGuildName] = useState("")
    const [jobCategory, setJobCategory] = useState("")
    const [snackbarError, setSnackbarError] = useState(false);
    const [snackbarErrorMessage, setSnackbarErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const getGuilds = async () => {
            try {
                const res = await fetch("/api/getGuilds", { method: "GET" });
                if (res.status === 200) {
                    const {data} = await res.json();
                    let recivedGuilds = data
                        .filter(guild => guild.jobCategory === jobCategory)
                        .map(guild => guild.guildName);

                    setGuilds(recivedGuilds.length ? recivedGuilds : []);

               } else if (res.status === 403) {
                    console.log("unauthorized access");
                }
            } catch (error) {
                console.error("Error fetching Guilds:", error);
            }
        };
        getGuilds();
    }, [jobCategory]);

    const formattedOptions = Object.entries(jobCategoriesData).flatMap(([group, categories]) =>
        categories.map(category => ({ label: category, group }))
    );

    let changeHandler = (e, value) => setJobCategory(value?.label)


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
    async function createThisBusiness(businessName, guildName) {
        const res = await fetch('api/signbusiness', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ businessName, guildName, jobCategory })
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
                        sx={{ m: 1 }}
                        size='small'
                        options={formattedOptions}
                        groupBy={(option) => option.group}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} label="انتخاب دسته بندی شغل" />}
                        isOptionEqualToValue={isOptionEqualToValue}
                        onChange={changeHandler}
                    />
                    {jobCategory &&
                        <>
                            {guilds[0] ?
                                <Typography sx={{ py: 1, textAlign: "center", fontSize: 12 }}>
                                    اگر عنوان های صنف موجود به کسب و کار شما مرتبط نیست یک نام مناسب تایپ کنید
                                    <br />
                                    انتخاب صنف مناسب موجب بهتر دیده شدن کسب و کار شما می شود
                                </Typography>
                                :
                                <Typography sx={{ py: 1, textAlign: "center", fontSize: 12 }}>
                                    در این دسته بندی هنوز صنفی ایجاد نشده است  لذا برای ایجاد صنف جدید عنوان مناسب را تایپ کنید
                                </Typography>
                            }
                        </>
                    }
                    <Autocomplete
                        size='small'
                        sx={{ m: 1 }}
                        id="add-product"
                        freeSolo
                        options={guilds}
                        renderInput={(params) => <TextField {...params} label="عنوان صنف" />}
                        onInputChange={(event, newInputValue) => {
                            setGuildName(newInputValue)
                        }}
                    />
                    {guildName &&
                        <Typography sx={{ my: 1, fontSize: 12 }} >
                            .برند کسب و کار خود را وارد نمایید
                            کارکترهای مجاز : A-Z a-z فاصله و نقطه
                        </Typography>
                    }
                    <TextField
                        required
                        size='small'
                        error={snackbarError}
                        sx={{ my: 1 }}
                        placeholder='حداکثر 30 کارکتر' variant="outlined"
                        label="برند کسب و کار شما"
                        onChange={(e) => { setSnackbarError(false); setBusinessName(e.target.value) }}
                    />

                    <Button sx={buttonSx} onClick={() => createThisBusiness(businessName, guildName, jobCategory)} variant="contained">
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
