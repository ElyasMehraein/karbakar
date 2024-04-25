"use client"

import * as React from "react";
import styles from '@/styles/welcome.module.css'
import Image from 'next/image'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import hands from "@/public/m-hands.png"
import { useRouter } from "next/navigation";
import { phoneFormatCheck, SMSFormatCheck } from "@/controllers/Validator";
import { Alert, Snackbar } from "@mui/material";



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


export default function Wellcome() {
  const router = useRouter()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;
  const [textFieldError, setTextFieldError] = useState(false);
  const [phone, setPhone] = useState("");
  const [SMSCode, setSMSCode] = useState("");
  const [SMSOtpTextFieldErrorMessage, setSMSOtpTextFieldErrorMessage] = useState("کد پیامکی بدرستی وارد نشده است");


  const changeSetValues = (value) => {
    activeStep === 0 ? setPhone(value) : setSMSCode(value);
  };

  const [show, setShow] = useState(true);
  const changeShow = () => {
    setShow(!show);
  };
  async function sendOtpSMS(phone) {
    const SMSAnswer = await fetch('api/auth/sendsmsotp', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(phone)
    })
    if (SMSAnswer.status === 200) {
      setSnackbarOpen(true)
    }
  }
  async function signup(phone, SMSCode) {
    const res = await fetch('api/auth/signup', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, SMSCode })
    })
    if (res.status === 406) {
      setSMSOtpTextFieldErrorMessage("کد پیامکی وارد شده معتبر نیست")
      phoneError()
    } else if (res.status === 201) {
      router.refresh()
    }
  }
  function phoneError() {
    setTextFieldError(true);
  }

  function handleNext() {
    if (activeStep === 0) {
      if (phoneFormatCheck(phone)) {
        sendOtpSMS(phone)
        console.log(phone);
        setActiveStep(() => 1)
        console.log("code vase shomare", phone, "ersal shod");
      } else {
        phoneError();
      }
    } else {
      if (SMSFormatCheck(SMSCode)) {
        signup(phone, SMSCode)
        console.log(`send ${phone} and ${SMSCode} to api and wait for register or login`);
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
          priority
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
                bgcolor: "background.default",
              }}
            >
              <TextField
                error={textFieldError}
                onChange={(e) => {
                  changeSetValues(e.target.value);
                  setTextFieldError(false);
                }}
                sx={{ "& input::placeholder": { fontSize: "14px" }, width: "200px" }}
                variant="outlined"
                size="small"
                id="outlined-textarea"
                label={
                  textFieldError ? activeStep === 0 ? "شماره موبایل بدرستی وارد نشده" : SMSOtpTextFieldErrorMessage
                    : steps[activeStep].label
                }
                placeholder={steps[activeStep].placeholder}
                value={activeStep === 0 ? phone : SMSCode}
              />
            </Paper>
            <Box sx={{ height: 80, maxWidth: 420, width: "100%" }}>
              {steps[activeStep].description}
            </Box>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={1 - activeStep}
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
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => location.reload()}>
              <Alert
                severity={"success"}
                variant="filled"
              >
                "ثبت نام با موفقیت انجام شد لطفا چند ثانیه منتظر بمانید"
              </Alert>
            </Snackbar>
          </Box>
        )
      }
    </div>
  );
}


