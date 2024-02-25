import BusinessModel from "@/models/Business"
import connectToDB from "@/configs/db"
import { verifyToken } from "@/controllers/auth";
import UserModel from '@/models/User';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

export async function POST(req) {

    try {

        const body = await req.json()
        const { businessName } = body;

        if (!businessName.trim()) {
            return Response.json({ message: "Entrance data is empty!" }, { status: 402 })
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
                brand: "",
                header: "",
                bio: "",
                explain: "",
                phone: "",
                email: "",
                personalPage: "",
                instagram: "",
                latitude: "",
                longitude: "",
                agentCode: user.code,
                workers: [user._id]

            })
            business = business
            await UserModel.findByIdAndUpdate(user._id,{$push:{businesses: business._id}})
            return Response.json({ message: "business created successfully" }, { status: 201 })
        } else {
            return Response.json({ message: "business already exist" }, { status: 409 })

        }

    } catch (err) {
        return Response.json({ message: "server error" }, { status: 500 })
    }
}