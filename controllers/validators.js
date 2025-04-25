import Joi from 'joi'

export function phoneFormatCheck(phoneNo) {
  const phoneSchema = Joi.string()
    .length(11)
    .pattern(/^09\d{9}$/)
    .required()
  const { error } = phoneSchema.validate(phoneNo)
  return !error
}

export function SMSFormatCheck(SMSCode) {
  const smsSchema = Joi.string()
    .length(6)
    .pattern(/^\d{6}$/)
    .required()
  const { error } = smsSchema.validate(SMSCode)
  return !error
}
