"use client"
import * as React from "react";
import { FirtstTabText } from "@/components/typoRepo";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import { Avatar, Box, Container, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, TextField, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Accordion, AccordionDetails, Chip } from "@mui/material";
import ItsAvatar from '@/components/modules/ItsAvatar'
import LinearProgress from '@mui/material/LinearProgress';
import { Autocomplete, Button } from '@mui/material';
import { blue } from '@mui/material/colors';

const color = blue[50];

export default function SecondTab({ user, primeBusiness }) {

    const router = useRouter()
    const [mounted, setMounted] = useState(false);
    const [businesses, setBusinesses] = useState(false);
    const [guildNames, setGuildNames] = useState(false);
    const [expanded, setExpanded] = React.useState(false);


    console.log("carrr", primeBusiness.guild.guildName);
    useEffect(() => {
        const getBusinesses = async () => {
            try {
                const res = await fetch("/api/allBusinesses", { method: "GET" })
                if (res.status === 200) {
                    const data = await res.json()
                    setBusinesses(data.data)
                } else if ((res.status === 403)) {
                    console.log("unauthorized access");
                }
            } catch (error) {
                console.error("Error fetching Businesses:", error);
            }
        }
        getBusinesses()
        const getGuilds = async () => {
            try {
                const res = await fetch("/api/getGuilds", { method: "GET" })
                if (res.status === 200) {
                    const data = await res.json()
                    setGuildNames(data.data.map((guild) => {
                        return guild.guildName
                    }))
                } else if ((res.status === 403)) {
                    console.log("unauthorized access");
                }
            } catch (error) {
                console.error("Error fetching Businesses:", error);
            }
        }
        getGuilds()
        setMounted(true)

    }, [])


    return (mounted &&
        <>
            <Container maxWidth="md" className="inMiddle" display="flex" align='center'>
                <Box className='inMiddle'
                    sx={{
                        '& .MuiTextField-root': { width: '30ch' },
                        my: 3
                    }}
                    display="flex" flexDirection="column">
                    <Accordion sx={{ boxShadow: 0 }} expanded={expanded}>
                        <Chip
                            label="راهنمایی"
                            sx={{ direction: 'ltr' }}
                            onClick={() => setExpanded(!expanded)}
                            icon={<QuestionMarkOutlinedIcon sx={{ fontSize: 16 }} />}
                        />
                        <AccordionDetails>
                            <Typography>
                                {FirtstTabText}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Autocomplete
                        disablePortal
                        options={guildNames}
                        value={primeBusiness.guild.guildName}
                        sx={{ width: 300, my: 1 }}
                        renderInput={(params) => <TextField {...params} label="انتخاب صنف" />}
                    />
                    <Typography sx={{ m: 2, textAlign: "center", fontSize: 14 }}>283 کسب و کار و 4258 عضو این کسب و کارها متقاضی دریافت محصولات این صنف هستند</Typography>

                    {businesses ?
                        businesses.map((business) => {
                            return (
                                <List key={business._id} sx={{ width: '100%', maxWidth: 700, }}>
                                    <ListItemButton sx={{ bgcolor: color, borderRadius: 2, py: 3 }} onClick={() => router.push(`/${business.businessName}`)}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ItsAvatar userCodeOrBusinessBrand={business.businessName} isAvatar={business.isAvatar} alt="workers avatar" />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItem dense secondaryAction={<ListItemText sx={{ ml: 5 }} align="right" primary={business.businessBrand} secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    sx={{ color: 'text.primary', display: 'inline' }}
                                                >
                                                    {business.bio + " — "}
                                                </Typography>
                                                تولید کننده تجهیزات کشاورزی هستم و به انواع ورق و پروفیل آهن نیاز دارم
                                            </React.Fragment>
                                        } />} >

                                        </ListItem>
                                    </ListItemButton>
                                </List>
                            )
                        }) :
                        <Typography>کسب و کاری برای نمایش وجود ندارد </Typography>
                    }
                </Box>
            </Container>
        </>
    )






}
