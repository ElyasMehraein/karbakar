import React, { useEffect, useState } from 'react'
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { Autocomplete, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import jobCategoriesData from "@/utils/JobCategories";
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import { CircularProgress } from '@mui/material';

export default function FirstTabFab({ user, primeBusiness }) {

    const [isLoading, setIsLoading] = useState(true);

    //snackbar
    const [open406Snackbar, setOpen406Snackbar] = useState(false);
    const [open422Snackbar, setOpen422Snackbar] = useState(false);

    // user Business
    const [selectedBusinessName, setSelectedBusinessName] = React.useState(primeBusiness.businessName)
    const userBusinesses = user.businesses.map(business => business.businessName)
    const selectedBusiness = user.businesses.find((business) => {
        if (business.businessName == selectedBusinessName) {
            return business
        }
    })

    //نیازهای ثبت شده
    const [chips, setChips] = useState([])

    // fill chips with update getDemandsGuilds from DB
    const [useEffectTrigger, setUseEffectTrigger] = useState(1);
    useEffect(() => {
        if (!selectedBusiness) return;
        const getDemandsGuilds = async () => {
            try {
                const res = await fetch(`/api/getBusinessesDemandsGuilds?businessID=${selectedBusiness._id}`
                    , { method: "GET" })
                if (res.status === 200) {
                    const { data } = await res.json()
                    setChips(data.map(demandsForGuilds => demandsForGuilds.guild));
                } else if ((res.status === 403)) {
                    console.log("unauthorized access");
                }
            } catch (error) {
                console.error("Error fetching Businesses:", error);
            }
        }
        getDemandsGuilds()
    }, [selectedBusiness, useEffectTrigger])


    //================ ثبت نیاز جدید ======================>

    //jobCategory
    const [jobCategory, setJobCategory] = useState("")
    let changeHandler = (e, value) => setJobCategory(value?.label)

    //guilds
    const [guilds, setGuilds] = useState([])
    const [selectedGuild, setsSelectedGuild] = useState("")

    //requestTitle
    const [requestText, setrequestText] = useState([])

    // load all guilds and show guilds related to jobCategory for select guild Autocomplete
    useEffect(() => {
        const getGuilds = async () => {
            try {
                const res = await fetch("/api/getGuilds", { method: "GET" });
                if (res.status === 200) {
                    const data = await res.json();
                    let recivedGuilds = data.data
                        .filter(guild => guild.jobCategory === jobCategory)
                        .map(guild => guild.guildName);
                    setGuilds(recivedGuilds.length ? recivedGuilds : []);
                    setIsLoading(false)
                } else if (res.status === 403) {
                    console.log("unauthorized access");
                }
            } catch (error) {
                console.error("Error fetching Guilds:", error);
            }
        };
        getGuilds();
    }, [jobCategory]);


    // prepare data for inputs
    const formattedOptions = Object.entries(jobCategoriesData).flatMap(([group, categories]) =>
        categories.map(category => ({ label: category, group }))
    );
    const isOptionEqualToValue = (option, value) => {
        return option.label === value.label;
    };


    // set Demand for guild in business DB
    async function setDemandsForGuilds() {
        const res = await fetch('api/setDemandsForGuilds', {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ businessID: selectedBusiness._id, selectedGuild, requestText, jobCategory })
        });

        if (res.status === 500) {
            console.log("server error");
        }
        if (res.status === 422) {
            setOpen422Snackbar(true)
        }
        if (res.status === 406) {
            setOpen406Snackbar(true)
            setsSelectedGuild("")
        } else if (res.status === 201) {
            setUseEffectTrigger(prevState => prevState + 1)
            setsSelectedGuild("")
            setrequestText("")
        }
    }

    // delete chips in DB
    async function deleteDemandsForGuild(demandID) {

        const res = await fetch('api/deleteDemandsForGuild', {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ businessID: selectedBusiness._id, demandID })
        })
        if (res.status === 500) {
            console.log("server error");
        } else if (res.status === 200) {
            setUseEffectTrigger(prevState => prevState + 1)
        }
    }



    return (
        <Container maxWidth="md" className="inMiddle" display="flex" align='center'>
            {isLoading ?
                <Box className="inMiddle">
                    <CircularProgress />
                </Box>
                : <>
                    {chips.length > 0 &&
                        <>
                            <Typography sx={{ fontSize: 14 }}>نیازهای ثبت شده برای این کسب و کار</Typography>
                            <Box >
                                {chips.map(chip => {
                                    return (
                                        <Chip
                                            key={chip._id}
                                            sx={{
                                                m: 0.5,
                                                direction: 'ltr',
                                                animation: 'greenRotate 0.4s ease-in-out',
                                                '@keyframes greenRotate': {
                                                    '0%': {
                                                        backgroundColor: 'transparent',
                                                        transform: 'rotate(0deg)',
                                                    },
                                                    '25%': {
                                                        backgroundColor: 'lightskyblue',
                                                        transform: 'rotate(5deg)',
                                                    },
                                                    '50%': {
                                                        backgroundColor: 'transparent',
                                                        transform: 'rotate(0deg)',
                                                    },
                                                    '75%': {
                                                        backgroundColor: 'lightgreen',
                                                        transform: 'rotate(-5deg)',
                                                    },
                                                    '100%': {
                                                        backgroundColor: 'transparent',
                                                        transform: 'rotate(0deg)',
                                                    },
                                                },
                                            }}
                                            label={chip.guildName}
                                            value={chip._Id}
                                            variant="outlined"
                                            onDelete={() => deleteDemandsForGuild(chip._id)}
                                        />

                                    )
                                })}
                            </Box>
                        </>
                    }
                    <FormControl sx={{ mt: 2, width: 300 }}>
                        <InputLabel id="chose-business-lable">انتخاب کسب و کار</InputLabel>
                        <Select
                            size='small'
                            labelId="chose-business-lable"
                            id="chose-business"
                            value={selectedBusinessName}
                            label="انتخاب کسب و کار"
                            onChange={(e) => {
                                setSelectedBusinessName(e.target.value);
                            }}
                        >
                            {userBusinesses.map((userBusinessesName) => {
                                return <MenuItem key={userBusinessesName} value={userBusinessesName}>{userBusinessesName}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <Typography sx={{ mt: 5, fontSize: 14 }}>برای کسب و کار انتخاب شده نیاز به خدمات چه صنفی دارید؟</Typography>
                    <Autocomplete
                        sx={{ m: 2, width: 300 }}
                        size='small'
                        options={formattedOptions}
                        groupBy={(option) => option.group}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} label="انتخاب دسته بندی شغل" />}
                        isOptionEqualToValue={isOptionEqualToValue}
                        onChange={changeHandler}
                    />
                    <Autocomplete
                        sx={{ width: 300 }}
                        size='small'
                        id="add-product"
                        freeSolo
                        inputValue={selectedGuild}
                        options={guilds}
                        renderInput={(params) => <TextField {...params} label="به محصولات چه صنفی نیاز دارید" />}
                        onInputChange={(event, newInputValue) => {
                            setsSelectedGuild(newInputValue)
                        }}
                    />

                    <TextField
                        id="requestText"
                        label="شرح درخواست خود را وارد نمایید(غیر الزامی)"
                        multiline
                        value={requestText}
                        rows={4}
                        placeholder="مثلا تولید کننده تجهیزات کشاورزی هستم و به انواع ورق و پروفیل آهن نیاز دارم"
                        fullWidth
                        size="small"
                        onChange={(e) => setrequestText(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <Button
                        sx={{ mt: 2 }}
                        variant="contained"
                        disabled={jobCategory && selectedGuild ? false : true}
                        onClick={() => setDemandsForGuilds()}
                    >
                        ثبت درخواست
                    </Button>
                    <CustomSnackbar
                        open={open406Snackbar}
                        onClose={() => setOpen406Snackbar(false)}
                        message={"درخواست برای این صنف قبلا ثبت شده است"}
                        severity="error"
                    />
                    <CustomSnackbar
                        open={open422Snackbar}
                        onClose={() => setOpen422Snackbar(false)}
                        message={"شما به سقف محدودیت ایجاد 30 درخواست رسیده اید"}
                        severity="error"
                    />
                </>}
        </Container>
    )
}
