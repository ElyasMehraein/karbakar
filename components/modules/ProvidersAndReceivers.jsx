"use client"
import React, { useState } from 'react'
import { Avatar, AvatarGroup, Box, Container, Typography } from '@mui/material'
import ItsAvatar from './ItsAvatar'
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from '@mui/material/ListItemButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { blue } from '@mui/material/colors';
import { useRouter } from "next/navigation";

export default function ProvidersAndReceivers({ filteredRelations, title }) {
    const router = useRouter();
    const [topAvatarsVisible, setTopAvatarsVisible] = useState(true);

    if (!filteredRelations.length) {
        return (
            <Container
                sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: 'center' }}
            >
                این کسب و کار فاقد {title} می باشد
            </Container>
        );
    }

    return (
        <Container
            sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: 'center' }}
        >
            <Accordion sx={{ width: "100%", bgcolor: blue[50], my: 1 }} onChange={() => setTopAvatarsVisible(prev => !prev)}>
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
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                flexDirection: "column",
                                mr: 2
                            }}
                        >
                            <Typography sx={{ fontSize: 12, m: 0, fontWeight: 'bold' }} textAlign={"right"}>
                                {title}
                            </Typography>
                        </Box>
                        {topAvatarsVisible && (
                            <AvatarGroup dir="ltr" max={4}>
                                {filteredRelations.map(relation => (
                                    <ItsAvatar
                                        key={relation._id}
                                        userCodeOrBusinessBrand={title === "تامین کنندگان" ? relation.provider.businessName : relation.receiver.businessName}
                                        isAvatar={title === "تامین کنندگان" ? relation.provider.isAvatar : relation.receiver.isAvatar}
                                        alt="businessBrand"
                                    />
                                ))}
                            </AvatarGroup>
                        )}
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    {filteredRelations.map(relation => (
                        <Box key={relation._id}>
                            <ListItemButton
                                onClick={() => router.push(`/${title === "تامین کنندگان" ? relation.provider.businessName : relation.receiver.businessName}`)}
                            >
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                        <Box sx={{ ml: 2, width: 40, height: 40 }}>
                                            <ItsAvatar
                                                userCodeOrBusinessBrand={title === "تامین کنندگان" ? relation.provider.businessName : relation.receiver.businessName}
                                                isAvatar={title === "تامین کنندگان" ? relation.provider.isAvatar : relation.receiver.isAvatar}
                                                alt="businessBrand"
                                            />
                                        </Box>
                                        <ListItemAvatar>
                                            <ListItemText
                                                align='right'
                                                primary={title === "تامین کنندگان" ? relation.provider.businessName : relation.receiver.businessName}
                                                secondary={title === "تامین کنندگان" ? relation.provider.businessBrand : relation.receiver.businessBrand}
                                            />
                                        </ListItemAvatar>
                                    </Box>
                                    <Typography align='right' variant="caption" sx={{ color: 'text.secondary' }}>
                                        {title === "تامین کنندگان" ? relation.provider.bio : relation.receiver.bio}
                                    </Typography>
                                </Box>
                            </ListItemButton>
                        </Box>
                    ))}
                </AccordionDetails>
            </Accordion>
        </Container>
    );
}
