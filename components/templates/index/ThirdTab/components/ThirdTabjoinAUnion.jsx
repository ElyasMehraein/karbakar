import React from 'react'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {
    Button,
    Container,
    Divider,
    FormControl,
    Paper,
    useMediaQuery,
} from "@mui/material";
import ItsAvatar from "@/components/modules/ItsAvatar";
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
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import BasketSelection from '@/components/modules/BasketSelection';
import SelectOrCreateCategoryAndGuild from '@/components/modules/SelectOrCreateCategoryAndGuild';
import {
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
} from '@mui/material';

export default function ThirdTabjoinAUnion() {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle>عضویت در اتحاد</DialogTitle>
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
                    <SelectOrCreateCategoryAndGuild sendDataToParent={getDataFromChild} />
                    <BasketSelection
                        parentBasketFunction={addDemandBasket}
                        guild={demandGuild}
                    />
                </Container>
            </DialogContent>
            <DialogActions>
                <Button sx={{ m: 2 }} color="info" variant="contained" onClick={handleClose}>
                    بازگشت
                </Button>
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
