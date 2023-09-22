import TrezSmsClient from "trez-sms-client"
import 'dotenv/config'

const smsuser = process.env.SMSUSER;
const smspass = process.env.SMSPASS;
const client = new TrezSmsClient(smsuser, smspass)
console.log(client);
function sendSMS(userNumber) {
    client.autoSendCode(userNumber, "karbakar.ir").then((messageId) => {
        console.log("Sent Message ID: " + messageId);
    })
        .catch(error => console.log(error));

}
client.checkCode("09301234567", "595783")
    .then((isValid) => {
        if (isValid) {
            console.log("Code 595783 for this number 09301234567 is valid and verified.");
        }
        else {
            console.log("Provided code for that number is not valid!");
        }
    })
    .catch(error => console.log(error));


sendSMS("09305845526")
