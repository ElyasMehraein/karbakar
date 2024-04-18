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
            const isAvatar = business.isAvatar
            console.log("BusinessModelisAvatar", isAvatar);
            return Response.json({ message: 'business Avatar exist' }, { status: 200 }, { isAvatar })
        } else {
            let user = await UserModel.findOne({ code: userCodeOrBusinessBrand })
            const isAvatar = user.isAvatar
            console.log("UserModelisAvatar", isAvatar);
            return Response.json({ message: 'business Avatar exist', isAvatar }, { status: 200 })
        }
    } catch (err) {
        return Response.json({ message: 'smsotp error' }, { status: 500 })
    }

}