import UserModel from "@/appBox/models/User"
import connectToDb from "@/configs/db"
import { createHash } from "crypto";
import { SMSOtpvalidator } from "@/controllers/smsotp.js"
import jwt from "jsonwebtoken";
import { phoneFormatCheck, SMSFormatCheck } from "@/controllers/Validator"


export async function POST(req, res) {

    try {
        connectToDb()
        const body = await req.json()
        const { phone, SMSCode } = body;

        //Validate Entrance 
        //uncomment after development
        // if (!phone.trim() || !SMSCode.trim()) {
        //     return Response.json({ message: "Entrance data is empty!" },{status:402})
        // }
        // console.log("Entrance data is not empty");


        //uncomment after development

        // if (!phoneFormatCheck(phone) || !SMSFormatCheck(SMSCode)) {
        //     return Response.json({ message: "Entrance data is not valid!" },{status:402})
        // }
        // console.log("phone number and smmcode format validate successfully");


        // const isOtpSMSValid = await SMSOtpvalidator(phone, SMSCode)
        // if (!isOtpSMSValid) {
        //     console.log(res.status);
        //     return Response.json({ message: "SMS Code is not valid" },{status:406})
        // }


        const phoneHash = createHash("sha256").update(phone).digest("hex");



        let user = await UserModel.findOne({ phoneHash })
        if (!user) {
            let nextUserNumber = (await UserModel.countDocuments()) + 1000;
            user = await UserModel.create({
                phoneHash,
                code: nextUserNumber,
                userName: "",
                avatar: "",
                header: "",
                bio: "",
                explain: "",
                phone: "",
                email: "",
                personalPage: "",
                instagram: "",
                // businesses:"",
                primeJob: "",

            })
            console.log("user created successfully", user);
            user = user
        }
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30 day" });
        return Response.json({ accessToken, message: "user token created successfully" }, { status: 201, headers: { 'Set-Cookie': `token: accessToken` } }, {
            httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 30
        })

    } catch (err) {
        return Response.json({ message: "server error" },{ status: 500 })
    }
}