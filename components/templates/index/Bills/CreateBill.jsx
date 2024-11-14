import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { Accordion, AccordionDetails, Chip, CircularProgress, Container } from "@mui/material";
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import ProductBasket from "@/components/modules/ProductBasket";

export default function CreateBill({ user, primeBusiness }) {
  const [isLoading, setIsLoading] = React.useState(false);

  const [businessID, setBusinessID] = React.useState()
  const addBusinessID = (value) => {
    setBusinessID(value)
  }
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
    const res = await fetch('api/createBill', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessID, customerCode, basket })
    })
    if (res.status === 500) {
      console.log("server error");
    } else if (res.status === 201) {
      console.log("bill created successfully");
      handleShowSnackbar()
      setIsLoading(false)
    } else if (res.status === 404) {
      setOpenSnackbar404Error(true)
      setIsLoading(false)
    } else if (res.status === 406) {
      setOpenSnackbarError(true)
      setIsLoading(false)
    } else if (res.status === 407) {
      setOpenSnackbar407Error(true)
      setIsLoading(false)
    }
  }
  const [expanded, setExpanded] = React.useState(false);
  return (
    <Container maxWidth="md" sx={{ pb: 5 }} className="inMiddle" align='center'>
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
          <ProductBasket
            {...{ user, primeBusiness }}
            parentBasketFunction={addBasket}
            parentSetBusinessID={addBusinessID}
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