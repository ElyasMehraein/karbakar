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

import { blue } from '@mui/material/colors';

const color = blue[50];

export default function FirstTab({ user, relations }) {

    const router = useRouter()
    const [expanded, setExpanded] = React.useState(false);

    const businesses = relations.map((relation) => {
        return relation.provider;
    })

    return (
        <Container maxWidth="md">
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
                {businesses ?
                    businesses.map((business) => {
                        return (
                            <List key={business._id} sx={{ width: '100%', maxWidth: 700, bgcolor: color, borderRadius: 2, m: 1, p: 2 }}>
                                <ListItemButton onClick={() => router.push(`/${business.businessName}`)}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ItsAvatar userCodeOrBusinessBrand={business.businessName} isAvatar={business.isAvatar} alt="workers avatar" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItem dense secondaryAction={<ListItemText sx={{ ml: 5 }} align="right" primary={business.businessBrand} secondary={business.bio} />} >
                                    </ListItem>
                                </ListItemButton>
                                <Typography>کلید پریز</Typography>
                                <ListItem>
                                    <Box sx={{ width: '90%' }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={12}
                                        />
                                    </Box>
                                    <Box sx={{ minWidth: 35 }}>
                                        <Typography variant="body2" sx={{ m: 1, color: 'text.secondary' }}>
                                            {1 + "/" + 7}
                                        </Typography>
                                    </Box>
                                </ListItem>
                                <Typography> پوستر رنگ آمیزی</Typography>
                                <ListItem>
                                    <Box sx={{ ml: 1, width: '90%' }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={40}
                                        />
                                    </Box>
                                    <Box sx={{ minWidth: 35 }}>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {14 + "/" + 27}
                                        </Typography>
                                    </Box>
                                </ListItem>
                            </List>
                        )
                    }) :
                    <Typography>کسب و کاری برای نمایش وجود ندارد </Typography>
                }
            </Box>
        </Container>

    )
}
