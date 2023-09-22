import userModel from "../../models/user.js"
import registerValidator from "../../validators/register.js"
import {createHash} from "crypto"
import jwt from 'jsonwebtoken'

const sign = async (req, res) => {
    
    const validationResult = registerValidator(req.body)
    console.log("message is here=> ",validationResult);
    if (validationResult != true) {
        return res.status(422).json(validationResult)
    }
    const { phone, smsCode } = req.body

    const phoneHash = createHash("sha256").update(phone).digest("hex")
    const isPhoneHashExist = await userModel.findOne({phoneHash})

    if (isPhoneHashExist) { // if true then the login process will proceed 
        return res.status(201).json({
            message: "کد تایید از طریق پیامک ارسال می شود"
        })
    }

    // register continuous 
    let nextUserNumber = await userModel.count() + 1000

    if (isPhoneHashExist) {
    }
    const user = await userModel.create({
        phoneHash,
        code: nextUserNumber
    })

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30 day"
    })

    return res.status(201).json({ user, accessToken })

}


const login = async (req, res) => { }

const getMe = async (req, res) => { }

export default {sign, login, getMe}