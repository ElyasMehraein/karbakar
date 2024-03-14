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
  console.log("user.business", bills);
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
      {!user.businesses[0] ?
        <Typography color="error">
          برای دریافت صورتحساب بایستی حداقل عضو یک کسب و کار باشید
        </Typography>
          : !bills ?
          <Typography color="error">
            هیچ صورتحسابی برای شما ارسال نشده است
          </Typography>
          :
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
                  این صورتحساب ها توسط کسب و کارهایی که از آنها محصول یا خدمات دریافت می کنید ارسال می شود
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


          </>
          }
    </Container>
  );
}