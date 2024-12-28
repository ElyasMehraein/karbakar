import * as React from 'react';
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

// Transition برای دیالوگ
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function ThirdTabOtherUnions({ union, primeBusiness, user }) {
    const router = useRouter();

    // اگر دوست دارید breakpoint دیگری مدنظرتان است، تغییر دهید

 
    // States و منطق دیالوگ عضویت
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    // انتخاب کسب‌وکار کاربر
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
    const [demandGuildName, setDemandGuildName] = useState(null);
    const [demandJobCategory, setDemandJobCategory] = useState(null);

    const getDataFromChild = (guild, guildName, jobCategory) => {
        setDemandGuild(guild);
        setDemandGuildName(guildName);
        setDemandJobCategory(jobCategory);
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
                guildID: demandGuild?._id,
                guildName: demandGuildName,
                jobCategory: demandJobCategory
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

    // مرتب کردن اعضا




    return (
        <React.Fragment>
            {/* دیالوگ عضویت در اتحاد */}
          
        </React.Fragment>
    );
}
