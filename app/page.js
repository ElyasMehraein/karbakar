"use client"

import * as React from "react";
// import "../app/page.module.css"
import Image from 'next/image'
import Button from "@mui/material/Button";
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
import { phoneNumberCheck, codeCheck } from "../validation/validation"

const steps = [
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
      `کد تایید برای شماره موبایل شما ارسال شد در صورت اشتباه بودن شماره وارد شده جهت اصلاح آن به مرحله قبل بازگردید`
  },
];

function Wellcome() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;
  // const navigate = useNavigate();
  const [textFieldError, setTextFieldError] = useState(false);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const changeSetValues = (value) => {
    activeStep === 0 ? setPhone(value) : setCode(value);
  };

  const [show, setShow] = useState(true);
  const changeShow = () => {
    setShow(!show);
  };
  function phoneError() {
    setTextFieldError(true);
  }
  function phoneFine() {
    console.log("fine e");
    setActiveStep(() => 1);
  }

  function handleNext() {
    if (activeStep === 0) {
      if (phoneNumberCheck(phone)) {
        phoneFine();
        console.log("code vase shomare", phone, "ersal shod");
      } else {
        phoneError();
      }
    } else {
      if (codeCheck(code)) {
        console.log(`send ${phone} and ${code} to api and wait for register or login`);
      } else {
        phoneError()
      }
    }
  }

  const handleBack = () => {
    if (activeStep === 0) {
      changeShow();
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <header className="wellcome-header">
        <Image
          src="/m-hands.png"
          width={500}
          height={500}
          alt="karbakar website logo"
          className="wellcome-logo" />
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
              error={textFieldError}
              onChange={(e) => {
                changeSetValues(e.target.value);
                setTextFieldError(false);
              }}
              sx={{ width: "230px" }}
              id="outlined-textarea"
              label={
                textFieldError ? activeStep === 0 ? "شماره موبایل بدرستی وارد نشده" : "کد تایید پیامکی اشتباه وارد شده است"
                  : steps[activeStep].label
              }
              placeholder={steps[activeStep].placeholder}
              multiline
              value={activeStep === 0 ? phone : code}
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
                { }
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
