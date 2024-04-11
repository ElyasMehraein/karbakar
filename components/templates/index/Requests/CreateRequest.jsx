import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { Accordion, AccordionDetails, Chip, Container } from "@mui/material";
import CreateBillFrame from "../indexDatas/CreateBillFrame";
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import { useState, useEffect } from 'react'
import Guild from "@/components/modules/Guild"
import Divider from '@mui/material/Divider';
import HelpIcon from '@/components/modules/HelpIcon';
import { iconText } from '@/components/typoRepo';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ItsAvatar from "@/components/modules/ItsAvatar"
import { Avatar } from '@mui/material';
import { Grid } from '@mui/material';

export default function CreateRequest({ user, distinctGuilds }) {
  console.log("distinctGuilds", distinctGuilds);

  const [guildname, setGuildName] = useState("")

  const updateGuildname = (newGuildname) => {
    setGuildName(newGuildname);
  };

  const [snackbarError, setSnackbarError] = useState(false);





  /// OLD
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
  //   setUnitOfMeasurement("")
  //   setAmount("")
  // }
  // const deleteFrame = (id) => {
  //   setbills((bills.filter(bill => bill.id !== id)))
  // }

  // const [openSnackbar, setOpenSnackbar] = React.useState(false);
  // const [openSnackbarError, setOpenSnackbarError] = React.useState(false);

  // const handleSnackbarClose = () => {
  //   setOpenSnackbar(false);
  // };
  // const handleShowSnackbar = () => {
  //   setOpenSnackbar(true);
  // };
  // async function createThisBill(selectedBusiness, customerCode, bills) {
  //   const res = await fetch('api/createBill', {
  //     method: "POST",
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ selectedBusiness, customerCode, bills })
  //   })
  //   if (res.status === 500) {
  //     console.log("server error");
  //   } else if (res.status === 201) {
  //     console.log("bill signed successfully");
  //     handleShowSnackbar()
  //   } else if (res.status === 406) {
  //     setOpenSnackbarError(true)
  //   }
  // }
  const [expanded, setExpanded] = React.useState(false);
  return (
    <Container maxWidth="md" sx={{ p: 0 }}>
      <Accordion sx={{ boxShadow: 0 }} expanded={expanded}>
        <Chip
          label="راهنمایی"
          sx={{ direction: 'ltr' }}
          onClick={() => setExpanded(!expanded)}
          icon={<QuestionMarkOutlinedIcon sx={{ fontSize: 16 }} />}
        />
        <AccordionDetails>
          <Typography>
            زمانی که درخواست محصول ایجاد می کنید دیگران تنها کسب و کار اصلی شما را مشاهده می نمایند و با توجه به کسب و کار اصلی شما در خصوص ارئه محصول به شما تصمیم گیری خواهند کرد،          </Typography>
          ابتدا صنف مرتبط به محصولی که میخواهید را انتخاب کنید
          <Typography sx={{ my: 2 }} color="error">
            جهت جلوگیری از ایجاد سوابق سوری تغییر کسب و کار اصلی تنها هر 14 روز امکانپذیر
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Box sx={{ px: 0, py: 1, my: 1, minWidth: 200, maxWidth: 600, bgcolor: "#f5f5f5", boxShadow: 3 }} className='inMiddle' display="flex" flexDirection="column" align='center'>
        <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>ایجاد درخواست جدید</Typography>

        <Box>

          {user.businesses.map((business) => (
            user.primeJob === business._id && (
              <Box key={business._id}>
                <Typography sx={{ px: 1, pt: 2, textAlign: 'left', fontSize: 10, fontWeight: 'bold' }}>کسب و کار اصلی</Typography>
                  <ListItemButton onClick={() => router.push(`/${business.businessName}`)}>
                <ListItem>
                    <ListItemText align="right" primary={business.businessName} secondary={business.businessBrand} sx={{ m: 0 }} />
                    <ListItemAvatar>
                      <Avatar sx={{ width: 40, height: 40 }}>
                        <ItsAvatar userCodeOrBusinessBrand={business.businessName} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText align="right" primary={business.businessName} secondary={business.businessBrand} sx={{ m: 0 }} />
                </ListItem>
              </ListItemButton>
              </Box>
            )))}
      </Box>
      <Guild updateGuildname={updateGuildname} distinctGuilds={distinctGuilds} snackbarError={snackbarError} />

      <Box
        display="flex"
        justifyContent='center'
      >
        <TextField
          id="outlined-multiline-static"
          label="معرفی 150 کارکتری"
          // inputProps={{ maxLength: 200 }}
          sx={{ maxWidth: 250, }}
          fullWidth
        // onChange={changeHandler}
        />
      </Box>

    </Box>
      {/* <CustomSnackbar
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
        {user ?
          <>
            {user.businesses[0] ? */}
  {/* 
              <>
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

       */}
    </Container >
  );
}