import Validator from "fastest-validator";
const v = new Validator();




export function phoneNumberCheck(phoneNo) {
  const phoneSchema = {
    phoneNo: { type: "string", length: 11 },
    $$strict: true,
  };
  const phoneTypeChecker = v.compile(phoneSchema);
  const phoneNumberRegex = /^09\d{9}$/;
  return phoneTypeChecker({ phoneNo }) && phoneNumberRegex.test(phoneNo)
}




export function SMSCodeCheck(SMSCode) {
  const smsSchema = {
    SMSCode: { type: "string", length: 6 },
    $$strict: true,
  };
  const SMSCodeTypeChecker = v.compile(smsSchema);
  const SMSCodeRegex = /^\d{6}$/;
  return SMSCodeTypeChecker({ SMSCode }) && SMSCodeRegex.test(SMSCode)
}