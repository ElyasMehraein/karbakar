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
import Divider from '@mui/material/Divider';

export default function ThirdTabOtherUnions({ union }) {
    const router = useRouter()

    return (
        <Accordion disableGutters sx={{ bgcolor: blue[50], my: 1, minWidth: 300, width: "100%" }} >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ alignSelf: 'flex-start' }} />}
                aria-controls="pane-content"
                id="pane-header"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    pl: 1,
                    minHeight: 56,
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",

                    }}
                >
                    <Typography sx={{ fontSize: 12, m: 0, fontWeight: 'bold' }} textAlign={"right"}>
                        {union.unionName}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 11,
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2
                        }}
                        align="justify" dir="rtl" >
                        {union.slogan}
                    </Typography>
                </Box>
            </AccordionSummary>
            < AccordionDetails
                sx={{
                    bgcolor: "white",
                    borderTop: `1px solid ${blue[100]}`,

                }} >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, display: { xs: 'none', sm: 'flex' } }}>
                    <Typography sx={{ flex: 1, textAlign: 'center', fontSize: '12px' }}>اعضای اتحادیه</Typography>
                    <Typography sx={{ flex: 1, textAlign: 'center', fontSize: '12px' }}>پیشنهاد ها</Typography>
                    <Typography sx={{ flex: 1, textAlign: 'center', fontSize: '12px' }}>نیازها</Typography>
                </Box>

                {union.members.map((member) => {
                    return (
                        <Box key={member._id} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                            <ListItemButton onClick={() => router.push(`/${member.member.businessName}`)} sx={{ flex: 1, textAlign: 'center' }} >
                                <ListItemAvatar >
                                    <Avatar sx={{ width: 40, height: 40 }}>
                                        <ItsAvatar isAvatar={member.member.isAvatar} userCodeOrBusinessBrand={member.member.businessName} alt="business avatar" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText align='right' primary={<Typography sx={{ fontSize: '12px' }}>{member.member.businessBrand}</Typography>} secondary={member.member.businessName} />
                            </ListItemButton>
                            <Typography sx={{ flex: 1, textAlign: 'center', fontSize: '12px', display: { xs: 'block', sm: 'none' } }}>پیشنهاد ها</Typography>
                            {member.offerBasket.map((offer) => (
                                <Typography key={offer.product._id} sx={{ flex: 1, textAlign: 'center', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                    {offer.product.productName} - {offer.amount} {offer.product.unitOfMeasurement}
                                </Typography>
                            ))}
                            <Typography sx={{ flex: 1, textAlign: 'center', fontSize: '12px', display: { xs: 'block', sm: 'none' } }}>نیازها</Typography>
                            {member.demandBasket.map((demand) => (
                                <Typography key={demand.product._id} sx={{ flex: 1, textAlign: 'center', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                    {demand.product.productName} - {demand.amount} {demand.product.unitOfMeasurement}
                                </Typography>
                            ))}
                        </Box>

                    )
                })}
            </AccordionDetails>
            <AccordionActions>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <Typography sx={{ mr: 1, fontSize: '12px' }}>{`مدت اتحاد: ${union.deadline} روز`}</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => { }}
                    >
                        عضویت
                    </Button>
                </Box>
            </AccordionActions>

        </Accordion>
    )
};

