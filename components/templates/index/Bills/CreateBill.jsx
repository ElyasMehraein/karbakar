import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { Accordion, AccordionDetails, Chip, CircularProgress, Container } from "@mui/material";
import CreateBillFrame from "./CreateBillFrame";
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function CreateBill({ user, fabHandler }) {
  const [isLoading, setIsLoading] = React.useState(false);

  const userBusinesses = user.businesses.map(business => {
    if (business.agentCode == user.code) {
      return business.businessName
    }
  })
  const [selectedBusiness, setSelectedBusiness] = React.useState("")
  const [selectedProduct, setSelectedProduct] = React.useState("تست فروشی")
  const [unitOfMeasurement, setUnitOfMeasurement] = React.useState("کیلوگرم")
  const [amount, setAmount] = React.useState("100")
  const [bills, setbills] = React.useState([])
  const [customerCode, setCustomerCode] = React.useState("1000")

  const addToBills = () => {
    setbills([{ id: bills.length + 1, productName: selectedProduct, unitOfMeasurement, amount }, ...bills])
    setSelectedProduct("")
    setUnitOfMeasurement("")
    setAmount("")
  }
  const deleteFrame = (id) => {
    setbills((bills.filter(bill => bill.id !== id)))
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
  async function createThisBill(selectedBusiness, customerCode, bills) {
    setIsLoading(true);
    const res = await fetch('api/createBill', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedBusiness, customerCode, bills })
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
    <Container maxWidth="md" sx={{ pb: 5 }}>
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
      <Box sx={{ py: 1, my: 1, minWidth: 200, maxWidth: 600, bgcolor: "#f5f5f5", boxShadow: 3 }} className='inMiddle' display="flex" flexDirection="column" align='center'>
        {user ?
          <>
            {userBusinesses[0] ?
              isLoading ? <Box className="inMiddle">
                <CircularProgress />
              </Box>

                :
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      // justifyContent:"space-around",
                      width: "100%"
                    }}
                  >
                    <Typography sx={{ mr: 5, mt: 1 }}>ایجاد صورتحساب</Typography>
                    <IconButton aria-label="settings" onClick={() => fabHandler()}>
                      <CloseIcon />
                    </IconButton>
                  </Box>

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
                        disabled={selectedProduct && unitOfMeasurement && amount ? false : true}
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
                            disabled={customerCode ? false : true}
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