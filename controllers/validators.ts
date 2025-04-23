import Joi from 'joi';

export function phoneFormatCheck(phoneNo: string): boolean {
  const phoneSchema = Joi.string()
    .length(11)
    .pattern(/^09\d{9}$/)
    .required();
  const { error } = phoneSchema.validate(phoneNo);
  return !error;
}

export function SMSFormatCheck(SMSCode: string): boolean {
  const smsSchema = Joi.string()
    .length(6)
    .pattern(/^\d{6}$/)
    .required();
  const { error } = smsSchema.validate(SMSCode);
  return !error;
}
