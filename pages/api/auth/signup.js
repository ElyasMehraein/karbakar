import UserModel from "@/models/User"
import connectToDb from "@/configs/db"
import { createHash } from "crypto";
import { sendSMS, checkSMS } from "@/controllers/smsotp.js"

import { phoneNumberCheck, SMSCodeCheck } from "@/controllers/Validator"
const signup = async (req, res) => {

    if (req.method !== "POST") {
        res.status(200).json({ message: 'request method must be "POST"' })
    }

    try {
        connectToDb()
        const { phone, SMSCode } = req.body;
        console.log(phone, SMSCode);
        //Validate Entrance
        if (!phone.trim() || !SMSCode.trim()) {
            return res.status(402).json({ message: "Entrance data is empty!" })
        }
        console.log("Entrance data is not empty");

        if (!phoneNumberCheck(phone) || !SMSCodeCheck(SMSCode)) {
            return res.status(402).json({ message: "Entrance data is not valid!" })
        }
        console.log(checkSMS(phone, SMSCode));
        console.log("phone number and smmcode format validate successfully");
        if (!checkSMS(phone, SMSCode)) {
            return res.status(422).json("sms otp error");
        }
        const phoneHash = createHash("sha256").update(phone).digest("hex");
        console.log(phoneHash);
        const isUserExist = await UserModel.findOne({
            $or: [{ phoneHash }]
        })
        if (isUserExist) {
            return res.status(422).json({ message: "phone number is alrealy exist!" })

        }
        //is User Exist?
        // const isUserExist 
        //Hash Phone Number
        //Generate Token
        //Create User
        let nextUserNumber = (await UserModel.countDocuments()) + 1000;

        await UserModel.create({ phoneHash, code: nextUserNumber })
        console.log("user created successfully");
        return res.status(201).json({ message: "user created successfully" })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "server error" })
    }
}

export default signup