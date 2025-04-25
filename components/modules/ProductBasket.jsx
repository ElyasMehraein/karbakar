import React, { useEffect, useState } from 'react'
import {
  Autocomplete,
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Groups2Icon from '@mui/icons-material/Groups2'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import CustomSnackbar from '@/components/modules/CustomSnackbar'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'

export default function ProductBasket({
  user,
  primeBusiness,
  parentBasketFunction,
  parentSetBusinessID,
  useFor,
}) {
  const [selectedBusinessName, setSelectedBusinessName] = useState(primeBusiness.businessName)
  const userBusinesses = user.businesses.filter(business => business.agentCode == user.code)
  const userBusinessesNames = userBusinesses.map(business => business.businessName)
  const [BusinessProducts, setBusinessProducts] = useState([])
  const selectedBusiness = userBusinesses.find(
    business => business.businessName === selectedBusinessName
  )
  const [selectedProductName, setSelectedProductName] = useState('')
  const [unitOfMeasurement, setUnitOfMeasurement] = useState('')
  const [isUnitOfMeasurementExistInDB, setIsUnitOfMeasurementExistInDB] = useState(false)
  const [amount, setAmount] = useState('')
  const [radioGroupValue, setRadioGroupValue] = useState('true')
  const [basket, setBasket] = useState([])
  const [isBasketChanged, setIsBasketChanged] = useState(true)
  const [initialBasketRef, setInitialBasketRef] = useState([])
  const [openSnackbarDublicateError, setOpenSnackbarDublicateError] = useState(false)
  const [openSnackbar500Error, setOpenSnackbar500Error] = useState(false)

  useEffect(() => {
    if (selectedBusiness?._id) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`/api/getBusinessProduct?businessId=${selectedBusiness._id}`)
          if (!response.ok) throw new Error('Failed to fetch products')
          const data = await response.json()
          setBusinessProducts(data.data.map(product => product.product))
        } catch (err) {
          setOpenSnackbar500Error(true)
          console.error(err.message)
        }
      }
      fetchProducts()
    }
  }, [selectedBusiness?._id])

  useEffect(() => {
    const selectedProduct = BusinessProducts.find(
      product => product.productName === selectedProductName
    )
    if (selectedProduct) {
      setUnitOfMeasurement(selectedProduct.unitOfMeasurement)
      setIsUnitOfMeasurementExistInDB(true)
    } else {
      setUnitOfMeasurement('')
      setAmount('')
      setIsUnitOfMeasurementExistInDB(false)
    }
  }, [selectedProductName, BusinessProducts])

  useEffect(() => {
    if (useFor === 'setMonthlyCommitment' && selectedBusiness?._id) {
      const fetchMonthlyCommitment = async () => {
        try {
          const response = await fetch(
            `/api/getBusinessMonthlyCommitment?businessId=${selectedBusiness._id}`
          )
          if (!response.ok) throw new Error('Failed to fetch products')
          const { data } = await response.json()
          setBasket(data.monthlyCommitment)
          setInitialBasketRef(data.monthlyCommitment)
        } catch (err) {
          setOpenSnackbar500Error(true)
          console.error(err.message)
        }
      }
      fetchMonthlyCommitment()
    }
  }, [selectedBusiness?._id, useFor])

  useEffect(() => {
    setIsBasketChanged(JSON.stringify(basket) === JSON.stringify(initialBasketRef))
  }, [basket, initialBasketRef])

  const addToBasket = () => {
    const isDuplicate = basket.some(item => item.product.productName === selectedProductName)
    if (isDuplicate) {
      setOpenSnackbarDublicateError(true)
      return
    }
    const updatedBasket = [
      ...basket,
      {
        product: {
          _id: Math.random(),
          productName: selectedProductName,
          unitOfMeasurement,
          isRetail: radioGroupValue,
        },
        amount,
      },
    ]
    setBasket(updatedBasket)
    parentBasketFunction(updatedBasket, isBasketChanged)
    parentSetBusinessID(selectedBusiness._id)
    setSelectedProductName('')
    setUnitOfMeasurement('')
    setAmount('')
  }

  const deleteFrame = productName => {
    const updatedBasket = basket.filter(item => item.product.productName !== productName)
    setBasket(updatedBasket)
    parentBasketFunction(updatedBasket, isBasketChanged)
  }

  const handleSnackbarClose = () => {
    setOpenSnackbarDublicateError(false)
    setOpenSnackbar500Error(false)
  }

  return (
    <Container maxWidth="md" align="center">
      {useFor[0] && (
        <FormControl sx={{ my: 2, width: 300 }}>
          <InputLabel id="chose-business-label">انتخاب کسب و کار</InputLabel>
          <Select
            labelId="chose-business-label"
            value={selectedBusinessName}
            onChange={e => setSelectedBusinessName(e.target.value)}
          >
            {userBusinessesNames.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <Autocomplete
        sx={{ width: 300 }}
        freeSolo
        inputValue={selectedProductName}
        options={BusinessProducts.map(product => product.productName)}
        renderInput={params => <TextField {...params} label="محصول" />}
        onInputChange={(e, newValue) => setSelectedProductName(newValue)}
      />
      {isUnitOfMeasurementExistInDB ? (
        <Typography sx={{ textAlign: 'center', fontSize: 14 }}>
          {`واحد اندازه گیری: ${unitOfMeasurement}`}
        </Typography>
      ) : (
        <TextField
          sx={{ my: 2, width: 300 }}
          label="واحد اندازه گیری"
          value={unitOfMeasurement}
          onChange={e => setUnitOfMeasurement(e.target.value)}
        />
      )}
      <TextField
        sx={{ my: 2, width: 300 }}
        label="مقدار"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <Button variant="contained" onClick={addToBasket}>
        اضافه کردن به سبد
      </Button>
      <List>
        {basket.map((item, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={item.product.productName}
              secondary={`${item.amount} ${item.product.unitOfMeasurement}`}
            />
            <IconButton onClick={() => deleteFrame(item.product.productName)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <CustomSnackbar
        open={openSnackbar500Error}
        onClose={handleSnackbarClose}
        message="خطا در سرور"
        severity="error"
      />
      <CustomSnackbar
        open={openSnackbarDublicateError}
        onClose={handleSnackbarClose}
        message="محصول تکراری است"
        severity="warning"
      />
    </Container>
  )
}
