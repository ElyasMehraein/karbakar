"use client"
import * as React from "react";
import { Box, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ItsAvatar from '@/components/modules/ItsAvatar'
import { Button } from '@mui/material';
import { blue } from '@mui/material/colors';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, Chip } from "@mui/material";
import { SecondTabText } from "@/components/typoRepo";
import SelectCategoryAndGuild from "@/components/modules/SelectCategoryAndGuild";
import AccordionServise from "@/components/modules/AccordionServise";

export default function SecondTab({ primeBusiness }) {

    const [selectedGuild, setSelectedGuild] = useState(null)

    const setGuildHandler = (guild) => {
        setSelectedGuild(guild)
    }

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
        <Container maxWidth="md">
            <AccordionServise>
                {SecondTabText()}
            </AccordionServise>
            <Box className='inMiddle'
                sx={{
                    '& .MuiTextField-root': { width: '30ch' },
                    my: 3
                }}
                display="flex" flexDirection="column">
                <SelectCategoryAndGuild primeBusiness={primeBusiness} sendDataToParent={setGuildHandler} />
                {businesses.length ?
                    <>
                        <Typography sx={{ m: 2, textAlign: "center", fontSize: 14 }}>
                            {`${businesses.length} کسب و کار و ${totalWorkers} نفر عضو این کسب و کارها متقاضی دریافت محصولات صنفی که انتخاب نمودید هستند`}
                        </Typography>
                        {businesses.map((business) => {
                            return (
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
                                            <ItsAvatar userCodeOrBusinessBrand={business.businessName} alt=" avatar" />
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
