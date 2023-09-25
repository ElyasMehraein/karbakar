import TrezSmsClient from "trez-sms-client";
import "dotenv/config";
const smsuser = process.env.SMSUSER;
const smspass = process.env.SMSPASS;
const client = new TrezSmsClient(smsuser, smspass);

function sendSMS(userNumber) {
  console.log("message sent to ", userNumber);
  client
    .autoSendCode(userNumber, "karbakar.ir")
    .then((messageId) => {
      console.log("Sent Message ID: " + messageId);
    })
    .catch((error) => console.log("sms sendig catch a problem",error));
}
function checkSMS(userNumber, SMSCode) {
  client
    .checkCode(userNumber, SMSCode)
    .then((isValid) => {
     console.log("isvalid=> ",isValid)
    })
    .catch((error) => console.log(error));
}

export { sendSMS, checkSMS };
