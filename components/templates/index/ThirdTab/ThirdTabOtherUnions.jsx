import * as React from 'react';
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import { Button, Container, FormControl } from "@mui/material";
import ItsAvatar from "@/components/modules/ItsAvatar";
import ListItemButton from '@mui/material/ListItemButton';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { blue } from '@mui/material/colors';
import { useRouter } from "next/navigation";
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import BasketSelection from '@/components/modules/BasketSelection';
import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import SelectCategoryAndGuild from '@/components/modules/SelectCategoryAndGuild';

//dialog
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ThirdTabOtherUnions({ union, primeBusiness, user }) {
    //dialog
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    // selecting your business
    const [selectedBusinessName, setSelectedBusinessName] = React.useState(primeBusiness.businessName)
    const userBusinesses = user.businesses.map(business => business.businessName)
    const selectedBusiness = user.businesses.find((business) => {
        if (business.businessName == selectedBusinessName) {
            return business
        }
    })

    const addBusinessID = () => {
        // alaki
    }
    // entering union name
    const [unionName, setUnionName] = React.useState("")

    // entering description
    const [descriptionText, setDescriptionText] = useState([])

    // entering union duration
    const [unionDuration, setUnionDuration] = useState([])

    //the basket you offer

    const [offerBasket, setOfferBasket] = useState([])

    const addOfferBasket = (value, isBasketChanged) => {
        setOfferBasket(value)
        // setIsBasketChanged(isBasketChanged)
    }


    //the basket you demand
    const [demandGuild, setDemandGuild] = useState(null)
    console.log("demandGuild", demandGuild);
    const [demandGuildName, setDemandGuildName] = useState(null)
    const [demandJobCategory, setDemandJobCategory] = useState(null)

    const getDataFromChild = (guild, guildName, jobCategory) => {
        setDemandGuild(guild)
        setDemandGuildName(guildName)
        setDemandJobCategory(jobCategory)
    }

    const [demandBasket, setDemandBasket] = useState([])

    const addDemandBasket = (value, isBasketChanged) => {
        setDemandBasket(value)
        // setIsBasketChanged(isBasketChanged)
    }
    // join Union funtion
    async function createUnion() {
        const res = await fetch('api/createUnion', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                unionID: union._id, // به کدام اتحاد میخوای جوین بشی
                businessID: selectedBusiness._id,// با کدوم کسب و کار
                offerBasket,
                demandBasket,
                guildID: demandGuild._id,
                guildName: demandGuildName,
                jobCategory: demandJobCategory
            })
        })
        if (res.status === 500) {
            console.log("server error");
        } else if (res.status === 409) {
            setOpen409Snackbar(true)
        } else if (res.status === 201) {
            console.log("union created successfully", res);
            setUnionName("")
            setDescriptionText("")
            setUnionDuration("")
            setOfferBasket([])
            setDemandBasket([])
            setOpenSnackbar(true)
        }
    }


    const router = useRouter()
    return (
        <React.Fragment>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>عضویت در اتحاد</DialogTitle>
                <DialogContent>
                    <Container maxWidth="md" className="inMiddle" align='center'>
                        <FormControl sx={{ my: 2, width: 300, align: "center" }}>
                            <InputLabel id="chose-business-lable">انتخاب کسب و کار</InputLabel>
                            <Select
                                labelId="chose-business-lable"
                                id="chose-business"
                                value={selectedBusinessName}
                                label="انتخاب کسب و کار"
                                onChange={(e) => {
                                    setSelectedBusinessName(e.target.value);
                                }}
                            >
                                {userBusinesses.map((userBusinessesName) => {
                                    return <MenuItem key={userBusinessesName} value={userBusinessesName}>{userBusinessesName}</MenuItem>
                                })}
                            </Select>

                        </FormControl>
                        <Typography sx={{ my: 2, textAlign: "center", fontSize: 14 }}>
                            سبد محصولاتی که می خواهید عرضه کنید
                        </Typography>
                        <BasketSelection
                            parentBasketFunction={addOfferBasket}
                            business={selectedBusiness}
                        />
                        <Typography sx={{ my: 2, textAlign: "center", fontSize: 14 }}>
                            سبد محصولاتی که می خواهید دریافت کنید
                        </Typography>
                        <SelectCategoryAndGuild sendDataToParent={getDataFromChild} />
                        <BasketSelection
                            parentBasketFunction={addDemandBasket}
                            guild={demandGuild}
                        />


                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>لغو</Button>
                    <Button
                        sx={{ mb: 10 }}
                        children={"ایجاد اتحاد"}
                        variant="contained"
                        fullWidth
                        disabled={!(unionName && descriptionText && unionDuration && offerBasket.length && demandBasket.length)}
                        onClick={() => createUnion()}
                    />
                </DialogActions>
            </Dialog>
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
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            عضویت
                        </Button>
                    </Box>
                </AccordionActions>

            </Accordion>
        </React.Fragment >
    )
};

