import React, { useState } from 'react';
import {
    Button,
    Container,
    FormControl,
    IconButton,
    Slide,
    Typography,
    InputLabel,
    MenuItem,
    Select,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BasketSelection from '@/components/modules/BasketSelection';
import SelectCategoryAndGuild from '@/components/modules/SelectCategoryAndGuild';
import CustomSnackbar from '@/components/modules/CustomSnackbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface Business {
    _id: string;
    businessName: string;
}

interface Union {
    _id: string;
}

interface User {
    businesses: Business[];
}

interface JoinAUnionProps {
    union: Union;
    primeBusiness?: Business;
    user: User;
    MembershipOpen: boolean;
    dialogCloseHandler: () => void;
}

const Transition = React.forwardRef(function Transition(props: any, ref: React.Ref<unknown>) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function JoinAUnion({ union, primeBusiness, user, MembershipOpen, dialogCloseHandler }: JoinAUnionProps) {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [selectedBusinessName, setSelectedBusinessName] = useState(primeBusiness?.businessName || '');
    const userBusinesses = user?.businesses?.map(business => business.businessName) || [];
    const selectedBusiness = user?.businesses?.find(business => business.businessName === selectedBusinessName) || {};

    const [offerBasket, setOfferBasket] = useState<any[]>([]);
    const [demandBasket, setDemandBasket] = useState<any[]>([]);
    const [demandGuild, setDemandGuild] = useState<any>(null);

    const joinAUnion = async () => {
        if (!selectedBusiness._id) return;
        try {
            const res = await fetch('api/joinAUnion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    unionID: union._id,
                    businessID: selectedBusiness._id,
                    offerBasket,
                    demandBasket,
                    demandGuildID: demandGuild?._id,
                }),
            });

            if (res.ok) {
                setOfferBasket([]);
                setDemandBasket([]);
                setOpenSnackbar(true);
            } else {
                console.error('Failed to join union');
            }
        } catch (error) {
            console.error('Error joining union:', error);
        }
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <React.Fragment>
            <Dialog
                fullScreen={fullScreen}
                open={MembershipOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={dialogCloseHandler}
            >
                <DialogTitle>عضویت در اتحاد</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={dialogCloseHandler}
                    sx={{ position: 'absolute', left: 8, top: 8, color: 'gray' }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent>
                    <Container className="inMiddle" maxWidth="md" align="center">
                        <FormControl sx={{ width: 300 }}>
                            <InputLabel id="chose-business-label">انتخاب کسب و کار</InputLabel>
                            <Select
                                labelId="chose-business-label"
                                label="انتخاب کسب و کار"
                                value={selectedBusinessName}
                                onChange={(e) => setSelectedBusinessName(e.target.value)}
                            >
                                {userBusinesses.map(name => (
                                    <MenuItem key={name} value={name}>{name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Container>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
} 