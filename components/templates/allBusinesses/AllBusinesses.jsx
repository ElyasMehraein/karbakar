"use client"
import { Avatar, Box, Button, Container, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material'
import MyAppBar from '@/components/modules/MyAppBar'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Guild from "@/components/modules/Guild"
import { AllBusinessesText, selectGuild } from '@/components/typoRepo';
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import { Accordion, AccordionDetails, Chip } from "@mui/material";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';

import ItsAvatar from '@/components/modules/ItsAvatar'
import dynamic from 'next/dynamic'
const ShowMyLocation = dynamic(() => import('@/components/modules/ShowMyLocation'), { ssr: false })


export default function AllBusinesses({ businesses }) {
    const router = useRouter()

    const [expanded, setExpanded] = useState(false);

    return (

        <>
            <MyAppBar business={null} logedUserCode={null} whichUserProfile={null} />
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
                            <AllBusinessesText />
                        </AccordionDetails>
                    </Accordion>
                    {businesses.map((business) => {
                        return (
                            <List key={business._id} sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
                                <ListItem>
                                    <ListItemButton onClick={() => router.push(`/${business.businessName}`)}>
                                        <ListItemAvatar>
                                                <ItsAvatar userCodeOrBusinessBrand={business.businessName} isAvatar={business.isAvatar} alt="workers avatar" />
                                        </ListItemAvatar>
                                        <ListItemText align='right' primary={business.businessBrand} secondary={business.bio} />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        )
                    })}
                </Box>
            </Container>
        </>
    )

}
