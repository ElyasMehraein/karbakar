"use client"
import React, { useState } from 'react'
import { Avatar, AvatarGroup, Box, Button, Container, Typography } from '@mui/material'
import ItsAvatar from './ItsAvatar'
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from '@mui/material/ListItemButton';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { blue } from '@mui/material/colors';
import { useRouter } from "next/navigation";
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProvidersAndReceivers({ filteredRelations, title }) {
    const router = useRouter()

    if (!filteredRelations[0]) {

        return (
            <Container
                sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: 'center' }}
            >
            این کسب و کار فاقد {title} می باشد
            </Container>
        )
    }

    const [topAvatarsVisible, setTopAvatarsVisible] = useState(true)

    return (
        <Container
            sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: 'center' }}
        >
            <Accordion sx={{ width: "100%", bgcolor: blue[50], my: 1 }} onChange={() => setTopAvatarsVisible(!topAvatarsVisible)}>
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
                        {topAvatarsVisible &&
                            <AvatarGroup dir="ltr" max={4}>
                                {filteredRelations.map(relation => {
                                    return (
                                        <Avatar key={relation._id}>
                                            <ItsAvatar userCodeOrBusinessBrand={relation.provider.businessName} isAvatar={relation.provider.isAvatar} alt="businessBrand" />
                                        </Avatar>
                                    )
                                })}
                            </AvatarGroup>
                        }
                    </Box>
                </AccordionSummary>
                {
                    < AccordionDetails >
                        {filteredRelations?.map((relation) => (
                            <Box key={relation._id}>
                                <ListItemButton
                                    onClick={() => router.push(`/${relation.provider.businessName}`)}
                                >
                                    <Box sx={{ display: "flex", flexDirection: "column" }}
                                    >
                                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                                            <Avatar sx={{ ml: 2, width: 40, height: 40 }}>
                                                <ItsAvatar isAvatar={relation.provider.isAvatar} userCodeOrBusinessBrand={relation.provider.businessName} alt="workers avatar" />
                                            </Avatar>
                                            <ListItemAvatar >
                                                <ListItemText align='right' primary={relation.provider.businessName} secondary={relation.provider.businessBrand} />
                                            </ListItemAvatar>
                                        </Box>
                                        <Typography align='right' variant="caption" sx={{ color: 'text.secondary' }}>{relation.provider.bio}</Typography>
                                    </Box>
                                </ListItemButton>
                            </Box>
                        ))}

                    </AccordionDetails>
                }
            </Accordion>
        </Container>
    )
}
