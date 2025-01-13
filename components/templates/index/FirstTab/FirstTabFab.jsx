import React, { useEffect, useState } from 'react'
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { Autocomplete, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import jobCategoriesData from "@/utils/JobCategories";
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import { CircularProgress } from '@mui/material';

export default function FirstTabFab({ user, primeBusiness }) {

    const [isLoading, setIsLoading] = useState(true);

    //chips
    const [chips, setChips] = useState(primeBusiness.demandsForGuilds.map(demandsForGuild => demandsForGuild.guild))
    const [chipsObjectTrigger, setChipsObjectTrigger] = useState(false)

console.log("chips", chips);
    // user Bussiness
    const [selectedBusinessName, setSelectedBusinessName] = React.useState(primeBusiness.businessName)
    const userBusinesses = user.businesses.map(business => business.businessName)
    const selectedBusiness = user.businesses.find((business) => {
        if (business.businessName == selectedBusinessName) {
            return business
        }
    })

    //jobCategory
    const [jobCategory, setJobCategory] = useState("")
    let changeHandler = (e, value) => setJobCategory(value?.label)

    //guilds
    const [guilds, setGuilds] = useState([])
    const [selectedGuild, setsSelectedGuild] = useState("")

    //requestTitle
    const [requestText, setrequestText] = useState([])

    //snackbar
    const [open406Snackbar, setOpen406Snackbar] = useState(false);
    const [open422Snackbar, setOpen422Snackbar] = useState(false);


    // load chips
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
    //                 const demandsGuilds = selectedBusiness.demandsForGuilds.map(demandGuild => {
    //                     const guild = data.data.find(guild => guild._id === demandGuild.guild);
    //                     return guild ? guild : null;
    //                 }).filter(guild => guild);

    //                 const uniqueChips = new Set([...chips, ...demandsGuilds]);
    //                 setChips(Array.from(uniqueChips));
    //        




    // prepare data for inputs
    const formattedOptions = Object.entries(jobCategoriesData).flatMap(([group, categories]) =>
        categories.map(category => ({ label: category, group }))
    );
    const isOptionEqualToValue = (option, value) => {
        return option.label === value.label;
    };


    // update DB
    async function setDemandsForGuilds() {
        const res = await fetch('api/setDemandsForGuilds', {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ businessID: selectedBusiness._id, selectedGuild, requestText, jobCategory })
        });

        if (!res.ok) {
            console.error("Server Error: ", res.status);
            return;
        }

        try {
            const result = await res.json();
            if (result.data && typeof result.data === "string") {
                setChips((prevChips) => {
                    if (!prevChips.some(chip => chip._id === result.data)) {
                        return [...prevChips, { _id: result.data, guildName: selectedGuild }];
                    }
                    return prevChips;
                });
            } else {
                console.error("Invalid data format received:", result);
            }
        } catch (error) {
            console.error("Error parsing response:", error);
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
            setChipsObjectTrigger(!chipsObjectTrigger)
            setChips((prevChips) => prevChips.filter((chip) => chip._id !== demandID));
            console.log("Demand For the Guild deleted successfully");
            setsSelectedGuild("")
            setrequestText("")
        }
    }



    return (
        <Container maxWidth="md" className="inMiddle" display="flex" align='center'>
            {isLoading ?
                <Box className="inMiddle">
                    <CircularProgress />
                </Box>
                : <>
                    <Box >
                        {chips.map(chip => {
                            return (
                                <Chip
                                    key={chip._id}
                                    sx={{ m: 0.5, direction: 'ltr' }}
                                    label={chip.guildName}
                                    value={chip._Id}
                                    variant="outlined"
                                    onDelete={() => deleteDemandsForGuild(chip._id)}
                                />
                            )
                        })}
                    </Box>
                    <FormControl sx={{ mt: 3, width: 300 }}>
                        <InputLabel id="chose-business-lable">برای این کسب و کار ثبت شود</InputLabel>
                        <Select
                            size='small'
                            labelId="chose-business-lable"
                            id="chose-business"
                            value={selectedBusinessName}
                            label="برای این کسب و کار ثبت شود"
                            onChange={(e) => {
                                setSelectedBusinessName(e.target.value);
                            }}
                        >
                            {userBusinesses.map((userBusinessesName) => {
                                return <MenuItem key={userBusinessesName} value={userBusinessesName}>{userBusinessesName}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
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
