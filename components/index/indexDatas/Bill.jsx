import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Accordion, AccordionDetails, Chip, Container } from "@mui/material";
import CommonAutocomplete from "@/components/common/CommonAutocomplete";
import DoneIcon from '@mui/icons-material/Done';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';


export default function Bill({ user }) {

  const userBusinesses = user.businesses.map(business => business.businessName)
  console.log("userBusinesses", userBusinesses);

  const [selectedBusiness, setSelectedBusiness] = React.useState(null)
  console.log("selectedBusiness", selectedBusiness);

  const [selectedProduct, setSelectedProduct] = React.useState(null)
  console.log("selectedProduct", selectedProduct);

  const [unitOfMeasurement, setUnitOfMeasurement] = React.useState(null)
  console.log("unitOfMeasurement", unitOfMeasurement);


  const [expanded, setExpanded] = React.useState(false);
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 3, minWidth: 200, maxWidth: 600 }} className='inMiddle' display="flex" flexDirection="column" align='center'>
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
                  sx={{ m: 3, width: 300 }}
                  renderInput={(params) => <TextField {...params} label="انتخاب کسب و کار" />}
                  onChange={(e) => setSelectedBusiness(userBusinesses[e.target.value])}
                />
                {selectedBusiness ?
                  <>
                    {selectedBusiness.products ?

                      <CommonAutocomplete optionsArray={products} label={"انتخاب محصول"} addMessage={"ایجاد محصول جدید"} onChangeHandler={(inputValue) => setSelectedProduct(inputValue)} />
                      :
                      <>
                        <TextField
                          placeholder='حداکثر 30 کارکتر' variant="outlined"
                          label="محصولی که ارائه نموده اید"
                          onChange={(e) => setSelectedProduct(e.target.value)}
                          sx={{ width: 300 }}
                        />
                        <TextField
                          placeholder="مثلا کیلوگرم یا عدد" variant="outlined"
                          label="واحد اندازه گیری"
                          onChange={(e) => setUnitOfMeasurement(e.target.value)}
                          sx={{ mt: 3, width: 300 }}
                        />
                      </>
                    }
                    <TextField
                      placeholder="مثلا 5" variant="outlined"
                      label="مقدار"
                      onChange={(e) => setUnitOfMeasurement(e.target.value)}
                      sx={{ mt: 3, width: 300 }}
                    />

                    <Button sx={{ mt: 3 }} variant="contained">اضافه نمودن به فاکتور</Button>


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