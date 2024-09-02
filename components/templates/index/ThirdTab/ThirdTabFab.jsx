import React from 'react'
import { Autocomplete, Button, Container, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

export default function ThirdTabFab() {
    const [selectedProduct, setSelectedProduct] = React.useState("")
    const [unitOfMeasurement, setUnitOfMeasurement] = React.useState("")
    const [amount, setAmount] = React.useState("")
    return (
        <Container maxWidth="md" className="inMiddle" display="flex" align='center'>
            <Typography sx={{ m: 2, textAlign: "center", fontSize: 14 }}>
                به کدام محصولات یا خدمات از چه صنفی نیاز دارید؟
            </Typography>
            <Autocomplete
                disablePortal
                options={["آهن فروشی", "test2"]}
                sx={{ width: 300, my: 1 }}
                renderInput={(params) => <TextField {...params} label="انتخاب صنف" />}
            />
            <Autocomplete
                blurOnSelect
                id="combo-box-demo"
                options={["ورق فولاد", "پروفیل آهنی"]}
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
            <Button
                sx={{ mt: 2 }}
                children={"اضافه نمودن به درخواست"}
                variant="contained"
                disabled={selectedProduct && unitOfMeasurement && amount ? false : true}
                // onClick={addToGiveaway}
            />
            <List dense={true}>
                <ListItem sx={{ p: 2, width: '100%', minWidth: 300, bgcolor: '#e0e0e0' }} >
                    <ListItemText primary="aa" />
                    <ListItemText primary="aa" />
                    <ListItemText primary="aa" />

                    <IconButton onClick={() => deleteFrame(id)}>
                        <DeleteIcon />
                    </IconButton>

                </ListItem>
            </List>
            <Button
                sx={{ mt: 2 }}
                children={"ثبت درخواست"}
                variant="contained"
                // onClick={addToGiveaway}
            />
        </Container>
    )
}
