import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { Accordion, AccordionDetails, Chip, CircularProgress, Container, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CreateBillFrame from "./CreateBillFrame";
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Groups2Icon from '@mui/icons-material/Groups2';
import DeleteIcon from '@mui/icons-material/Delete';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';

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
  const [radioGroupValue, setRadioGroupValue] = React.useState("true")

  const addToBills = () => {
    setbills([{ id: bills.length + 1, productName: selectedProduct, unitOfMeasurement, amount, isRetail: radioGroupValue }, ...bills])
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
        {isLoading ?
          <Box className="inMiddle">
            <CircularProgress />
          </Box>
          :
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                // justifyContent:"space-around",
                width: "100%",
                pl: 1
              }}
            >
              <Typography sx={{ mr: 5, mt: 1 }}>ایجاد صورتحساب</Typography>
              <IconButton aria-label="closeIcon" onClick={() => fabHandler()}>
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
                      // value={selectedProduct}
                      options={userBusinesses}
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
                />
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
                  sx={{ mt: 2 }}
                  children={"اضافه نمودن به فاکتور"}
                  variant="contained"
                  disabled={selectedProduct && unitOfMeasurement && amount ? false : true}
                  onClick={addToBills}
                />
                {bills[0] &&
                  <>
                    <List dense={true}>
                        {bills.map(bills => {
                            return (
                                <ListItem key={bills.id} sx={{ m: 1, width: '100%', minWidth: 300, maxWidth: 400, bgcolor: '#e0e0e0', textAlign: "right" }} >
                                    {bills.isRetail == "true" ?
                                        <ListItemIcon>
                                            <Groups2Icon />
                                        </ListItemIcon>
                                        :
                                        <ListItemIcon>
                                            <BusinessRoundedIcon />
                                        </ListItemIcon>
                                    }
                                    <ListItemText primary={bills.productName} secondary={`${bills.amount} - ${bills.unitOfMeasurement}`} />
                                    <IconButton onClick={() => deleteFrame(bills._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                            )
                        })
                        }
                    </List>
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
        }

      </Box>
    </Container>
  );
}