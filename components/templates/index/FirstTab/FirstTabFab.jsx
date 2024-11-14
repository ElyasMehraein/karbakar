import React, { useEffect, useState } from 'react'
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { Autocomplete, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import jobCategoriesData from "@/public/jobCategories";

// import dynamic from "next/dynamic";
// const Map = dynamic(() => import("@/components/templates/index/FirstTab/Map"), { ssr: false })

export default function FirstTabFab({ user, primeBusiness }) {

    const [selectedBusinessName, setSelectedBusinessName] = React.useState(primeBusiness.businessName)
    const userBusinesses = user.businesses.map(business => business.businessName)
    const businessID = user.businesses.map((business) => {
        if (business.businessName == selectedBusinessName) {
            return business._id
        }
    })


    const [jobCategory, setJobCategory] = useState("")
    let changeHandler = (e, value) => setJobCategory(value?.label)


    const [guilds, setGuilds] = useState([])

    const [selectedGuild, setsSelectedGuild] = useState("")
    console.log("selectedGuild", selectedGuild);
    const [requestText, setrequestText] = useState([])

    useEffect(() => {
        const getGuilds = async () => {
            try {
                const res = await fetch("/api/getGuilds", { method: "GET" })
                if (res.status === 200) {
                    const data = await res.json()
                    let recivedGuilds = data.data.map(guild => {
                        if (guild.jobCategory == jobCategory) {
                            return guild.guildName
                        }
                    })
                    recivedGuilds[0] ? setGuilds(recivedGuilds) : setGuilds([])
                } else if ((res.status === 403)) {
                    console.log("unauthorized access");
                }
            } catch (error) {
                console.error("Error fetching Guilds:", error);
            }
        }
        getGuilds()
    }, [])
    const formattedOptions = Object.entries(jobCategoriesData).flatMap(([group, categories]) =>
        categories.map(category => ({ label: category, group }))
    );
    const isOptionEqualToValue = (option, value) => {
        return option.label === value.label;
    };
    async function setDemandsForGuilds() {

        const res = await fetch('api/setDemandsForGuilds', {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ businessID, selectedGuild, requestText, jobCategory })
        })
        if (res.status === 500) {
            console.log("server error");
        } else if (res.status === 201) {
            console.log("Demands For the Guild sited successfully");
        } else if (res.status === 200) {
            console.log("Demands For the Guild deleted successfully");
        }
    }
    function handleDelete() {

    }

    return (
        <Container maxWidth="md" className="inMiddle" display="flex" align='center'>

            <Box >
                <Chip sx={{ m: 0.5, direction: 'ltr' }} label="ذوب آهن" variant="outlined" onDelete={handleDelete} />
                <Chip sx={{ direction: 'ltr' }} label="بقالی" variant="outlined" onDelete={handleDelete} />
                <Chip sx={{ direction: 'ltr' }} label="تولید فولاد سرد و گرم و خشک و مرطوب" variant="outlined" onDelete={handleDelete} />
                <Chip sx={{ direction: 'ltr' }} label="zsvdfdsfdsdv" variant="outlined" onDelete={handleDelete} />
                <Chip sx={{ direction: 'ltr' }} label="zsdsfsdfassdczsvdsdv" variant="outlined" onDelete={handleDelete} />
                <Chip sx={{ direction: 'ltr' }} label="aa" variant="outlined" onDelete={handleDelete} />
                <Chip sx={{ direction: 'ltr' }} label="ssdd" variant="outlined" onDelete={handleDelete} />
                <Chip sx={{ direction: 'ltr' }} label="aa" variant="outlined" onDelete={handleDelete} />
                <Chip sx={{ direction: 'ltr' }} label="zsdsfsdfassdczsvdsdv" variant="outlined" onDelete={handleDelete} />

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
                        setSelectedProductName(e.target.value);
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

            {/* <Typography sx={{ m: 2, textAlign: "center", fontSize: 14 }}>دوست دارید تامین‌کننده‌های شما به کدام نقطه از نقشه نزدیک‌تر باشند؟</Typography>
            <Map business={user.businesses[0]} ></Map> */}
            <TextField
                id="requestText"
                label="شرح درخواست خود را وارد نمایید(غیر الزامی)"
                multiline
                rows={4}
                placeholder="مثلا تولید کننده تجهیزات کشاورزی هستم و به انواع ورق و پروفیل آهن نیاز دارم"
                fullWidth
                size="small"
                onChange={(e) => setrequestText(e.target.value)}
                sx={{ mt: 2 }}
            />
            <Button

                sx={{ mt: 2 }}
                children={"ثبت درخواست"}
                variant="contained"
                // disabled={selectedProduct && unitOfMeasurement && amount ? false : true}
                onClick={() => setDemandsForGuilds()}
            />
        </Container>
    )
}
