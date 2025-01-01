import React, { useState } from 'react'
import Typography from "@mui/material/Typography";
import {
    Button,
    Container,
    FormControl,
    IconButton,
    Slide,
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import BasketSelection from '@/components/modules/BasketSelection';
import {
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SelectCategoryAndGuild from '@/components/modules/SelectCategoryAndGuild';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function joinAUnion({ union, primeBusiness, user, open, dialogCloseHandler }) {

    const [selectedBusinessName, setSelectedBusinessName] = useState(primeBusiness.businessName);
    const userBusinesses = user.businesses.map((business) => business.businessName);
    const selectedBusiness = user.businesses.find((business) => {
        if (business.businessName === selectedBusinessName) {
            return business;
        }
    });
    // سبدهای عرضه و تقاضا
    const [offerBasket, setOfferBasket] = useState([]);
    const [demandBasket, setDemandBasket] = useState([]);
   

    const addOfferBasket = (value) => {
        setOfferBasket(value);
    };
    const addDemandBasket = (value) => {
        setDemandBasket(value);
    };

    // دسته، صنف و ...
    const [demandGuild, setDemandGuild] = useState(null);

    const getDataFromChild = (guild) => {
        setDemandGuild(guild);
    };

    // عضویت در اتحاد
    async function joinAUnion() {
        const res = await fetch('api/joinAUnion', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                unionID: union._id,
                businessID: selectedBusiness._id,
                offerBasket,
                demandBasket,
                demandGuildID: demandGuild?._id,
            })
        });
        if (res.status === 500) {
            console.log("server error");
        } else if (res.status === 409) {
            // ...
        } else if (res.status === 201) {
            console.log("joined union successfully", res);
            // ریست مقادیر
            setOfferBasket([]);
            setDemandBasket([]);
        }
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => dialogCloseHandler()}
        >
            <DialogTitle>عضویت در اتحاد</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => dialogCloseHandler()}
                sx={(theme) => ({
                    position: 'absolute',
                    left: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon />
            </IconButton>

            <DialogContent>
                <Container maxWidth="md" className="inMiddle" align="center">
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
                            {userBusinesses.map((userBusinessesName) => (
                                <MenuItem key={userBusinessesName} value={userBusinessesName}>
                                    {userBusinessesName}
                                </MenuItem>
                            ))}
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
                {/* <Button sx={{ m: 2 }} color="info" variant="contained" onClick={handleClose}>
                    بازگشت
                </Button> */}
                <Button
                    children={"عضویت در اتحاد"}
                    variant="contained"
                    disabled={!(offerBasket.length && demandBasket.length)}
                    onClick={() => joinAUnion()}
                />
            </DialogActions>
        </Dialog>
    )
}
