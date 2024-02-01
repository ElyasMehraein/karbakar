import Validator from "fastest-validator";
const v = new Validator();

export function phoneNumberCheck(phoneNo) {
  const phoneNumberRegex = /^09\d{9}$/;
  const phoneSchema = {
    phone: { type: "string", length: 11 },
    $$strict: true,
  };
  return phoneNumberRegex.test(phoneNo) && v.compile(phoneSchema);
}

export function smsCodeCheck(smsode) {
  const codeRegex = /^\d{6}$/;
  const smsSchema = {
    smsCode: { type: "string", length: 6 },
    $$strict: true,
  };
  return codeRegex.test(smscode) && v.compile(smsSchema);
}