import BusinessModel from "@/models/Business"
import connectToDB from "@/configs/db"
import { verifyToken } from "@/controllers/auth";
import UserModel from '@/models/User';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

export async function POST(req) {

    try {

        const body = await req.json()
        const { businessName, guildname } = body;
        if (!businessName.trim() || !guildname.trim()) {
            return Response.json({ message: "Entrance data is empty!" }, { status: 400 })
        }
        const englishLetters = /^[A-Za-z]+$/;
        if (!businessName.match(englishLetters)) {
            return Response.json({ message: "Business name must only contain English letters!" }, { status: 406 })
        }

        let business = await BusinessModel.findOne({ businessName })
        if (!business) {
            const token = cookies().get("token")?.value;
            const tokenPayLoad = verifyToken(token);

            if (!tokenPayLoad) {
                return redirect("/welcome");
            }
            connectToDB()
            const user = JSON.parse(JSON.stringify(await UserModel.findOne(
                { _id: tokenPayLoad.id },
                "code"
            )))

            business = await BusinessModel.create({
                businessName: businessName,
                businessBrand: "",
                bio: "",
                explain: "",
                phone: "",
                email: "",
                personalPage: "",
                instagram: "",
                longitude: "",
                latitude: "",
                mapDetail: "",
                agentCode: user.code,
                workers: [user._id],
                guildname: guildname,
                products: []
            })
            business = business
            await UserModel.findByIdAndUpdate(user._id, { $push: { businesses: business._id } })
            return Response.json({ message: "business created successfully" }, { status: 201 })
        } else {
            return Response.json({ message: "business already exist" }, { status: 409 })

        }

    } catch (err) {
        return Response.json({ message: "server error" }, { status: 500 })
    }
}