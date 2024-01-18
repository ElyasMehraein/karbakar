// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {smsCodeCheck, phoneNumberCheck} from "./Validator"



export default function handler(req, res) {
  if(phoneNumberCheck("0944305845526")){

    console.log("okeyeeeyyyee");
  }else{
    console.log("noooooo ok nissst");
  }
  if(smsCodeCheck("554455")){

    console.log("sms okeyeeeyyyee");
  }else{
    console.log("sms noooooo ok nissst");
  }
}
