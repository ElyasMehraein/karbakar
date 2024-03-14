import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Accordion, AccordionDetails, Chip, Container } from "@mui/material";
import modulesAutocomplete from "@/components/modules/modulesAutocomplete";
import DoneIcon from '@mui/icons-material/Done';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';

import BillFrame from "./BillFrame";
import CustomSnackbar from "@/components/modules/CustomSnackbar";


export default function Bill({ user, bills }) {

  // const userBusinesses = user.businesses.map(business => {
  //   if (business.agentCode == user.code) {
  //     return business.businessName
  //   }
  // })
  // const [selectedBusiness, setSelectedBusiness] = React.useState("")

  // const [selectedProduct, setSelectedProduct] = React.useState("")

  // const [unitOfMeasurement, setUnitOfMeasurement] = React.useState("")

  // const [amount, setAmount] = React.useState("")

  // const [bills, setbills] = React.useState([])

  // const [customerCode, setCustomerCode] = React.useState([])

  // const addToBills = () => {
  //   setbills([{ id: bills.length + 1, productName: selectedProduct, unitOfMeasurement, amount }, ...bills])
  //   setSelectedProduct("")
  //   setUnitOfMeasurement("")
  //   setAmount("")
  // }
  // const deleteFrame = (id) => {
  //   setbills((bills.filter(bill => bill.id !== id)))
  // }

  const [snackbarAccept, setSnackbarAccept] = React.useState(false);
  const [snackbarReject, setSnackbarReject] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);


  return (
    <Container maxWidth="md">
      {bills &&
        <>
          <Accordion sx={{ boxShadow: 0 }} expanded={expanded}>
            <Chip
              label="راهنمایی"
              sx={{ direction: 'ltr' }}
              onClick={() => setExpanded(!expanded)}
              icon={<QuestionMarkOutlinedIcon />}
            />
            <AccordionDetails>
              <Typography>
                این صورتحساب ها توسط کسب و کارهایی که از آنها محصول یا خدمات دریافت کرده اید ارسال شده است
              </Typography>
              <Typography sx={{ my: 2 }} color="error">
                * تایید شما به معنی تایید کمیت و کیفیت و رضایت شما از محصولات دریافتی است
              </Typography>
            </AccordionDetails>
          </Accordion>
          <CustomSnackbar
            open={snackbarAccept}
            onClose={() => setSnackbarAccept(false)}
            message="دریافت محصولات و خدمات صورتحساب تایید شد"
          />
          <CustomSnackbar
            open={snackbarReject}
            onClose={() => setSnackbarReject(false)}
            message="صورتحساب لغو گردید"
          />

          <Box sx={{ p: 5, my: 1, minWidth: 200, maxWidth: 600, bgcolor: "#f5f5f5", boxShadow: 3 }} className='inMiddle' display="flex" flexDirection="column" align='center'>
            <>
              {bills[0] ?
                <>
                  <Typography sx={{ m: 1 }}>مشاهده صورتحساب</Typography>
                  <Autocomplete
                    blurOnSelect
                    id="combo-box-demo"
                    options={userBusinesses}
                    sx={{ m: 2, width: 300 }}
                    renderInput={(params) => <TextField {...params} label="انتخاب کسب و کار" />}
                    onChange={(e) => setSelectedBusiness(userBusinesses[e.target.value])}
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
                            return <BillFrame key={bill.id} {...bill} deleteFrame={deleteFrame} />

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
                  هیچ صورتحسابی برای شما ارسال نشده است
                </Typography>
              }
            </>

          </Box>
        </>}
    </Container>
  );
}