import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function Bill({ user }) {
  const [value, setValue] = React.useState(null);
  console.log('====================================');
  console.log(value);
  console.log('====================================');
  const userBusinesses = user.businesses.map(business => business.businessName)
  const [userBusiness, setUserBusiness] = React.useState(null)
  const products = userBusiness?.products
  return (
    <Box sx={{ minWidth: 200, maxWidth: 600 }} display="flex" flexDirection="column" align='center'>
      {user ? <>
        {user.businesses[0] ? <>
          <Typography>
            لحظه ای که محصولات خود را به دیگران تحویل می دهید برایشان فاکتور صادر
            نمایید و از مشتری بخواهید همان لحظه آن را بررسی و تایید نماید
          </Typography>
          <Typography color="error">
            * محصولاتی را که ارائه می نمایید در صفحه کسب و کار شما به نمایش در می
            آید
          </Typography>

          <Autocomplete
            blurOnSelect
            id="combo-box-demo"
            options={userBusinesses}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="انتخاب کسب و کار" />}
          />
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                setValue({
                  productName: newValue,
                });
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setValue({
                  productName: newValue.inputValue,
                });
              } else {
                setValue(newValue);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              // Suggest the creation of a new value
              const isExisting = options.some((option) => inputValue === option.productName);
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  inputValue,
                  productName: `Add "${inputValue}"`,
                });
              }

              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={userBusiness}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
              return option.productName;
            }}
            renderOption={(props, option) => <li {...props} key={option.productName}>{option.productName}</li>}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
              <TextField {...params} label={products ? "انتخاب محصول" : "اولین محصول کسب و کار را تعریف کنید"} />
            )}
          />


          {/* <TextField sx={{ mt: 2 }} id="standard-basic" label="مقدار" variant="outlined" /> */}

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