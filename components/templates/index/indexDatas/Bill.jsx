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


export default function Bill({ user }) {

  const userBusinesses = user.businesses.map(business => business.businessName)

  const [selectedBusiness, setSelectedBusiness] = React.useState("")

  const [selectedProduct, setSelectedProduct] = React.useState("")

  const [unitOfMeasurement, setUnitOfMeasurement] = React.useState("")

  const [amount, setAmount] = React.useState("")

  const [bills, setbills] = React.useState([])

  const [customerCode, setCustomerCode] = React.useState([])

  const addToBills = () => {
    setbills([{ id: bills.length + 1, productName: selectedProduct, unitOfMeasurement, amount }, ...bills])
    setSelectedProduct("")
    setUnitOfMeasurement("")
    setAmount("")
  }
  const deleteFrame = (id) => {
    setbills((bills.filter(bill => bill.id !== id)))
  }

  async function createThisBill(selectedBusiness, customerCode, bills) {
    console.log("clickeddd");
    const res = await fetch('api/createBill', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedBusiness, customerCode, bills })
    })
    console.log("response to create bill is =>", res);
    if (res.status === 500) {
      console.log("nashod bill");
    } else if (res.status === 201) {
      console.log("okeye");
    }
  }

  const [expanded, setExpanded] = React.useState(false);
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 1, minWidth: 200, maxWidth: 600 }} className='inMiddle' display="flex" flexDirection="column" align='center'>
        {user ?
          <>
            {user.businesses[0] ?
              <>
                <Accordion expanded={expanded}>
                  <Chip
                    label="راهنمایی"
                    sx={{ direction: 'ltr' }}
                    onClick={() => setExpanded(!expanded)}
                    icon={<QuestionMarkOutlinedIcon />}
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

                <Autocomplete
                  blurOnSelect
                  id="combo-box-demo"
                  options={userBusinesses}
                  sx={{ m: 2, width: 300 }}
                  renderInput={(params) => <TextField {...params} label="انتخاب کسب و کار" />}
                  onChange={(e) => setSelectedBusiness(userBusinesses[e.target.value])}
                />
                {selectedBusiness ?
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
                    {bills[0] ?
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
                      : ""
                    }

                  </>
                  :
                  ""
                }
              </>
              :
              <Typography color="error">
                برای ارسال صورتحساب ابتدا بایستی عضو یک کسب و کار باشید
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