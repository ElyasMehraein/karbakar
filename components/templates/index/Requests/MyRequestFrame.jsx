import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Image from 'next/image'
import { CardActionArea, Container } from "@mui/material";
import ItsAvatar from "@/components/modules/ItsAvatar";
import businessAvatar from "@/public/assets/businessAvatar.jpg";
import ListItemButton from '@mui/material/ListItemButton';
import SelectProvider from "./SelectProvider";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { blue } from '@mui/material/colors';


const MyRequestFrame = ({ request }) => {
    console.log("request", request);
    const acceptedByOrneedMoreInfo = request.needMoreInfo ? request.needMoreInfo : request.acceptedBy
    return (
        // <Container maxWidth="md">
        <Accordion sx={{ bgcolor: blue[50], my: 1 }} >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="pane-content"
                id="pane-header"
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
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
                            {request.title}
                        </Typography>
                    </Box>
                    <AvatarGroup dir="ltr" max={4}>
                        {request.acceptedBy?.map((acceptor) => {
                            return (
                                <Avatar key={acceptor}>
                                    <ItsAvatar isAvatar={acceptor.isAvatar} userCodeOrBusinessBrand={acceptor.businessName} alt=" avatar" />
                                </Avatar>
                            )
                        })}
                        {request.needMoreInfo?.map((infoSeeker) => {
                            return (
                                <Avatar key={infoSeeker}>
                                    <ItsAvatar isAvatar={infoSeeker.isAvatar} userCodeOrBusinessBrand={infoSeeker.businessName} alt=" avatar" />
                                </Avatar>
                            )
                        })}
                    </AvatarGroup>
                </Box>
                <Typography
                    paragraph
                    // noWrap
                    sx={{
                        mr: 2, fontSize: 11,
                        //later i deside if i need to use the below code
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2
                    }}
                    align="justify" dir="rtl" >
                    {request.message}
                </Typography>
            </AccordionSummary>
            {
                < AccordionDetails >
                    {request.needMoreInfo?.map((infoSeeker) => {
                        return (
                            <>
                                <ListItemButton key={infoSeeker} onClick={() => router.push(`/${request.requesterBusiness.businessName}`)}>
                                    <ListItemAvatar >
                                        <Avatar sx={{ width: 40, height: 40 }}>
                                            <ItsAvatar isAvatar={infoSeeker.isAvatar} userCodeOrBusinessBrand={infoSeeker.businessName} alt="workers avatar" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText align='right' primary={request.requesterBusiness.businessName} secondary={request.requesterBusiness.businessBrand} />
                                </ListItemButton>
                                <Typography sx={{ color: 'text.secondary' }}>{request.requesterBusiness.bio}</Typography>
                            </>
                        )
                    })}
                </AccordionDetails>
            }
        </Accordion>
        // </Container >
    );
};
export default MyRequestFrame;
