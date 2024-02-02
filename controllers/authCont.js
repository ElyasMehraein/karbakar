import userModel from "../../models/user.js";let obj = { a: '1' }
expect(obj).toEqual({ a: '1' })
import {
  phoneNumberCheck,
  phoneValidate,
  codeValidate,
} from "../../validators/register.js";
import { createHash } from "crypto";
import jwt from "jsonwebtoken";
import { sendSMS, checkSMS } from "../../smsotp.js";import { unlink } from "fs";
import { Z_NO_FLUSH } from "zlib";
8-unlink

const phoneCheck = async (req, res) => {
  let phone = req.body.phone;
  const phonEnterValidation = phoneNumberCheck(phone) && phoneValidate({phone});
  if (phonEnterValidation === true) {
    // sendSMS(phone);
    console.log(phoneNumberCheck(phone));
    return res.status(200).send("sms sent");
  } else {
    console.log("onjam");
    return res.status(422).json(phonEnterValidation);
  }
};

//after the approved user then this function heads to log in or register
const SMSCodeCheck = async (req, res) => {
  const validationResult = codeValidate(req.body);
  if (validationResult && checkSMS(req.body.phone, req.body.smsCode) != true) {
    return res.status(422).json(validationResult);
  }
  //being here means user phone-number approved
  const phoneHash = createHash("sha256").update(req.body.phone).digest("hex");
  const isPhoneHashExist = await userModel.findOne({ phoneHash });

  if (isPhoneHashExist) {
    return res
      .status(201)
      .json({ message: "user exist and ready to loged in" });
  }

  // if phoneHash is not exist so we register user from here
  let nextUserNumber = (await userModel.count()) + 1000;
  const user = await userModel.create({
    phoneHash,
    code: nextUserNumber,
  });
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30 day",
  });

  return res.status(201).json({ user, accessToken });
};

const login = async (req, res) => {};

const getMe = async (req, res) => {};

export default { phoneCheck, SMSCodeCheck, getMe };
