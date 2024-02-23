import { sendSMS } from "@/controllers/smsotp"
export default function sendsmsotp(req, res) {
    if (req.method === "POST") {
        const { phone } = req.body
        sendSMS(phone)
        return res.status(200).json("otpSms sent")

    } else { res.status(200).json({ message: 'request method must be "POST"' }) }

}
