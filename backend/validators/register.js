import Validator from "fastest-validator";

const v = new Validator();

const smsSchema = {
  phone: { type: "string", length: 11 },
  $$strict: true,
};
const smsCheck = v.compile(smsSchema);



const phoneSchema = {
  phone: { type: "string", length: 11 },
  smsCode: { type: "string", length: 6 },
  $$strict: true,
};
const phoneCheck = v.compile(phoneSchema);

export { smsCheck, phoneCheck };
