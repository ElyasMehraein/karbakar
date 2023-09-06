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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    label: "شماره موبایل خود را وارد کنید",
    placeholder: "مثلا 09123456789",
    description: "انتخاب دکمه بعدی به معنی قبول قوانین سایت است",
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
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;
  
  const navigate = useNavigate();

  const handleNext = () =>{
    activeStep === 1 ? navigate("/index"):
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }
  const handleBack = () => {
    if (activeStep === 0) {
      changeShow();
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [show, setShow] = useState(true);
  const changeShow = () => {
    setShow(!show);
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
        <Box display={"inline-block"} sx={{ maxWidth: 400 }}>
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
              sx={{ width: "250px" }}
              id="outlined-textarea"
              label={steps[activeStep].label}
              placeholder={steps[activeStep].placeholder}
              description={steps[activeStep].description}
              type="tel"
              multiline
            />
          </Paper>
          <Box sx={{ height: 150, maxWidth: 400, width: "100%", p: 2 }}>
            {steps[activeStep].description}
          </Box>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                
                
                size="small"
                onClick={handleNext}
                // disabled={activeStep === maxSteps - 1}
              >
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
              <Button
                size="small"
                onClick={handleBack}
                // disabled={activeStep === 0}
              >
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
