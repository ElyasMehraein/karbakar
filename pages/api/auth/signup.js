import UserModel from "@/models/User"
import connectToDb from "@/configs/db"
// import { codeValidate, phoneValidate, phoneNumberCheck } from "../../../backend/validators/register"

const handler = async (req, res) => {

    if (req.method !== "POST") {
        res.status(200).json({ name: 'post nist' })
    } else {

        try {
            connectToDb()
            const { smsCode, phoneHash } = req.body;
            console.log(req.body,"resived");
            //validation
            if (!smsCode.trim() || !phoneHash.trim()) {
                return res.status(402).json({ message: "data is not valid!" })
            }
            console.log("validate successfully");

            //is User Exist?
            // const isUserExist 
            //Hash Phone Number
            //Generate Token
            //Create User
            await UserModel.create({ smsCode, phoneHash })
            console.log("user created successfully");
            return res.status(201).json({ message: "user created successfully" })

        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "server error" })
        }
    }
}
export default handler