import Validator from "fastest-validator";

const  phoneNumberCheck = (phoneNumber)=>{
  const phoneNumberRegex = /^09\d{9}$/;
  return phoneNumberRegex.test(phoneNumber)
}


const v = new Validator();

const phoneSchema = {
  phone: { type: "string", length: 11 },
  $$strict: true,
};
const phoneValidate = v.compile(phoneSchema);



const smsSchema = {
  phone: { type: "string", length: 11 },
  smsCode: { type: "string", length: 6 },
  $$strict: true,
};
const codeValidate = v.compile(smsSchema);

export { codeValidate, phoneValidate ,phoneNumberCheck};
