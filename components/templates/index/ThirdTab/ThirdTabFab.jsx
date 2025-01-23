import React from 'react'
import { useState } from 'react'
import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import BasketSelection from '@/components/modules/BasketSelection';
import SelectCategoryAndGuild from '@/components/modules/SelectCategoryAndGuild';

export default function ThirdTabFab({ user, primeBusiness }) {
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [open409Snackbar, setOpen409Snackbar] = React.useState(false);


    // selecting your business
    const [selectedBusinessName, setSelectedBusinessName] = React.useState(primeBusiness.businessName)
    const userBusinesses = user.businesses.map(business => business.businessName)
    const selectedBusiness = user.businesses.find((business) => {
        if (business.businessName == selectedBusinessName) {
            return business
        }
    })

    // entering union name
    const [unionName, setUnionName] = React.useState("")

    // entering description
    const [descriptionText, setDescriptionText] = useState([])

    // entering union duration
    const [unionDuration, setUnionDuration] = useState([])

    //the basket you offer

    const [offerBasket, setOfferBasket] = useState([])

    const addOfferBasket = (value) => {
        setOfferBasket(value)
    }


    //the basket you demand
    const [demandGuild, setDemandGuild] = useState(null)

    const getDataFromChild = (guild) => {
        setDemandGuild(guild)
    }

    const [demandBasket, setDemandBasket] = useState([])

    const addDemandBasket = (value) => {
        setDemandBasket(value)
    }

    // create Union Button

    async function createUnion() {
        const res = await fetch('api/createUnion', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                unionName,
                slogan: descriptionText,
                deadline: unionDuration,
                offerBasket,
                demandBasket,
                businessID: selectedBusiness._id,
                guildID: demandGuild._id,
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

    return (
        <Container maxWidth="md" className="inMiddle" display="flex" align='center'>
            <Typography sx={{ my: 2, textAlign: "center", fontSize: 14 }}>
                برای ساخت اتحاد ابتدا کسب و کار خود را انتخاب می کنید
            </Typography>
            <FormControl sx={{ my: 2, width: 300 }}>
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
            <TextField
                value={unionName}
                placeholder='حداکثر 40 کارکتر' variant="outlined"
                label="برای اتحاد خود یک عنوان انتخاب کنید"
                onChange={(e) => setUnionName(e.target.value)}
                sx={{ width: 300 }}
            />
            <TextField
                id="descriptionText"
                label="توضیحات لازم"
                multiline
                value={descriptionText}
                rows={4}
                placeholder="مثلا:این اتحاد جهت مبادلات بین کارگاههای تولیدی شهرک صنعتی شیراز ایجاد شده است"
                size="small"
                onChange={(e) => {
                    const newValue = e.target.value.slice(0, 150);
                    setDescriptionText(newValue);
                }}
                sx={{ my: 2, minWidth: 300 }}
                helperText={`${descriptionText.length}/150`}
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

            <BasketSelection
                parentBasketFunction={addOfferBasket}
                business={selectedBusiness}

            />
            <Typography sx={{ my: 2, textAlign: "center", fontSize: 14 }}>
                سبد محصولاتی که می خواهید دریافت کنید
            </Typography>
            <SelectCategoryAndGuild sendDataToParent={getDataFromChild} />
            {demandGuild &&
                <BasketSelection
                    parentBasketFunction={addDemandBasket}
                    guild={demandGuild}
                />
            }
            <Button
                sx={{ mb: 10 }}
                variant="contained"
                fullWidth
                disabled={!(unionName && descriptionText && unionDuration && offerBasket.length && demandBasket.length && demandGuild)}
                onClick={() => createUnion()}
            >
                ایجاد اتحاد
            </Button>
            <CustomSnackbar
                open={openSnackbar}
                onClose={() => location.reload()}
                message="اتحاد ایجاد شد"
            />
            <CustomSnackbar
                open={open409Snackbar}
                onClose={() => setOpen409Snackbar(false)}
                message="هر کسب و کار در هر ماه تنها می توان 5 اتحاد تشکیل دهد"
                severity="error"
            />
        </Container>
    )
}








