import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { Accordion, AccordionDetails, Chip, Container } from "@mui/material";
import CreateBillFrame from "./CreateBillFrame";
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';

export default function CreateBill({ user }) {

  const userBusinesses = user.businesses.map(business => {
    if (business.agentCode == user.code) {
      return business.businessName
    }
  })
  const [selectedBusiness, setSelectedBusiness] = React.useState("")
  const [selectedProduct, setSelectedProduct] = React.useState("")
  const [unitOfMeasurement, setUnitOfMeasurement] = React.useState("")
  const [amount, setAmount] = React.useState("")
  const [bills, setbills] = React.useState([])
  const [customerCode, setCustomerCode] = React.useState([])

  const addToBills = () => {
    setbills([{ id: bills.length + 1, productName: selectedProduct, unitOfMeasurement, amount }, ...bills])
    setUnitOfMeasurement("")
    setAmount("")
  }
  const deleteFrame = (id) => {
    setbills((bills.filter(bill => bill.id !== id)))
  }

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [openSnackbarError, setOpenSnackbarError] = React.useState(false);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  const handleShowSnackbar = () => {
    setOpenSnackbar(true);
  };
  async function createThisBill(selectedBusiness, customerCode, bills) {
    const res = await fetch('api/createBill', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedBusiness, customerCode, bills })
    })
    if (res.status === 500) {
      console.log("server error");
    } else if (res.status === 201) {
      console.log("bill signed successfully");
      handleShowSnackbar()
    } else if (res.status === 406) {
      setOpenSnackbarError(true)
    }
  }
  const [expanded, setExpanded] = React.useState(false);
  return (
    <Container maxWidth="md">
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
      <Box sx={{ py: 1, my: 1, minWidth: 200, maxWidth: 600, bgcolor: "#f5f5f5", boxShadow: 3 }} className='inMiddle' display="flex" flexDirection="column" align='center'>
        {user ?
          <>
            {user.businesses[0] ?
              <>
                <Typography sx={{ m: 1 }}>ایجاد صورتحساب</Typography>
                <Autocomplete
                  blurOnSelect
                  id="combo-box-demo"
                  options={userBusinesses}
                  sx={{ m: 2, width: 300 }}
                  renderInput={(params) => <TextField {...params} label="انتخاب کسب و کار" />}
                  onChange={(e, value) => setSelectedBusiness(value)}
                />
                {selectedBusiness &&
                  <>
                    {selectedBusiness.products ?

                      <modulesAutocomplete optionsArray={products} label={"انتخاب محصول"} addMessage={"ایجاد محصول جدید"} onChangeHandler={(inputValue) => setSelectedProduct(inputValue)} />
                      :
                      <>
                        <TextField
                          value={selectedProduct}

                          placeholder='حداکثر 30 کارکتر' variant="outlined"
                          label="محصولی که ارائه نموده اید"
                          onChange={(e) => setSelectedProduct(e.target.value)}
                          sx={{ width: 300 }}
                        />
                        <TextField
                          value={unitOfMeasurement}

                          placeholder="مثلا کیلوگرم یا عدد" variant="outlined"
                          label="واحد اندازه گیری"
                          onChange={(e) => setUnitOfMeasurement(e.target.value)}
                          sx={{ mt: 2, width: 300 }}
                        />
                      </>
                    }
                    <TextField
                      value={amount}
                      placeholder="مثلا 5" variant="outlined"
                      label="مقدار"
                      onChange={(e) => setAmount(e.target.value)}
                      sx={{ mt: 2, width: 300 }}
                      type="number"
                    />

                    <Button
                      sx={{ mt: 2 }}
                      children={"اضافه نمودن به فاکتور"}
                      variant="contained"
                      onClick={addToBills}
                    />
                    {bills[0] &&
                      <>
                        {bills.map(bill => {
                          return <CreateBillFrame key={bill.id} {...bill} deleteFrame={deleteFrame} />

                        })
                        }
                        <TextField
                          value={customerCode}
                          placeholder="در پروفایل کاربران قابل مشاهده است" variant="outlined"
                          label=" کد کاربری مشتری"
                          onChange={(e) => setCustomerCode(e.target.value)}
                          sx={{ mt: 2, width: 300 }}
                        />
                        < Button
                          sx={{ mt: 2 }}
                          children={"ارسال صورتحساب"}
                          variant="contained"
                          onClick={() => createThisBill(selectedBusiness, customerCode, bills)}
                        />

                      </>
                    }
                  </>
                }
              </>
              :
              <Typography color="error">
                ارسال صورتحساب تنها توسط نماینده کسب و کار امکانپذیر است
              </Typography>
            }
          </>
          :
          <Typography color="error">
            برای مشاهده این بخش باید ابتدا ثبت نام کنید
          </Typography>
        }

      </Box>
    </Container>
  );
}