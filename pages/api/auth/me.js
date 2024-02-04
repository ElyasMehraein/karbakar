import { phoneNumberCheck, smsCodeCheck } from "@/controllers/Validator"

const num = "09305845526"
const num2 = 584552

const handler = (req, res) => {
    res.json("jay dorosti")
    console.log(phoneNumberCheck(num))
    console.log(smsCodeCheck(num2))

}
export default handler
