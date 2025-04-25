import { sendSMS } from '@/controllers/smsotp'

export async function POST(req, res) {
  try {
    const phone = await req.json()
    sendSMS(phone)
    return Response.json({ message: 'sms sent' }, { status: 200 })
  } catch (err) {
    return Response.json({ message: 'smsotp error' }, { status: 500 })
  }
}
