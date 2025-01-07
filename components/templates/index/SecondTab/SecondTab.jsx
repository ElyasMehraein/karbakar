"use client"
import * as React from "react";
import {
    Avatar, Box, Container, List,
    ListItem, ListItemAvatar, ListItemButton,
    ListItemText, TextField, Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ItsAvatar from '@/components/modules/ItsAvatar'
import jobCategoriesData from "@/utils/JobCategories";
import { Autocomplete, Button } from '@mui/material';
import { blue } from '@mui/material/colors';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const color = blue[50];

export default function SecondTab({ user, primeBusiness }) {

    // select job category 
    const [jobCategory, setJobCategory] = useState("")
    const formattedOptions = Object.entries(jobCategoriesData).flatMap(([group, categories]) =>
        categories.map(category => ({ label: category, group }))
    );
    let changeHandler = (e, value) => setJobCategory(value?.label)
    const isOptionEqualToValue = (option, value) => {
        return option.label === value.label;
    };

    // get and select guild after job category selecting
    const [guilds, setGuilds] = useState([]);
    const [selectedGuild, setSelectedGuild] = useState(null)

    useEffect(() => {
        const getGuilds = async () => {
            try {
                const res = await fetch("/api/getGuilds", { method: "GET" });
                if (res.status === 200) {
                    const { data } = await res.json();
                    let recivedGuilds = data.filter(guild => guild.jobCategory === jobCategory)
                    setGuilds(recivedGuilds)
                } else if (res.status === 403) {
                    console.log("unauthorized access");
                }
            } catch (error) {
                console.error("Error fetching Guilds:", error);
            }
        };
        getGuilds();
    }, [jobCategory]);


    // get and show businesses
    // tammam business ha ro check kon har kodom toye demand hash id selected guild bod ro bede

    const router = useRouter()
    const [businesses, setBusinesses] = useState([]);
    const [totalWorkers, setTotalWorkers] = useState(null);



    useEffect(() => {
        if (!selectedGuild) return;
        const getBusinesses = async () => {
            try {
                const res = await fetch(`/api/businessesWhoDemandsGuild?guildID=${selectedGuild._id}`
                    , { method: "GET" })
                if (res.status === 200) {
                    const { data } = await res.json()
                    setBusinesses(data)
                    const totalWorkers = data.reduce((acc, business) => acc + (business.workers?.length || 0), 0);
                    setTotalWorkers(totalWorkers)
                } else if ((res.status === 403)) {
                    console.log("unauthorized access");
                }
            } catch (error) {
                console.error("Error fetching Businesses:", error);
            }
        }
        getBusinesses()
    }, [selectedGuild])



    return (
        <Container maxWidth="md" className="inMiddle" display="flex" align='center'>
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
                <Autocomplete
                    size='small'
                    sx={{ m: 1 }}
                    id="add-product"
                    freeSolo
                    options={guilds.map((guild) => guild.guildName)}
                    renderInput={(params) => <TextField {...params} label="عنوان صنف" />}
                    onInputChange={(event, newInputValue) => {
                        const selected = guilds.find(guild => guild.guildName === newInputValue);
                        setSelectedGuild(selected || null);
                    }}
                />
                {businesses.length ?
                    <>
                        <Typography sx={{ m: 2, textAlign: "center", fontSize: 14 }}>
                            {`${businesses.length} کسب و کار و ${totalWorkers} نفر عضو این کسب و کارها متقاضی دریافت محصولات صنفی که انتخاب نمودید هستند`}
                        </Typography>
                        {businesses.map((business) => {
                            return (
                                // <List key={business._id} sx={{ width: '100%', maxWidth: 700, }}>
                                //     <ListItemButton sx={{ bgcolor: color, borderRadius: 2, py: 3 }} onClick={() => router.push(`/${business.businessName}`)}>
                                //         <ListItemAvatar>
                                //             <Avatar>
                                //                 <ItsAvatar userCodeOrBusinessBrand={business.businessName} isAvatar={business.isAvatar} alt="workers avatar" />
                                //             </Avatar>
                                //         </ListItemAvatar>
                                //         <ListItem dense secondaryAction={<ListItemText sx={{ ml: 5 }} align="right" primary={business.businessBrand} secondary={
                                //             <React.Fragment>
                                //                 <Typography
                                //                     component="span"
                                //                     variant="body2"
                                //                     sx={{ color: 'text.primary', display: 'inline' }}
                                //                 >
                                //                     {business.bio + " — " + business.demandsForGuilds.map(guild => guild.requestText)}
                                //                 </Typography>
                                //                 { business.demandsForGuilds.map(guild => guild.requestText)}
                                //             </React.Fragment>
                                //         } />} >

                                //         </ListItem>
                                //     </ListItemButton>
                                // </List>
                                <Accordion key={business._id}
                                    sx={{ width: '100%', maxWidth: 700, bgcolor: blue[50], my: 1 }} >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="pane-content"
                                        id="pane-header"
                                    >
                                        <Box
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                flexDirection: "row",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            <Avatar >
                                                <ItsAvatar isAvatar={business.isAvatar} userCodeOrBusinessBrand={business.businessName} alt=" avatar" />
                                            </Avatar>
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "flex-start",
                                                    flexDirection: "column",
                                                    mr: 2
                                                }}

                                            >
                                                <Typography sx={{ fontSize: 12, m: 0, fontWeight: 'bold' }} textAlign={"right"}>
                                                    {business.businessBrand}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: 12,
                                                        //later i deside if i need to use the below code
                                                        display: '-webkit-box',
                                                        overflow: 'hidden',
                                                        WebkitBoxOrient: 'vertical',
                                                        WebkitLineClamp: 2
                                                    }}
                                                    align="justify" dir="rtl" >
                                                    {business.businessName}
                                                    {business.bio && " — " + business.bio}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {business.demandsForGuilds
                                            .filter((guild) => guild.guild === selectedGuild._id)
                                            .map((guild) => guild.requestText)
                                            .join(", ")
                                            || "کاربر برای این درخواست توضیحی قرار نداده است"}
                                    </AccordionDetails>

                                    <AccordionActions>
                                        <Button
                                            onClick={() => router.push(`/${business.businessName}`)}                                        >
                                            مشاهده کسب و کار
                                        </Button>
                                    </AccordionActions>

                                </Accordion>
                            )
                        })} </>
                    :
                    (!businesses.length) && (totalWorkers === 0) &&

                    <Typography>کسب و کاری برای نمایش وجود ندارد </Typography>

                }
            </Box>
        </Container >

    )






}
