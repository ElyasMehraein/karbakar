import UserModel from "@/models/User"
import connectToDb from "@/configs/db"
// import { codeValidate, phoneValidate, phoneNumberCheck } from "../../../backend/validators/register"

const handler = async (req, res) => {

    if (req.method !== "POST") {
        res.status(200).json({ name: 'post nist' })
    } else {

        try {
            console.log("omadam");
            connectToDb()
            console.log("yesksks");
            //validation
            const { smsCode, phoneHash } = req.body;
            console.log("shod",req.body);

            // if (!smsCode.trime() || !phoneHash.trime()) {
            //     console.log("nist");
            //     return res.status(402).json({ message: "data is not valid!" })
            // }

            //is User Exist?
            //Hash Phone Number
            //Generate Token
            //Create User
            await UserModel.create({ smsCode, phoneHash })
            return res.status(201).json({ message: "user created successfully" })

        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "server error" })
        }
    }
}
export default handler