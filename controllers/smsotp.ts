import TrezSMSClient from "@/utils/Trez";

const smsuser: string = process.env.SMSUSER || '';
const smspass: string = process.env.SMSPASS || '';
const client: TrezSMSClient = new TrezSMSClient(smsuser, smspass);

export function sendSMS(userNumber: string): void {
  console.log("message sent to ", userNumber);
  client
    .autoSendCode(userNumber, "karbakar.ir")
    .then((messageId: string) => {
      console.log("Sent Message ID: " + messageId);
    })
    .catch((error: Error) => console.log("sms sending catch a problem", error));
}

export function SMSOtpvalidator(userNumber: string, SMSCode: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    client
      .checkCode(userNumber, SMSCode)
      .then((isValid: boolean) => {
        console.log("isValid => ", isValid);
        resolve(isValid);
      })
      .catch((error: Error) => {
        console.log(error);
        reject(error);
      });
  });
} 