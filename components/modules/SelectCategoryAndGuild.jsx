"use client"
import { Box, Button, Container, TextField, Typography, Autocomplete } from '@mui/material'
import MyAppBar from '@/components/modules/MyAppBar'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import { green } from '@mui/material/colors';
import jobCategoriesData from "@/public/jobCategories";

export default function SelectCategoryAndGuild({ sendDataToParent }) {

    // select category

    const [jobCategory, setJobCategory] = useState("")
    const formattedOptions = Object.entries(jobCategoriesData).flatMap(([group, categories]) =>
        categories.map(category => ({ label: category, group }))
    );
    const isOptionEqualToValue = (option, value) => {
        return option.label === value.label;
    };
    let changeHandler = (e, value) => setJobCategory(value?.label)


    // select guild

    const [guilds, setGuilds] = useState([])
    const [guild, setGuild] = useState("")

    useEffect(() => {
        const getGuilds = async () => {
            try {
                const res = await fetch("/api/getGuilds", { method: "GET" });
                if (res.status === 200) {
                    const { data } = await res.json();
                    let recivedGuilds = data
                        .filter(guild => guild.jobCategory === jobCategory)
                        .map(guild => guild);

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

    // send guild to parent
    useEffect(() => {
        sendDataToParent(guild, jobCategory);
    }, [guild]);

    return (
        <Container maxWidth="md">
            <Box className='inMiddle'
                sx={{
                    '& .MuiTextField-root': { width: '300px' },
                    my: 3
                }}
                display="flex" flexDirection="column">
                <Autocomplete
                    sx={{ my: 1 }}
                    size='small'
                    options={formattedOptions}
                    groupBy={(option) => option.group}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => <TextField {...params} label="انتخاب دسته بندی" />}
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
                    options={guilds.map(guild => guild.guildName)}
                    renderInput={(params) => <TextField {...params} label="عنوان صنف" />}
                    onInputChange={(event, newInputValue) => {
                        setGuild(guilds.find(guild => guild.guildName === newInputValue))
                    }}
                />
            </Box>
        </Container>
    )
}
