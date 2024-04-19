import connectToDB from "@/configs/db";
import BusinessModel from "@/models/Business"
import UserModel from '@/models/User';

export async function POST(req) {
    connectToDB()
    const body = await req.json()
    const { userCodeOrBusinessBrand } = body
    try {
        if (isNaN(userCodeOrBusinessBrand)) {
            let business = await BusinessModel.findOne({ businessName: userCodeOrBusinessBrand })
            const isHeader = business.isHeader
            return Response.json({ message: 'business Header exist', isHeader }, { status: 200 }, { isHeader })
        } else {
            let user = await UserModel.findOne({ code: userCodeOrBusinessBrand })
            const isHeader = user.isHeader
            return Response.json({ message: 'business Header exist', isHeader }, { status: 200 })
        }
    } catch (err) {
        return Response.json({ message: 'server error' }, { status: 500 })
    }

}