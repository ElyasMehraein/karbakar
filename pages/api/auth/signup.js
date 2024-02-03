import UserModel from "@/models/User"
import connectToDb from "@/configs/db"
import { createHash } from "crypto";
import { SMSOtpvalidator } from "@/controllers/smsotp.js"
import jwt from "jsonwebtoken";
import { phoneFormatCheck, SMSFormatCheck } from "@/controllers/Validator"
import { serialize } from "cookie";


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



        if (!phoneFormatCheck(phone) || !SMSFormatCheck(SMSCode)) {
            return res.status(402).json({ message: "Entrance data is not valid!" })
        }
        console.log("phone number and smmcode format validate successfully");


        const isOtpSMSValid = await SMSOtpvalidator(phone, SMSCode)
        if (!isOtpSMSValid) {
            return res.status(422).json("SMS Code is not valid");
        }


        const phoneHash = createHash("sha256").update(phone).digest("hex");
        console.log(phoneHash);



        const isUserExist = await UserModel.findOne({ $or: [{ phoneHash }] })
        if (isUserExist) { return res.status(422).json({ message: "phone number is alrealy exist!" }) }


        let nextUserNumber = (await UserModel.countDocuments()) + 1000;


        const user = await UserModel.create({ phoneHash, code: nextUserNumber })
        console.log("user created successfully");

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30 day" });

        return res.setHeader('Set-Cookie', serialize('token', accessToken, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 30 })).status(201).json({ accessToken, message: "user created successfully" });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "server error" })
    }
}

export default signup