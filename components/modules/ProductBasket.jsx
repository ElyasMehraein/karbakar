import React, { useEffect } from 'react'
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

export default function ProductBasket({ user, primeBusiness, parentBasketFunction, parentSetBusinessID }) {
    //first autoCompelete
    const [selectedBusinessName, setSelectedBusinessName] = React.useState(primeBusiness.businessName)
    const userBusinesses = user.businesses.map(business => {
        if (business.agentCode == user.code) {
            return business
        }
    })
    const userBusinessesNames = userBusinesses.map(business => business.businessName)

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
                const BusinessProducts = data.data.map((product) => product.product)
                setBusinessProducts(BusinessProducts);
            } catch (err) {
                setOpenSnackbar500Error(true)
                console.log(err.message);
            }
        };

        fetchProducts();
    }, [selectedBusinessName]);

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
            setAmount("")
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
    const [basket, setBasket] = React.useState([])

    const addToBasket = () => {
        let isDuplicate = basket.some((value) => {
            return value.product.productName === selectedProductName;
        });
        if (isDuplicate) {
            setOpenSnackbarDublicateError(true)
            return
        }
        const updatedBasket = [{ product: { id: Math.floor(Math.random() * 100), productName: selectedProductName, unitOfMeasurement, amount, isRetail: radioGroupValue } }, ...basket]
        parentBasketFunction(updatedBasket);
        setBasket(updatedBasket)
        setSelectedProductName("")
        setUnitOfMeasurement("")
        setAmount("")
        parentSetBusinessID(selectedBusiness._id)
    }

    //delete frame
    const deleteFrame = (productName) => {
        setBasket((basket.filter(frame => frame.product.productName !== productName)))
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
            <List dense={true}>
                {selectedBusiness.monthlyCommitment.map(producrFrame => {
                    console.log("selectedBusiness",producrFrame);
                    
                    return (
                        <ListItem key={producrFrame.product._id} sx={{ m: 1, width: '100%', minWidth: 300, maxWidth: 400, bgcolor: '#e0e0e0', textAlign: "right" }} >
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
                            <IconButton onClick={() => deleteFrame(producrFrame.product.productName)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    )
                })
                }
            </List>
            <FormControl sx={{ m: 2, width: 300 }}>
                <InputLabel id="chose-business-lable">انتخاب کسب و کار</InputLabel>
                <Select
                    labelId="chose-business-lable"
                    id="chose-business"
                    value={selectedBusinessName}
                    label="انتخاب کسب و کار"
                    onChange={(e) => {
                        setSelectedBusinessName(e.target.value);
                        setSelectedProductName("");
                    }}
                >
                    {userBusinessesNames.map((userBusinessesName) => {
                        return <MenuItem key={userBusinessesName} value={userBusinessesName}>{userBusinessesName}</MenuItem>
                    })}
                </Select>

            </FormControl>
            <Autocomplete
                sx={{ m: 2, width: 300 }}
                id="add-product"
                freeSolo
                inputValue={selectedProductName}
                options={BusinessProducts.map((product) => product.productName)}
                renderInput={(params) => <TextField {...params} label="محصول" />}
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
                        <ListItem key={producrFrame.product.id} sx={{ m: 1, width: '100%', minWidth: 300, maxWidth: 400, bgcolor: '#e0e0e0', textAlign: "right" }} >
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
