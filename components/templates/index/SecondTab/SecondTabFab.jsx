import React, { useState } from 'react'
import { Autocomplete, Button, Container, IconButton, List, ListItem, ListItemText, TextField, Typography, createFilterOptions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
const filter = createFilterOptions();

export default function SecondTabFab({ user, primeBusiness }) {
    const [selectedBusiness, setSelectedBusiness] = React.useState(primeBusiness)
    const [selectedBusinessName, setSelectedBusinessName] = React.useState(primeBusiness?.businessName)
    const [selectedProduct, setSelectedProduct] = React.useState("")
    const [unitOfMeasurement, setUnitOfMeasurement] = React.useState()
    const [amount, setAmount] = React.useState("")
    const [inputValue, setInputValue] = React.useState('');
    const [inputValue2, setInputValue2] = React.useState('');

    const userBusinesses = user.businesses.map(business => {
        if (business.agentCode == user.code) {
            return business.businessName
        }
    })
    const userBusinessProducts = user.businesses.map(business => {
        return business.deliveredProducts
    })
    const selectedBusinessProducts = userBusinessProducts[0].map((product) => {
        return product.productName
    })
    function selectProduct(value) {
        setSelectedProduct(value)
        let selectedProductUnitOfMeasurement = userBusinessProducts[0].filter((product) => {
            return product.productName == value
        })
        selectedProductUnitOfMeasurement[0] && setUnitOfMeasurement(selectedProductUnitOfMeasurement[0].unitOfMeasurement);
    }

    const addToGiveaway = () => {
    }
    const deleteFrame = () => {

    }
    return (
        <Container maxWidth="md" className="inMiddle" display="flex" align='center'>
            <Typography sx={{ m: 2, textAlign: "center", fontSize: 14 }}>جهت ارائه چه مقدار از محصولات خود بصورت ماهانه متعهد می شوید؟</Typography>
            <Autocomplete
                inputValue={inputValue2}
                onInputChange={(event, newInputValue) => {
                    setInputValue2(newInputValue);
                }}
                blurOnSelect
                id="combo-box-demo"
                value={selectedBusinessName}
                options={userBusinesses}
                sx={{ m: 2, width: 300 }}
                renderInput={(params) => <TextField {...params} label="انتخاب کسب و کار" />}
                onChange={(e, value) => setSelectedBusiness(value)}
            />
            {/* <Autocomplete
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                blurOnSelect
                id="combo-box-demo"
                options={selectedBusinessProducts}
                sx={{ m: 2, width: 300 }}
                renderInput={(params) => <TextField {...params} label="انتخاب محصول" />}
                onChange={(e, value) => selectProduct(value)}
            /> */}
            <Autocomplete
                sx={{ m: 2, width: 300 }}
                // size="small"
                // className="inMiddle"
                onInputChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        // Create a new value from the user input
                        selectProduct(newValue);
                    } else if (newValue && newValue.inputValue) {
                        // Create a new value from the user input
                        selectProduct(newValue.inputValue);
                    } else {
                        selectProduct(newValue);
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option);
                    if (inputValue !== '' && !isExisting) {
                        filtered.push({
                            inputValue,
                            title: `اضافه کردن صنف جدید "${inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                selectOnFocus
                // clearOnBlur
                // freeSolo
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={selectedBusinessProducts || []}
                getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    // Regular option
                    return option;
                }}
                renderOption={(props, option) => <li {...props} key={option}>{option.title ? option.title : option}</li>}
                // freeSolo
                // fullWidth
                renderInput={(params) => (
                    <TextField {...params} label={"انتخاب محصول"} />
                )}
            />
            {/* <Autocomplete
                blurOnSelect
                id="combo-box-demo"
                options={unitOfMeasurement}
                sx={{ m: 2, width: 300 }}
                renderInput={(params) => <TextField {...params} label="واحد اندازه گیری" />}
                onChange={(e, value) => setUnitOfMeasurement(value)}
            />
            <TextField
                placeholder='حداکثر 30 کارکتر' variant="outlined"
                label="مقدار"
                onChange={(e) => setAmount(e.target.value)}
                sx={{ width: 300 }}
            />
            <Button
                sx={{ mt: 2, display: "block" }}
                children={"اضافه نمودن به فاکتور"}
                variant="contained"
                disabled={selectedProduct && unitOfMeasurement && amount ? false : true}
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
            </List> */}
        </Container>
    )
}
