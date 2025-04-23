import { sendSMS } from '@/controllers/smsotp';

interface SMSRequestBody {
  phone: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const { phone }: SMSRequestBody = await req.json();
    await sendSMS(phone);
    return Response.json({ message: 'sms sent' }, { status: 200 });
  } catch {
    return Response.json({ message: 'smsotp error' }, { status: 500 });
  }
}
