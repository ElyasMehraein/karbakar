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

    const businesses = relations.filter((relation) => {
        if (relation.provider.monthlyCommitment[0]) {
            return relation.provider;
        }
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
                {businesses[0] ?
                    businesses.map((business) => {
                        return (
                            <List key={business._id} sx={{ width: '100%', maxWidth: 700, bgcolor: color, borderRadius: 2, m: 1, p: 2 }}>
                                <ListItemButton onClick={() => router.push(`/${business.provider.businessName}`)}>
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                                            <Avatar sx={{ ml: 2, width: 40, height: 40 }}>
                                                <ItsAvatar userCodeOrBusinessBrand={business.provider.businessName} isAvatar={business.provider.isAvatar} alt="workers avatar" />
                                            </Avatar>
                                            <ListItemAvatar >
                                                <ListItemText align='right' primary={business.provider.businessBrand} secondary={business.provider.businessName} />
                                            </ListItemAvatar>
                                        </Box>
                                        <Typography align='right' variant="caption" sx={{ color: 'text.secondary' }}>{business.provider.bio}</Typography>

                                        {business.provider.monthlyCommitment.map((product) => {
                                            return (
                                                <Box key={product._id}>
                                                    <Typography fontSize={12} align='right'>{product.product.productName}</Typography>
                                                    <ListItem dense disablePadding >
                                                        <Box sx={{ width: '90%' }}>
                                                            <LinearProgress
                                                                variant="determinate"
                                                                value={product.delivered / product.amount * 100}
                                                            />
                                                        </Box>
                                                        <Box sx={{ minWidth: 35 }}>
                                                            <Typography variant="body2" sx={{ m: 1, color: 'text.secondary' }}>
                                                                {product.delivered + "/" + product.amount}
                                                            </Typography>
                                                        </Box>
                                                    </ListItem>
                                                </Box>
                                            )
                                        })}
                                    </Box>
                                </ListItemButton>
                            </List>
                        )
                    }) :
                    <Typography>هیچ کسب و کاری به ارائه محصول به شما متعهد نشده است شما می توانید از منوی سمت راست جهت یافتن نزدیک ترین کسب و کارها اقدام نمایید</Typography>
                }
            </Box>
        </Container>

    )
}
