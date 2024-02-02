import UserModel from "@/models/User"
import connectToDb from "@/configs/db"
import { createHash } from "crypto";

import { phoneNumberCheck, smsCodeCheck } from "@/controllers/Validator"
const signup = async (req, res) => {

    if (req.method !== "POST") {
        res.status(200).json({ message: 'request method must be "POST"' })
    }

    try {
        connectToDb()
        const { phone, SMSCode } = req.body;
        console.log(phone, SMSCode);
        //Validate Entrance
        if (!phone.trim() || !SMSCode.trim() ) {
            return res.status(402).json({ message: "Entrance data is empty!" })
        }
        console.log("Entrance data is not empty");

        // if (phoneNumberCheck(phone) || smsCodeCheck(SMSCode)) {
        //     return res.status(402).json({ message: "Entrance data is not valid!" })
        // }
        console.log(phoneNumberCheck(phone));
        console.log(smsCodeCheck(SMSCode));
        console.log("validate successfully");


        const phoneHash = createHash("sha256").update(phone).digest("hex");
        console.log(phoneHash);
        const isUserExist = await UserModel.findOne({
            $or: [{ phoneHash: phone }]
        })
        if (isUserExist) {
            return res.status(422).json({ message: "phone number is alrealy exist!" })

        }
        //is User Exist?
        // const isUserExist 
        //Hash Phone Number
        //Generate Token
        //Create User
        await UserModel.create({ phoneHash, SMSCode })
        console.log("user created successfully");
        return res.status(201).json({ message: "user created successfully" })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "server error" })
    }
}

export default signup