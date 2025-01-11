import React, { useEffect, useState } from 'react';
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
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Groups2Icon from '@mui/icons-material/Groups2';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import CustomSnackbar from "@/components/modules/CustomSnackbar";

// در صورت نیاز به تولید آیدی یکتا برای محصول جدید
import { v4 as uuidv4 } from 'uuid';

export default function BasketSelection({ business, guild, parentBasketFunction }) {
  const guildID = guild?._id || business?.guild;

  // لیست محصولات دریافت‌شده از سرور
  const [products, setProducts] = useState([]);

  // نام محصول انتخاب‌شده (از Autocomplete)
  const [selectedProductName, setSelectedProductName] = useState("");

  // آبجکت محصول انتخاب‌شده؛ اگر محصول جدید باشد، این مقدار null خواهد بود
  const [selectedProduct, setSelectedProduct] = useState(null);

  // تعیین واحد اندازه‌گیری
  const [unitOfMeasurement, setUnitOfMeasurement] = useState("");
  const [isUnitOfMeasurementExistInDB, setIsUnitOfMeasurementExistInDB] = useState(false);

  // مقدار (تعداد)
  const [amount, setAmount] = useState("");

  // رادیو مصرف‌کننده (true => اعضای کسب‌وکار، false => سایر کسب‌وکارها)
  const [radioGroupValue, setRadioGroupValue] = useState("true");

  // سبد محصولات
  const [basket, setBasket] = useState([]);
  // اسنک‌بارها
  const [openSnackbarDublicateError, setOpenSnackbarDublicateError] = useState(false);
  const [openSnackbar500Error, setOpenSnackbar500Error] = useState(false);

  // فراخوانی لیست محصولات از سرور
  useEffect(() => {
    if (guildID) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`/api/getGuildProduct?guildID=${guildID}`);
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
          const data = await response.json();
          const productsFromDB = data.data || [];
          setProducts(productsFromDB);
        } catch (err) {
          setOpenSnackbar500Error(true);
          console.error(err.message);
        }
      };
      fetchProducts();
    }
  }, [guildID]);

  useEffect(() => {
    if (business) {
      const fetchMonthlyCommitment = async () => {
        try {
          const response = await fetch(`/api/getBusinessMonthlyCommitment?businessId=${business._id}`);
          if (!response.ok) throw new Error('Failed to fetch products');
          const { data } = await response.json();
          setBasket(data.monthlyCommitment);
        } catch (err) {
          console.log("no MonthlyCommitment", err);
        }
      };
      fetchMonthlyCommitment();
    }
  }, [business]);

  useEffect(() => {
    const matchedProduct = products.find(
      (product) => product.productName === selectedProductName
    );
    if (matchedProduct) {
      setSelectedProduct(matchedProduct);
      setUnitOfMeasurement(matchedProduct.unitOfMeasurement);
      setIsUnitOfMeasurementExistInDB(true);
    } else {
      setSelectedProduct(null);
      setUnitOfMeasurement("");
      setAmount("");
      setIsUnitOfMeasurementExistInDB(false);
    }
  }, [selectedProductName, products]);

  // مدیریت تغییرات در Autocomplete
  const handleProductNameChange = (event, newValue) => {
    setSelectedProductName(newValue || "");
    setAmount("");
  };

  // افزودن محصول به سبد
  const addToBasket = () => {
    // بررسی تکراری نبودن محصول
    const isDuplicate = basket.some(
      (item) => item.product.productName === selectedProductName
    );
    if (isDuplicate) {
      setOpenSnackbarDublicateError(true);
      return;
    }

    // اگر محصول در دیتابیس وجود داشته باشد از همان _id استفاده می‌کنیم
    // در غیر این صورت، یک آیدی یکتا تولید می‌کنیم
    const newId = selectedProduct?._id || uuidv4();

    const newBasketItem = {
      product: {
        _id: newId,
        productName: selectedProductName,
        unitOfMeasurement: unitOfMeasurement,
        isRetail: radioGroupValue, // 'true' یا 'false'
        guildID: guildID,
      },
      amount: amount,
    };

    const updatedBasket = [newBasketItem, ...basket];
    setBasket(updatedBasket);

    // اگر نیاز دارید همواره selectedProduct را به والد هم بفرستید:
    parentBasketFunction?.(updatedBasket, selectedProduct);

    // ریست فیلدها
    setSelectedProductName("");
    setUnitOfMeasurement("");
    setAmount("");
    setSelectedProduct(null);
  };

  // حذف محصول از سبد
  const deleteFrame = (productName) => {
    const updatedBasket = basket.filter(
      (frame) => frame.product.productName !== productName
    );
    setBasket(updatedBasket);
    parentBasketFunction?.(updatedBasket, selectedProduct);
  };

  // بستن اسنک‌بار
  const handleSnackbarClose = () => {
    setOpenSnackbarDublicateError(false);
    setOpenSnackbar500Error(false);
  };

  // کنترل فعال بودن دکمه
  const isButtonDisable = !(
    selectedProductName && unitOfMeasurement && amount
  );

  return (
    <Container maxWidth="md" className="inMiddle" align="center">
      <Autocomplete
        sx={{ width: 300 }}
        id="add-product"
        freeSolo
        value={selectedProductName}
        options={products.map((product) => product.productName)}
        onInputChange={handleProductNameChange}
        renderInput={(params) => <TextField {...params} label="محصول" />}
      />

      {isUnitOfMeasurementExistInDB ? (
        <Typography sx={{ textAlign: "center", fontSize: 14, mt: 1 }}>
          {`واحد اندازه گیری: ${unitOfMeasurement}`}
        </Typography>
      ) : (
        <Box>
          <TextField
            sx={{ my: 2, width: 300 }}
            id="unit-of-measurement"
            label="واحد اندازه گیری"
            value={unitOfMeasurement}
            onChange={(event) => setUnitOfMeasurement(event.target.value)}
          />
        </Box>
      )}

      <Box>
        <TextField
          placeholder="مثلاً 5"
          sx={{ width: 300 }}
          id="amount"
          label="مقدار (عدد)"
          onChange={(event) => setAmount(event.target.value)}
          value={amount}
        />
      </Box>

      <FormControl sx={{ mt: 2 }}>
        <FormLabel id="consumer-type">مصرف کننده</FormLabel>
        <RadioGroup
          row
          aria-labelledby="consumer-type"
          name="consumer-type"
          value={radioGroupValue}
          onChange={(e) => setRadioGroupValue(e.target.value)}
        >
          <FormControlLabel value="false" control={<Radio />} label="کسب و کارها" />
          <FormControlLabel value="true" control={<Radio />} label="اعضای کسب و کار" />
        </RadioGroup>
      </FormControl>

      <Button
        sx={{ display: "block", mt: 2 }}
        variant="contained"
        disabled={isButtonDisable}
        onClick={addToBasket}
      >
        اضافه به سبد
      </Button>
        <Typography>salam</Typography>

      <List dense sx={{ mt: 2 }}>
        {basket.map((productFrame) => {

          return (
            
            <ListItem
              key={productFrame.product._id}
              sx={{
                my: 1,
                width: '100%',
                minWidth: 300,
                maxWidth: 400,
                bgcolor: '#e0e0e0',
                textAlign: "right"
              }}
            >
              <ListItemIcon>
                {productFrame.product.isRetail === "true" ? (
                  <Groups2Icon />
                ) : (
                  <BusinessRoundedIcon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={productFrame.product.productName}
                secondary={`${productFrame.amount} - ${productFrame.product.unitOfMeasurement}`}
              />
              <IconButton
                onClick={() => deleteFrame(productFrame.product.productName)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          )
        }
        )}
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
  );
}
