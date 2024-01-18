import UserModel from "@/models/User"
import connectToDb from "@/configs/db"
// import { codeValidate, phoneValidate, phoneNumberCheck } from "../../../backend/validators/register"

const handler = async (req, res) => {
    // res.json("hellllll")
    // console.log("yesksks");
    if (req.method !== "POST") {
        res.status(200).json({ name: 'post nist' })
    }
    try {
        connectToDb()
        console.log("yesksks");
        //validation
        const { code, phoneHash } = req.body
        if (!code.trime() || !phoneHash.trime()) {
            return res.status(402).json({ message: "data is not valid!" })
        }

        //is User Exist?
        //Hash Phone Number
        //Generate Token
        //Create User
        await UserModel.create({ code, phoneHash })
        return res.status(201).json({ message: "user created successfully" })

    } catch (err) {
        return res.status(500).json({ message: err })
    }
}
export default handler