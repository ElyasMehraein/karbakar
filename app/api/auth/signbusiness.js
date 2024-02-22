import BusinessModel from "@/appBox/models/Business"
import connectToDb from "@/configs/db"
import { createHash } from "crypto";
import { SMSOtpvalidator } from "@/controllers/smsotp.js"
import jwt from "jsonwebtoken";
import { phoneFormatCheck, SMSFormatCheck } from "@/controllers/Validator"
import { serialize } from "cookie";


const signbusiness = async (req, res) => {

    if (req.method !== "POST") {
        res.status(200).json({ message: 'request method must be "POST"' })
    }

    try {
        connectToDb()
        const { businessName } = req.body;

        //Validate Entrance 
        //uncomment after development
        // if (!phone.trim() || !SMSCode.trim()) {
        //     return res.status(402).json({ message: "Entrance data is empty!" })
        // }
        // console.log("Entrance data is not empty");


        //uncomment after development

        // if (!phoneFormatCheck(phone) || !SMSFormatCheck(SMSCode)) {
        //     return res.status(402).json({ message: "Entrance data is not valid!" })
        // }
        // console.log("phone number and smmcode format validate successfully");


        // const isOtpSMSValid = await SMSOtpvalidator(phone, SMSCode)
        // if (!isOtpSMSValid) {
        //     console.log(res.status);
        //     return res.status(406).json("SMS Code is not valid");
        // }


        // const phoneHash = createHash("sha256").update(phone).digest("hex");
        // console.log("from signup=> ", phoneHash);



        let business = await BusinessModel.findOne({ businessName })
        if (!business) {
            business = await BusinessModel.create({
                businessName:businessName,
                avatar:"",
                header:"",            
                bio : "یه فروشگاه متفاوت ",
                explain:"از این فروشگاه معمولی ها نیستیم ما متفاوتیم چون مشتری های ما متفاوتن چون اجناس ما متفاوتن",
                phone:"091212121",
                email:"elnaz@gmail.com",
                personalPage:"elnaz.com",
                instagram:"elnazinsta",
                latitude:"50",
                longitude : "20",
                agentCode:"",
                workers:[{1001:"مدیر بازرگانی"},{1002:"مدیر بازرگانی"}]

            })
            console.log("business created successfully");
            return res.status(201).json({ message: "from signbusiness=> ", business })
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "server error" })
    }
}

export default signbusiness