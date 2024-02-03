import { sendSMS } from "@/controllers/smsotp"
export default function sendsmsotp(req, res) {
    const { phone } = req.body
    sendSMS(phone)
    return res.status(200).json("sms otp sent")
}
