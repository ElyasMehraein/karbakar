import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { Accordion, AccordionDetails, Chip, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import BasketSelection from "@/components/modules/BasketSelection";

export default function CreateBill({ user, primeBusiness }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedBusinessName, setSelectedBusinessName] = React.useState(primeBusiness.businessName)
  const userBusinesses = user.businesses.map(business => business.businessName)
  const selectedBusiness = user.businesses.find((business) => {
    if (business.businessName == selectedBusinessName) {
      return business
    }
  })

  const [customerCode, setCustomerCode] = React.useState()
  const [basket, setBasket] = React.useState([])
  const [isBasketChanged, setIsBasketChanged] = useState(true);

  const addBasket = (value, isBasketChanged) => {
    setBasket(value)
    setIsBasketChanged(isBasketChanged)
  }

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [openSnackbarError, setOpenSnackbarError] = React.useState(false);
  const [openSnackbar404Error, setOpenSnackbar404Error] = React.useState(false);
  const [openSnackbar407Error, setOpenSnackbar407Error] = React.useState(false);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    // fabHandler();
  };
  const handleShowSnackbar = () => {
    setOpenSnackbar(true);
  };
  async function createThisBill() {
    setIsLoading(true);
    try {
      const res = await fetch('/api/createBill', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessID: selectedBusiness._id, customerCode, basket }),
      });

      if (!res.ok) {
       const errorData = await res.json();
        console.error('Error:', errorData.message);
        if (res.status === 404) setOpenSnackbar404Error(true);
        if (res.status === 406) setOpenSnackbarError(true);
        if (res.status === 422) setOpenSnackbar407Error(true);
        return;
      }

      const data = await res.json();
      console.log("Bill created successfully:", data);
      handleShowSnackbar();
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const [expanded, setExpanded] = React.useState(false);
  return (
    <Container maxWidth="md" sx={{ pb: 5 }} >
      <Accordion sx={{ boxShadow: 0 }} expanded={expanded}>
        <Chip
          label="راهنمایی"
          sx={{ direction: 'ltr' }}
          onClick={() => setExpanded(!expanded)}
          icon={<QuestionMarkOutlinedIcon sx={{ fontSize: 16 }} />}
        />
        <AccordionDetails>
          <Typography>
            لحظه ای که محصولات خود را به دیگران تحویل می دهید برایشان فاکتور صادر
            نمایید و از مشتری بخواهید همان لحظه آن را بررسی و تایید نماید
          </Typography>
          <Typography sx={{ my: 2 }} color="error">
            * محصولاتی را که ارائه می نمایید پس از تایید این صورتحساب در صفحه کسب و کار شما به نمایش در می
            آیند
          </Typography>
        </AccordionDetails>
      </Accordion>

      {isLoading ?
        <Box className="inMiddle">
          <CircularProgress />
        </Box>
        :
        <>
          {/* <ProductBasket
            {...{ user, primeBusiness, useFor: "bill" }}
            parentBasketFunction={addBasket}
            parentSetBusinessID={addBusinessID}
          /> */}
          <Box className="inMiddle">
            <FormControl sx={{ my: 2, width: 300 }}>
              <InputLabel id="chose-business-lable">برای این کسب و کار ثبت شود</InputLabel>
              <Select
                size='small'
                labelId="chose-business-lable"
                id="chose-business"
                value={selectedBusinessName}
                label="برای این کسب و کار ثبت شود"
                onChange={(e) => {
                  setSelectedBusinessName(e.target.value);
                }}
              >
                {userBusinesses.map((userBusinessesName) => {
                  return <MenuItem key={userBusinessesName} value={userBusinessesName}>{userBusinessesName}</MenuItem>
                })}
              </Select>
            </FormControl>
            <BasketSelection
              // business={business}
              parentBasketFunction={addBasket}
            />
            <TextField
              placeholder="در پروفایل کاربران قابل مشاهده است" variant="outlined"
              label="کد کاربری مشتری"
              onChange={(e) => setCustomerCode(e.target.value)}
              sx={{ mt: 2, width: 300 }}
            />
            < Button
              sx={{ mt: 2 }}
              disabled={isBasketChanged}
              children={"ارسال صورتحساب"}
              variant="contained"
              onClick={() => createThisBill()}
            />
          </Box>
        </>
      }
      <CustomSnackbar
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message="صورتحساب جهت تایید برای مشتری ارسال شد"
      />
      <CustomSnackbar
        open={openSnackbarError}
        onClose={() => setOpenSnackbarError(false)}
        message="شما نمی توانید برای خودتان صورتحساب صادر نمایید"
        severity="error"
      />
      <CustomSnackbar
        open={openSnackbar404Error}
        onClose={() => setOpenSnackbar404Error(false)}
        message="کاربر یافت نشد کد کاربری را مجدد بررسی نمایید"
        severity="error"
      />
      <CustomSnackbar
        open={openSnackbar407Error}
        onClose={() => setOpenSnackbar407Error(false)}
        message="کاربر انتخاب شده فاقد کسب و کار اصلی است"
        severity="error"
      />
    </Container>
  );
}