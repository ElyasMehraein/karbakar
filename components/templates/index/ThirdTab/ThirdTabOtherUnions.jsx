import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import ItsAvatar from "@/components/modules/ItsAvatar";
import ListItemButton from '@mui/material/ListItemButton';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { blue } from '@mui/material/colors';
import { useRouter } from "next/navigation";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";

export default function ThirdTabOtherUnions({ union }) {
    return (
        <Accordion sx={{ bgcolor: blue[50], my: 1 }} >
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
                            {union.unionName}
                        </Typography>
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
                            ده دستگاه خودرو ده دستگاه موتورسیکت مقدار محصول ماهانه ای که متعهد شدم
                        </Typography>
                    </Box>
                    <AvatarGroup dir="ltr" max={4}>
                        <Avatar>
                            <ItsAvatar isAvatar={true} userCodeOrBusinessBrand={"1000"} alt=" avatar" />
                        </Avatar>
                        <Avatar>
                            <ItsAvatar isAvatar={false} userCodeOrBusinessBrand={"1001"} alt=" avatar" />
                        </Avatar>
                        <Avatar>
                            <ItsAvatar isAvatar={false} userCodeOrBusinessBrand={"1001"} alt=" avatar" />
                        </Avatar>
                        <Avatar>
                            <ItsAvatar isAvatar={false} userCodeOrBusinessBrand={"1001"} alt=" avatar" />
                        </Avatar>
                        <Avatar>
                            <ItsAvatar isAvatar={false} userCodeOrBusinessBrand={"1001"} alt=" avatar" />
                        </Avatar>
                    </AvatarGroup>
                </Box>
            </AccordionSummary>
            {
                < AccordionDetails >
                    <Box >
                        <ListItemButton >
                            <ListItemAvatar >
                                <Avatar sx={{ width: 40, height: 40 }}>
                                    <ItsAvatar isAvatar={false} userCodeOrBusinessBrand={"1000"} alt="workers avatar" />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText align='right' primary={"کسب و کار فلان"} secondary={"businessBrand"} />
                            <Typography sx={{ pr: 5, color: 'text.secondary' }}>{"bio"}</Typography>
                        </ListItemButton>
                    </Box>

                </AccordionDetails>
            }
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end"
                }}
            >
                <AccordionActions>
                    <Button
                        variant="outlined" color="error"
                        endIcon={<DeleteIcon sx={{ ml: -2, mr: 1 }} />}
                        onClick={() => DeleteRequest(request._id)}
                    >
                        حذف درخواست
                    </Button>
                </AccordionActions>
            </Box>
        </Accordion>
    )
};

