import React, { useEffect, useState } from 'react'
import { Autocomplete, Button, Container, IconButton, List, ListItem, ListItemText, TextField, Typography, createFilterOptions } from '@mui/material';
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
    let selectedBusiness = userBusinesses.find(business => business.businessName == selectedBusinessName)
    const selectedBusinessProductNames = [""].concat(selectedBusiness?.deliveredProducts.map(product => {
        return product.productName
    }));
    const [selectedProductName, setSelectedProductName] = React.useState("");




    //third autoCompelete
    const [unitOfMeasurement, setUnitOfMeasurement] = React.useState("")
    let selectedProduct = selectedBusiness?.deliveredProducts.find(product => {
        return product.productName == selectedProductName
    })
    const DBunitOfMeasurement = selectedProduct?.unitOfMeasurement


    const addToGiveaway = () => {
    }
    const deleteFrame = () => {
    }
    return (
        <Container maxWidth="md" className="inMiddle" display="flex" align='center'>
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
                options={selectedBusinessProductNames}
                renderInput={(params) => <TextField {...params} label="انتخاب یا ورود محصول جدید" />}
                onInputChange={(event, newInputValue) => {
                    setSelectedProductName(newInputValue)
                }}
            />

            {DBunitOfMeasurement ?
                <Typography sx={{ m: 2, textAlign: "center", fontSize: 14 }}>

                    {` واحد اندازه گیری  : ${DBunitOfMeasurement}`}
                </Typography>
                :
                <TextField
                    sx={{ width: 300 }}
                    id="outlined-controlled"
                    label="واحد اندازه گیری"
                    value={unitOfMeasurement}
                    onChange={(event) => {
                        setUnitOfMeasurement(event.target.value);
                    }}
                />}

            <Button
                sx={{ mt: 2, display: "block" }}
                children={"اضافه نمودن به فاکتور"}
                variant="contained"
                disabled={selectedBusinessName && selectedProductName && unitOfMeasurement}
                onClick={addToGiveaway}
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
