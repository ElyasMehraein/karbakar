import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import BillAutoComplete from "./BillAutoComplete";
import Button from '@mui/material/Button';


const filter = createFilterOptions();

export default function NativeSelectDemo() {
  const [value, setValue] = React.useState(null);
  return (
    <Box sx={{ minWidth: 120 }}>
      <Typography>
        لحظه ای که محصولات خود را به دیگران تحویل می دهید برایشان فاکتور صادر
        نمایید و از مشتری بخواهید همان لحظه آن را بررسی و تایید نماید
      </Typography>
      <Typography color="error">
        * محصولاتی را که ارائه می نمایید در صفحه کسب و کار شما به نمایش در می
        آید
      </Typography>
      <FormControl sx={{ mt: 4 }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          کسب و کار خود را که با آن محصول ارائه نموده اید را انتخاب کنید
        </InputLabel>
        <NativeSelect
          defaultValue={10}
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}
        >
          <option value={10}>تعمیرگاه فورد</option>
          <option value={20}>صنایع دستی الیاس</option>
          <option value={30}>
            باشگاه ورزشی پیشکسوتان شهر زیبای نیویورک و حومه و اینور اونور
          </option>
        </NativeSelect>
      </FormControl>
      <Typography sx={{ mt: 2 }}>
        هر محصول جدیدی ارائه می دهید به فهرست محصولات شما اضافه می شود
      </Typography>
      <BillAutoComplete props={dataa} />
      <br />
      <TextField sx={{ mt: 2 }} id="standard-basic" label="مقدار" variant="outlined" />
      <br />
      <BillAutoComplete props={diameter} />
      <br />
      <Button sx={{ mt: 2 }} variant="contained">اضافه نمودن به فاکتور</Button>

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