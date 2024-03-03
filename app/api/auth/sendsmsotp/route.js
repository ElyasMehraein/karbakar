import { sendSMS } from "@/controllers/smsotp"

export function POST(req, res) {
    try {
        const { phone } = req.body
        sendSMS(phone)
        return Response.json({ message: 'sms sent' }, { status: 200 })
    } catch (err) { Response.json({ message: 'smsotp error', smsotp }, { status: 500 }) }

}
