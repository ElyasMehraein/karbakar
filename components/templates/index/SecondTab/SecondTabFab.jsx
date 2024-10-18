import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, Container, IconButton, List, ListItem, ListItemText, TextField, Typography, createFilterOptions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
const filter = createFilterOptions();

export default function SecondTabFab({ user, primeBusiness }) {
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
        const selectedBusinessProductNames = selectedBusiness.deliveredProducts.map(product => {
            return product.productName
        })
        setBusinessProducts(selectedBusinessProductNames)
    }, [selectedBusinessName])

    const [selectedProductName, setSelectedProductName] = React.useState("");

    //third autoCompelete
    const [unitOfMeasurement, setUnitOfMeasurement] = React.useState("")
    useEffect(() => {
        let selectedProduct = selectedBusiness?.deliveredProducts.find(product => {
            return product.productName == selectedProductName
        })
        if (selectedProduct) {
            setUnitOfMeasurement(selectedProduct.unitOfMeasurement)
        } else {
            setUnitOfMeasurement("")
        }
    }, [selectedProductName])

    // forth textfield
    const [amount, setAmount] = React.useState("")

    //adding to basket

    const [basket, setBasket] = React.useState([])

    const addToBasket = () => {
        setBasket([{ id: basket.length + 1, productName: selectedProductName, unitOfMeasurement, amount }, ...basket])
        setSelectedProductName("")
        setUnitOfMeasurement("")
        setAmount("")
    }

    //che khabare?
    let isButtonDisable = !Boolean(selectedProductName && unitOfMeasurement && amount);

    console.log("basket", basket);

    const deleteFrame = () => {
    }
    return (
        <Container maxWidth="md" className="inMiddle" align='center' >
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
                }}
            />

            {unitOfMeasurement ?
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
            <TextField
                sx={{ m: 2, width: 300 }}
                id="outlined-controlled2"
                label="مقدار(عدد)"
                defaultValue={amount}
                onChange={(event) => {
                    setAmount(event.target.value);
                }}
            />
            <Button
                sx={{ display: "block" }}
                children={"اضافه به سبد"}
                variant="contained"
                disabled={isButtonDisable}
                onClick={addToBasket}
            />
            <List dense={true}>
                <ListItem sx={{ p: 2, width: '100%', minWidth: 300, maxWidth: 400, bgcolor: '#e0e0e0' }} >
                    <ListItemText primary="50" />
                    <ListItemText primary="کیلوگرم" />
                    <ListItemText primary=" سیب زمینی خلالی با طعم خیار" />

                    <IconButton onClick={() => deleteFrame(id)}>
                        <DeleteIcon />
                    </IconButton>

                </ListItem>
            </List>
        </Container>
    )
}
