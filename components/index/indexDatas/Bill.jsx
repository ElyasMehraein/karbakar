import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
// import BillAutoComplete from "./BillAutoComplete";
import Button from '@mui/material/Button';
import { Container } from "@mui/material";


const filter = createFilterOptions();

export default function NativeSelectDemo({ user }) {
  const [theBusiness, setTheBusiness] = React.useState(user.businesses[0]);
  console.log(theBusiness);
  const selectedBusiness = (e) => {
    setTheBusiness(e.target.value)
  }

  return (
    <Box sx={{ minWidth: 200, maxWidth: 600 }} display="flex" flexDirection="column" align='center'>
      {user ? <>
        <Typography>
          لحظه ای که محصولات خود را به دیگران تحویل می دهید برایشان فاکتور صادر
          نمایید و از مشتری بخواهید همان لحظه آن را بررسی و تایید نماید
        </Typography>
        <Typography color="error">
          * محصولاتی را که ارائه می نمایید در صفحه کسب و کار شما به نمایش در می
          آید
        </Typography>
        {user.businesses ? <>
          <FormControl sx={{ mt: 4 }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              کسب و کاری که با آن محصول ارائه نموده اید
            </InputLabel>
            <NativeSelect
              onChange={selectedBusiness}
            >
              {user.businesses.map(business => (
                <option key={business._id}>{business.businessName}</option>
              ))}
            </NativeSelect>
          </FormControl>

          <FormControl sx={{ mt: 4 }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              انتخاب محصول
            </InputLabel>
            <NativeSelect sx={{ minWidth: 300 }}>
              {theBusiness.products?.map(product => (
                <option key={product}>{product}</option>
              ))}
            </NativeSelect>
          </FormControl>
          <TextField sx={{ mt: 2 }} id="standard-basic" label="مقدار" variant="outlined" />

          <Button sx={{ mt: 2 }} variant="contained">اضافه نمودن به فاکتور</Button>
        </>
          : <Typography color="error">
            برای ارسال صورتحساب ابتدا بایستی عضو یک کسب و کار باشید
          </Typography>}
      </>
        :
        <Typography color="error">
          برای مشاهده این بخش باید ابتدا ثبت نام کنید
        </Typography>
      }
    </Box>
  );
}
const dataa = {
  productSearch: [
    { title: "آچارکشی موتور", },
    { title: "تعمیر کولر", },
    { title: "تعویض لنت", },
  ],
  productAdd: "اضافه نمودن محصول جدید: ",
  productLable: "انتخاب محصول",
};
const diameter = {
  productSearch: [
    { title: "کیلوگرم", },
    { title: "سرویس", },
    { title: "عدد", },
  ],
  productAdd: "اضافه نمودن واحد جدید: ",
  productLable: "واحد اندازه گیری",
};