import * as React from "react";
import Button from "@mui/material/Button";
import mhands from "../../assets/m-hands.png";
import "./Wellcome.css";
import { Link, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import phoneNumberCheck from "../../../validation/validation";

const steps = [
  {
    label: "شماره موبایل اشتباه است",
    placeholder: "مثلا 09123456789",
    description: (
      <p>
        انتخاب دکمه بعدی به معنی موافقت با <a href="url">قوانین سایت</a> است
      </p>
    ),
  },
  {
    label: "شماره موبایل خود را وارد کنید",
    placeholder: "مثلا 09123456789",
    description: (
      <p>
        انتخاب دکمه بعدی به معنی موافقت با <a href="url">قوانین سایت</a> است
      </p>
    ),
  },
  {
    label: "کد تایید را وارد کنید",
    placeholder: "کد تایید پیامکی را وارد نمایید",
    description:
      "کد تایید برای شماره موبایل 092828282828 ارسال شد در صورت اشتباه بودن شماره وارد شده جهت اصلاح آن به مرحله قبل بازگردید",
  },
  {
    label: "کد تایید را وارد کنید",
    placeholder: "کد تایید پیامکی را وارد نمایید",
    description:
      "کد تایید برای شماره موبایل 092828282828 ارسال شد در صورت اشتباه بودن شماره وارد شده جهت اصلاح آن به مرحله قبل بازگردید",
  },
];

function Wellcome() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(1);
  const maxSteps = steps.length;
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const changeSetphone = (value) => {
    console.log("are ba");
    setPhone(value);
    console.log(value);
  };

  const [show, setShow] = useState(true);
  const changeShow = () => {
    setShow(!show);
  };
  function phoneError() {
    setActiveStep(() => 0);
  }
  function phoneFine() {
    console.log("fine e");
    setActiveStep(() => 2);
  }

  function handleNext() {
    if (phoneNumberCheck(phone)) {
      phoneFine();
      setPhone("");
      console.log("injam", phone);
    } else {
      phoneError();
    }
  }

  const handleBack = () => {
    if (activeStep === 1) {
      changeShow();
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <header className="wellcome-header">
        <img src={mhands} className="wellcome-logo" alt="logo" />
        <h1 className="text-extrablack">کارباکار</h1>
      </header>
      {show ? (
        <div className="wellcome-header">
          <h2>باهم برای هم برای زندگی آزاد</h2>
          <p>
            اقتصاد اجتماعی غیر پولی برای مبادله بدون واسطه محصولات و خدمات افراد
            و کسب و کارهای مولد
          </p>
          <Button onClick={changeShow} variant="contained">
            ورود یا ثبت نام
          </Button>
        </div>
      ) : (
        <Box display={"inline-block"} sx={{ maxWidth: 500 }}>
          <Paper
            square
            elevation={0}
            sx={{
              alignItems: "center",
              height: 50,
              pl: 2,
              bgcolor: "background.default",
            }}
          >
            <TextField
              error={activeStep === 0 && true}
              onChange={(e) => {
                changeSetphone(e.target.value);
              }}
              sx={{ width: "230px" }}
              id="outlined-textarea"
              label={steps[activeStep].label}
              placeholder={steps[activeStep].placeholder}
              description={steps[activeStep].description}
              multiline
              value={phone}
            />
          </Paper>
          <Box sx={{ height: 150, maxWidth: 500, width: "100%", p: 2 }}>
            {steps[activeStep].description}
          </Box>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext}>
                بعدی
                {}
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack}>
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                بازگشت
              </Button>
            }
          />
        </Box>
      )}
    </div>
  );
}
export default Wellcome;
