import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, Container, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Groups2Icon from '@mui/icons-material/Groups2';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import CustomSnackbar from "@/components/modules/CustomSnackbar";

export default function BasketSelection({ business, guild, parentBasketFunction }) {

    const guildID = guild?._id || business?.guild
    // select product

    const [products, setProducts] = React.useState([]);
    const fetchAddress = business ? `/api/getBusinessProduct?businessId=${business._id}` : guild && `/api/getGuildProduct?guildID=${guild?._id}`;

    useEffect(() => {
        if (business || guild._id) {
            const fetchProducts = async () => {
                try {
                    const response = await fetch(fetchAddress);
                    if (!response.ok) {
                        throw new Error('Failed to fetch products');
                    }
                    const data = await response.json();
                    const Products = data.data.map((product) => business ? product.product : guild && product)
                    setProducts(Products);
                }
                catch (err) {
                    setOpenSnackbar500Error(true)
                    console.log(err.message);
                }
            };
            fetchProducts();
        }
    }, [business || guild]);

    const [selectedProductName, setSelectedProductName] = React.useState("");
    // select unitOfMasurment

    const [unitOfMeasurement, setUnitOfMeasurement] = React.useState("")
    const [isUnitOfMeasurementExistInDB, setIsUnitOfMeasurementExistInDB] = React.useState("")
    useEffect(() => {
        let selectedProduct = products.find(product => {
            return product.productName == selectedProductName
        })
        if (selectedProduct) {
            setUnitOfMeasurement(selectedProduct.unitOfMeasurement)
            setIsUnitOfMeasurementExistInDB(true)
        } else {
            setUnitOfMeasurement("")
            setAmount("")
            setIsUnitOfMeasurementExistInDB(false)
        }
    }, [selectedProductName])

    // select Amount
    const [amount, setAmount] = React.useState("")
    //radioGroup
    let [radioGroupValue, setRadioGroupValue] = React.useState("true")

    // Create Basket Button
    let isButtonDisable = !Boolean(selectedProductName && unitOfMeasurement && amount);
    //basket
    const [basket, setBasket] = useState([])


    const addToBasket = () => {
        let isDuplicate = basket.some((value) => {
            return value.product.productName === selectedProductName;
        });
        if (isDuplicate) {
            setOpenSnackbarDublicateError(true)
            return
        }
        const updatedBasket = [{ product: { _id: Math.floor(Math.random() * 100), productName: selectedProductName, unitOfMeasurement, isRetail: radioGroupValue, guildID }, amount }, ...basket]
        parentBasketFunction(updatedBasket);
        setBasket(updatedBasket)
        setSelectedProductName("")
        setUnitOfMeasurement("")
        setAmount("")
    }

    //delete frame
    const deleteFrame = (productName) => {
        const updatedBasket = basket.filter(frame => frame.product.productName !== productName)
        parentBasketFunction(updatedBasket);
        setBasket(updatedBasket)
    }
    //Snackbars
    const [openSnackbarDublicateError, setOpenSnackbarDublicateError] = React.useState(false);
    const [openSnackbar500Error, setOpenSnackbar500Error] = React.useState(false);

    const handleSnackbarClose = () => {
        setOpenSnackbarDublicateError(false);
        setOpenSnackbar500Error(false)
    };

    return (
        <Container maxWidth="md" className="inMiddle" align='center' >
            <Autocomplete
                sx={{ width: 300 }}
                id="add-product"
                freeSolo
                inputValue={selectedProductName}
                options={products.length > 0 ? products.map((product) => product.productName) : []}
                renderInput={(params) => <TextField {...params} label="محصول" />}
                onInputChange={(event, newInputValue) => {
                    setSelectedProductName(newInputValue)
                    setAmount([])
                }}
            />
            {isUnitOfMeasurementExistInDB ?
                <Typography sx={{ textAlign: "center", fontSize: 14 }}>
                    {` واحد اندازه گیری  : ${unitOfMeasurement}`}
                </Typography>
                :
                <Box >
                    <TextField
                        sx={{ my: 2, width: 300 }}
                        id="outlined-controlled"
                        label="واحد اندازه گیری"
                        value={unitOfMeasurement}
                        onChange={(event) => {
                            setUnitOfMeasurement(event.target.value);
                        }}
                    />
                </Box>
            }
            <Box >
                <TextField
                    placeholder="بصورت عدد وارد نمایید مثلا 5"
                    sx={{ width: 300 }}
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
                        <ListItem key={producrFrame.product._id} sx={{ my: 1, width: '100%', minWidth: 300, maxWidth: 400, bgcolor: '#e0e0e0', textAlign: "right" }} >
                            {producrFrame.product.isRetail == "true" ?
                                <ListItemIcon>
                                    <Groups2Icon />
                                </ListItemIcon>
                                :
                                <ListItemIcon>
                                    <BusinessRoundedIcon />
                                </ListItemIcon>
                            }
                            <ListItemText primary={producrFrame.product.productName} secondary={`${producrFrame.amount} - ${producrFrame.product.unitOfMeasurement}`} />
                            <IconButton onClick={() => deleteFrame(producrFrame.productName || producrFrame.product.productName)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    )
                })
                }
            </List>
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

        </Container>
    )
}
