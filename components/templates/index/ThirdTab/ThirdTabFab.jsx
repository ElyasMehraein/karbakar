import React from 'react'
import { IconButton, List, ListItem, ListItemText, } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ProductBasket from '@/components/modules/ProductBasket';
import { useEffect, useState } from 'react'
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { Autocomplete, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import jobCategoriesData from "@/public/jobCategories";
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import { CircularProgress } from '@mui/material';

export default function ThirdTabFab({ user, primeBusiness }) {


    ////////////////////////////////////////////////////////////////////////
    // تمام کسب و کارها می توانند در این قسمت اتحاد بسازند
    //برای ساخت اتحاد ابتدا کسب و کار خود را انتخاب می کنید
    //یک نام برای اتحاد انتخاب می کنید
    //یک توضیحات برای اتحاد وارد می کنید
    //مدت اتحاد را تعیین می کنید
    //محصولاتی که میخواهید ارائه دهید را بهمراه مقدار مشخص می کنید و سبر ارائه را تشکیل می دهید
    //صنفی که میخواهید از آن محصول بگیرید را پیدا و انتخاب می کنید
    //سبد محصولاتی که می خواهید را مشخص می کنید
    //اتحاد را ثبت می کنید

    // selecting your business

    const [selectedBusinessName, setSelectedBusinessName] = React.useState(primeBusiness.businessName)
    const userBusinesses = user.businesses.map(business => business.businessName)

    // entering union name

    const [selectedUnionName, setSelectedUnionName] = React.useState("")

    // entering description
    const [descriptionText, setDescriptionText] = useState([])

    // entering union duration

    const [unionDuration, setUnionDuration] = useState([])

    //the basket you providing


    const [offerbasket, setOfferBasket] = useState([])
    const addOfferBasket = (value, isBasketChanged) => {
        setOfferBasket(value)
        // setIsBasketChanged(isBasketChanged)
    }
    const [businessID, setBusinessID] = React.useState()
    const addBusinessID = (value) => {
        setBusinessID(value)
    }
    //the basket you providing


    const [demandbasket, setDemandBasket] = useState([])
    const addDemandBasket = (value, isBasketChanged) => {
        setDemandBasket(value)
        // setIsBasketChanged(isBasketChanged)
    }

    // create Union Button




    const [unitOfMeasurement, setUnitOfMeasurement] = React.useState("")
    const [amount, setAmount] = React.useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [open406Snackbar, setOpen406Snackbar] = useState(false);
    const [open422Snackbar, setOpen422Snackbar] = useState(false);

    const selectedBusiness = user.businesses.find((business) => {
        if (business.businessName == selectedBusinessName) {
            return business
        }
    })


    const [jobCategory, setJobCategory] = useState("")
    let changeHandler = (e, value) => setJobCategory(value?.label)


    const [guilds, setGuilds] = useState([])

    const [selectedGuild, setsSelectedGuild] = useState("")

    const [requestText, setrequestText] = useState([])
    const [chips, setChips] = useState([])
    const [chipsObjectTrigger, setChipsObjectTrigger] = useState(false)

    useEffect(() => {
        const getGuilds = async () => {
            try {
                const res = await fetch("/api/getGuilds", { method: "GET" });
                if (res.status === 200) {
                    const data = await res.json();
                    let recivedGuilds = data.data
                        .filter(guild => guild.jobCategory === jobCategory)
                        .map(guild => guild.guildName);
                    setGuilds(recivedGuilds.length ? recivedGuilds : []);

                    const demandsGuilds = selectedBusiness.demandsForGuilds.map(demandGuild => {
                        const guild = data.data.find(guild => guild._id === demandGuild.guild);
                        return guild ? guild : null;
                    }).filter(guild => guild);

                    const uniqueChips = new Set([...chips, ...demandsGuilds]);
                    setChips(Array.from(uniqueChips));
                    setIsLoading(false)

                } else if (res.status === 403) {
                    console.log("unauthorized access");
                }
            } catch (error) {
                console.error("Error fetching Guilds:", error);
            }
        };
        getGuilds();
    }, [jobCategory]);


    const formattedOptions = Object.entries(jobCategoriesData).flatMap(([group, categories]) =>
        categories.map(category => ({ label: category, group }))
    );
    const isOptionEqualToValue = (option, value) => {
        return option.label === value.label;
    };


    async function setDemandsForGuilds() {

        const res = await fetch('api/setDemandsForGuilds', {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ businessID: selectedBusiness._id, selectedGuild, requestText, jobCategory })
        })
        if (res.status === 500) {
            console.log("server error");
        }
        if (res.status === 422) {
            setOpen422Snackbar(true)
        }
        if (res.status === 406) {
            setOpen406Snackbar(true)
            setsSelectedGuild("")
        } else if (res.status === 201) {
            const { data } = await res.json();
            console.log("Demand For the Guild sited successfully", res);
            setChips([...chips, { _id: data, guildName: selectedGuild }]);
            setsSelectedGuild("")
            setrequestText("")
        }
    }

    async function deleteDemandsForGuild(demandID) {

        const res = await fetch('api/deleteDemandsForGuild', {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ businessID: selectedBusiness._id, demandID })
        })
        if (res.status === 500) {
            console.log("server error");
        } else if (res.status === 200) {
            setChipsObjectTrigger(!chipsObjectTrigger)
            setChips((prevChips) => prevChips.filter((chip) => chip._id !== demandID));
            console.log("Demand For the Guild deleted successfully");
            setsSelectedGuild("")
            setrequestText("")
        }
    }

    return (
        <Container maxWidth="md" className="inMiddle" display="flex" align='center'>
            <Typography sx={{ my: 2, textAlign: "center", fontSize: 14 }}>
                برای ساخت اتحاد ابتدا کسب و کار خود را انتخاب می کنید
            </Typography>
            <TextField
                value={selectedUnionName}
                placeholder='حداکثر 40 کارکتر' variant="outlined"
                label="برای اتحاد خود یک عنوان انتخاب کنید"
                onChange={(e) => setSelectedUnionName(e.target.value)}
                sx={{ width: 300 }}
            />
            <TextField
                id="descriptionText"
                label="توضیحات لازم"
                multiline
                value={descriptionText}
                rows={4}
                placeholder="مثلا:این اتحاد جهت مبادلات بین کارگاههای تولیدی شهرک صنعتی شیراز ایجاد شده است "
                // fullWidth
                size="small"
                onChange={(e) => setDescriptionText(e.target.value)}
                sx={{ my: 2, minWidth: 300 }}
            />
            <TextField
                value={unionDuration}
                placeholder='حداکثر 365 روز' variant="outlined"
                label="مدت اعتبار اتحاد"
                onChange={(e) => setUnionDuration(e.target.value)}
                sx={{ width: 300 }}
            />
            <Typography sx={{ my: 2, textAlign: "center", fontSize: 14 }}>
                سبد محصولاتی که می خواهید عرضه کنید
            </Typography>
            <ProductBasket
                {...{ user, primeBusiness }}
                useFor="Offer"
                parentBasketFunction={addOfferBasket}
                parentSetBusinessID={addBusinessID}
            />
            <Typography sx={{ my: 2, textAlign: "center", fontSize: 14 }}>
                سبد محصولاتی که می خواهید دریافت کنید
            </Typography>
            <ProductBasket
                {...{ user, primeBusiness }}
                useFor="Demand"
                parentBasketFunction={addDemandBasket}
                parentSetBusinessID={addBusinessID}
            />
            <Button
                sx={{ mb: 10 }}
                children={"ایجاد اتحاد"}
                variant="contained"
                fullWidth
                disabled={selectedUnionName && unitOfMeasurement && amount ? false : true}
            // onClick={addToGiveaway}
            />
        </Container>
    )
}








