"use client"

import * as React from "react";
import styles from '@/App/welcome/styles.module.css'
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
import { phoneNumberCheck, codeCheck } from "@/../validation/validation"
import hands from "@/../public/m-hands.png"

const steps = [
  {
    label: (<p className={styles.inputText}>شماره موبایل خود را وارد کنید</p>),
    placeholder: "مثلا 09123456789",
    description: (
      <p className={styles.paragraph}>
        انتخاب دکمه بعدی به معنی موافقت با <a href="url">قوانین سایت</a> است
      </p>
    ),
  },
  {
    label: (<p className={styles.inputText}>کد تایید را وارد کنید</p>),
    placeholder: "کد تایید پیامکی را وارد نمایید",
    description: (
      <p className={styles.paragraph}>
        `کد تایید برای شماره موبایل شما ارسال شد در صورت اشتباه بودن شماره وارد شده جهت اصلاح آن به مرحله قبل بازگردید`
      </p>
    )
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
    <div className={styles.container}>
      <div className={styles.wellcomeLogoDiv} >
        <Image className={styles.image}
          fill
          src={hands}
          alt="karbakar website logo"
        />
      </div>
      <h1 className={styles.title}>کارباکار</h1>

      {
        show ? (
          <div className={styles.wellcomeHeader}>
            <h2 className={styles.aitch2}>باهم برای هم برای زندگی آزاد</h2>
            <p className={styles.paragraph}>
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
                sx={{ "& input::placeholder": { fontSize: "14px"}, width: "200px" }}
                variant="outlined"
                size="small"
                id="outlined-textarea"
                label={
                  textFieldError ? activeStep === 0 ? "شماره موبایل بدرستی وارد نشده" : "کد تایید پیامکی اشتباه وارد شده است"
                    : steps[activeStep].label
                }
                placeholder={steps[activeStep].placeholder}
                value={activeStep === 0 ? phone : code}
              />
            </Paper>
            <Box sx={{ height: 80, maxWidth: 400, width: "90%", p: 2 }}>
              {steps[activeStep].description}
            </Box>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button size="small" onClick={handleBack}>
                  بازگشت
                  {<KeyboardArrowLeft />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleNext}>
                  {<KeyboardArrowRight />}
                  بعدی
                </Button>
              }
            />
          </Box>
        )
      }
    </div>
  );
}

export default Wellcome;
