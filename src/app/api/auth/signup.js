"use server"
import connectToDb from "../../../../db"
import { codeValidate, phoneValidate, phoneNumberCheck } from "../validators/register"
import userModel from "@/models/User"

const handler = async (req, res) => {
    res.json("hellllll")
    console.log("yesksks");
    if (req.methood !== "POST") {
        return false
    }
    try {
        connectToDb()
        //validation
        const { code, phoneHash } = req.body
        if (!code.trime() || !phoneHash.trime()) {
            return res.status(402).json({ message: "data is not valid!" })
        }

        //is User Exist?
        //Hash Phone Number
        //Generate Token
        //Create User
        await userModel.create({ code, phoneHash })
        return res.status(201).json({ message: "user created successfully" })

    } catch (err) {
        return res.status(500).json({ message: err })
    }
}
export default handler