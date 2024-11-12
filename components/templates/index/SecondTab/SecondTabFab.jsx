import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, CircularProgress, Container, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Typography, createFilterOptions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Groups2Icon from '@mui/icons-material/Groups2';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import CustomSnackbar from "@/components/modules/CustomSnackbar";


export default function SecondTabFab({ user, primeBusiness }) {
    const [isLoading, setIsLoading] = React.useState(false);

    //first autoCompelete
    const [selectedBusinessName, setSelectedBusinessName] = React.useState(primeBusiness.businessName)
    const userBusinesses = user.businesses.map(business => {
        if (business.agentCode == user.code) {
            return business
        }
    })

    const userBusinessesNames = userBusinesses.map(business => business.businessName)
    const [inputValue, setInputValue] = React.useState("");

    //second autoCompelete
    const [BusinessProducts, setBusinessProducts] = React.useState([]);

    let selectedBusiness = userBusinesses.find(business => business.businessName == selectedBusinessName)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`/api/getBusinessProduct?businessId=${selectedBusiness._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                const BusinessProducts = data.data.map((product) => product.product.productName)
                setBusinessProducts(BusinessProducts);
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchProducts();
    }, [selectedBusiness]);

    const [selectedProductName, setSelectedProductName] = React.useState("");

    //third autoCompelete
    const [unitOfMeasurement, setUnitOfMeasurement] = React.useState("")
    const [isUnitOfMeasurementExistInDB, setIsUnitOfMeasurementExistInDB] = React.useState("")
    useEffect(() => {
        let selectedProduct = BusinessProducts.find(product => {
            return product.productName == selectedProductName
        })
        if (selectedProduct) {
            setUnitOfMeasurement(selectedProduct.unitOfMeasurement)
            setIsUnitOfMeasurementExistInDB(true)
        } else {
            setUnitOfMeasurement("")
            setIsUnitOfMeasurementExistInDB(false)
        }
    }, [selectedProductName])

    // last textfield
    const [amount, setAmount] = React.useState("")
    //radioGroup
    let [radioGroupValue, setRadioGroupValue] = React.useState("true")

    //button
    let isButtonDisable = !Boolean(selectedProductName && unitOfMeasurement && amount);
    //basket
    const [basket, setBasket] = React.useState(selectedBusiness.monthlyCommitment)

    const addToBasket = () => {
        let isDuplicate = basket.filter((value) => {
            return value.productName === selectedProductName;
        });
        if (isDuplicate[0]) {
            setOpenSnackbarDublicateError(true)
            return
        }
        setBasket([{ product: { id: basket.length + 1, productName: selectedProductName, unitOfMeasurement, amount, isRetail: radioGroupValue } }, ...basket])
        setSelectedProductName("")
        setBusinessProducts([])
        setUnitOfMeasurement("")
        setAmount("")
    }

    //delete frame
    const deleteFrame = (productName) => {
        setBasket((basket.filter(frame => frame.productName == productName)))
    }
    //Snackbars
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [openSnackbarDublicateError, setOpenSnackbarDublicateError] = React.useState(false);
    const [openSnackbar500Error, setOpenSnackbar500Error] = React.useState(false);
    const [openSnackbar404Error, setOpenSnackbar404Error] = React.useState(false);
    const [openSnackbar407Error, setOpenSnackbar407Error] = React.useState(false);

    const handleSnackbarClose = () => {
        setOpenSnackbar500Error(false)
        setOpenSnackbar(false);
        setOpenSnackbarDublicateError(false);
    };
    const handleShowSnackbar = () => {
        setOpenSnackbar(true);
    };

    //save basket to db
    async function updateMonthlyCommitment() {

        setIsLoading(true);
        const res = await fetch('api/setMonthlyCommitment', {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ businessID: selectedBusiness._id, basket })
        })
        if (res.status === 500) {
            console.log("server error");
            setOpenSnackbar500Error(true)
            setIsLoading(false)
        } else if (res.status === 201) {
            console.log("updateMonthlyCommitment sited successfully");
            handleShowSnackbar()
            setIsLoading(false)
        } else if (res.status === 404) {
            setOpenSnackbar404Error(true)
            setIsLoading(false)
        } else if (res.status === 406) {
            setOpenSnackbarError(true)
            setIsLoading(false)
        } else if (res.status === 407) {
            setOpenSnackbar407Error(true)
            setIsLoading(false)
        }
    }
    return (
        <Container maxWidth="md" className="inMiddle" align='center' >
            {isLoading ?
                <CircularProgress />
                :
                <>
                    <Typography sx={{ m: 2, textAlign: "center", fontSize: 14 }}>جهت ارائه چه مقدار از محصولات خود بصورت ماهانه متعهد می شوید؟</Typography>
                    <Autocomplete
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                            setSelectedProductName("")
                        }}
                        blurOnSelect
                        id="combo-box-demo"
                        options={userBusinessesNames}
                        value={selectedBusinessName}
                        sx={{ m: 2, width: 300 }}
                        renderInput={(params) => <TextField {...params} label="انتخاب کسب و کار" />}
                        onChange={(e, value) => { setSelectedBusinessName(value) }}
                    />
                    <Autocomplete
                        sx={{ m: 2, width: 300 }}
                        id="add-product"
                        freeSolo
                        options={BusinessProducts}
                        renderInput={(params) => <TextField {...params} label="انتخاب محصولات موجود یا ورود محصول جدید" />}
                        onInputChange={(event, newInputValue) => {
                            setSelectedProductName(newInputValue)
                            setAmount([])
                        }}
                    />


                    {isUnitOfMeasurementExistInDB ?
                        <Typography sx={{ m: 1, textAlign: "center", fontSize: 14 }}>
                            {` واحد اندازه گیری  : ${unitOfMeasurement}`}
                        </Typography>
                        :
                        <Box sx={{ width: "100%" }}>
                            <TextField
                                sx={{ mx: 2, width: 300 }}
                                id="outlined-controlled"
                                label="واحد اندازه گیری"
                                value={unitOfMeasurement}
                                onChange={(event) => {
                                    setUnitOfMeasurement(event.target.value);
                                }}
                            />
                        </Box>
                    }
                    <Box sx={{ width: "100%" }}>
                        <TextField
                            placeholder="بصورت عدد وارد نمایید مثلا 5"
                            sx={{ m: 2, width: 300 }}
                            id="outlined-controlled2"
                            label="مقدار(عدد)"
                            onChange={(event) => {
                                setAmount(event.target.value);
                            }}
                            value={amount}
                        />
                    </Box>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">مصرف کننده</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={radioGroupValue}
                            onChange={(e, value) => setRadioGroupValue(value)}
                        >
                            <FormControlLabel value="false" control={<Radio />} label="کسب و کارها" />
                            <FormControlLabel value="true" control={<Radio />} label="اعضای کسب و کار" />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        sx={{ display: "block" }}
                        children={"اضافه به سبد"}
                        variant="contained"
                        disabled={isButtonDisable}
                        onClick={addToBasket}
                    />
                    <List dense={true}>
                        {basket.map(producrFrame => {
                            return (
                                <ListItem key={producrFrame._id || producrFrame.product.id} sx={{ m: 1, width: '100%', minWidth: 300, maxWidth: 400, bgcolor: '#e0e0e0', textAlign: "right" }} >
                                    {producrFrame.product.isRetail == "true" ?
                                        <ListItemIcon>
                                            <Groups2Icon />
                                        </ListItemIcon>
                                        :
                                        <ListItemIcon>
                                            <BusinessRoundedIcon />
                                        </ListItemIcon>
                                    }
                                    <ListItemText primary={producrFrame.product.productName} secondary={`${producrFrame.product.amount} - ${producrFrame.product.unitOfMeasurement}`} />
                                    <IconButton onClick={() => deleteFrame(producrFrame.productName || producrFrame.product.productName)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                            )
                        })
                        }
                    </List>
                    <Button
                        sx={{ display: "block" }}
                        children={"ذخیره تغییرات"}
                        variant="contained"
                        disabled={selectedBusiness.monthlyCommitment === basket}
                        onClick={updateMonthlyCommitment}
                    />
                    <CustomSnackbar
                        open={openSnackbar}
                        onClose={handleSnackbarClose}
                        message="تعهدات ماهانه این کسب و کار بروزرسانی شد"
                    />
                    <CustomSnackbar
                        open={openSnackbar500Error}
                        onClose={handleSnackbarClose}
                        message="خطا از سمت سرور"
                        severity="error"

                    />
                    <CustomSnackbar
                        open={openSnackbarDublicateError}
                        onClose={handleSnackbarClose}
                        message="این محصول قبلا به سبد اضافه شده است"
                        severity="error"

                    />
                </>
            }
        </Container>
    )
}
