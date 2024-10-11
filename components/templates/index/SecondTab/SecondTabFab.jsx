import React, { useState } from 'react'
import { Autocomplete, Button, Container, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SecondTabFab({ user }) {
    const [selectedBusiness, setSelectedBusiness] = React.useState("")
    const [selectedProduct, setSelectedProduct] = React.useState("")
    const [unitOfMeasurement, setUnitOfMeasurement] = React.useState("")
    const [amount, setAmount] = React.useState("")
    
    const userBusinesses = user.businesses.map(business => {
        if (business.agentCode == user.code) {
            return business.businessName
        } 
    })
    const userBusinessProducts = ["felan", "test"]

    
    const addToGiveaway = () => {
    }
    const deleteFrame = () => {

    }
    return (
        <Container maxWidth="md" className="inMiddle" display="flex" align='center'>
            <Typography sx={{ m: 2, textAlign: "center", fontSize: 14 }}>جهت ارائه چه مقدار از محصولات خود بصورت ماهانه متعهد می شوید؟</Typography>
            <Autocomplete
                blurOnSelect
                id="combo-box-demo"
                defaultValue={userBusinesses[0]}
                options={userBusinesses}
                sx={{ m: 2, width: 300 }}
                renderInput={(params) => <TextField {...params} label="انتخاب کسب و کار" />}
                onChange={(e, value) => setSelectedBusiness(value)}
            />
            <Autocomplete
                blurOnSelect
                id="combo-box-demo"
                options={userBusinessProducts}
                sx={{ m: 2, width: 300 }}
                renderInput={(params) => <TextField {...params} label="انتخاب محصول" />}
                onChange={(e, value) => setSelectedBusiness(value)}
            />
            <TextField
                value={selectedProduct}

                placeholder='حداکثر 30 کارکتر' variant="outlined"
                label="مقدار"
                onChange={(e) => setSelectedProduct(e.target.value)}
                sx={{ width: 300 }}
            />
            <Autocomplete
                blurOnSelect
                id="combo-box-demo"
                options={[" کیلوگرم", "متر "]}
                sx={{ m: 2, width: 300 }}
                renderInput={(params) => <TextField {...params} label="واحد اندازه گیری" />}
                onChange={(e, value) => setSelectedBusiness(value)}
            />
            <Button
                sx={{ mt: 2 }}
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
            </List>
        </Container>
    )
}
