import BusinessModel from "@/models/Business"
import connectToDB from "@/configs/db"
import { verifyToken } from "@/controllers/auth";
import UserModel from '@/models/User';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
import {GET} from "@/app/api/auth/me/route"

export async function POST(req) {
    console.log("usereeeer ");

    try {
        const user = async () => {
            const response = await GET(req)

            console.log("usereeeer", response);
        };
        console.log("usereeeer out", user());

    //     const body = await req.json()
    //     const { selectedBusiness, customerCode, bills } = body;

        // if (!businessName.trim()) {
        //     return Response.json({ message: "Entrance data is empty!" }, { status: 402 })
        // }

        // let business = await BusinessModel.findOne({ businessName: selectedBusiness })
        // if (!business) {
        //     const token = cookies().get("token")?.value;
        //     const tokenPayLoad = verifyToken(token);

        //     if (!tokenPayLoad) {
        //         return redirect("/welcome");
        //     }
        //     connectToDB()
        //     const user = JSON.parse(JSON.stringify(await UserModel.findOne(
        //         { _id: tokenPayLoad.id },
        //         "code"
        //     )))

        //     business = await BusinessModel.create({
        //         businessName: businessName,
        //         businessBrand: "",
        //         brand: true,
        //         header: true,
        //         bio: "",
        //         explain: "",
        //         phone: "",
        //         email: "",
        //         personalPage: "",
        //         instagram: "",
        //         latitude: "",
        //         longitude: "",
        //         agentCode: user.code,
        //         workers: [user._id],
        //         guildname: "تعمیر خودرو",
        //         products: [
        //             // { productName: "havij", unitOfMeasurement: "kg" }, { productName: "sib", unitOfMeasurement: "kg" }
        //         ]
        //     })
        //     business = business
        //     await UserModel.findByIdAndUpdate(user._id, { $push: { businesses: business._id } })
        return Response.json({ message: "business created successfully" }, { status: 201 })
        // } else {
        //     return Response.json({ message: "business already exist" }, { status: 409 })

        // }

    } catch (err) {
        return Response.json({ message: "server error" }, { status: 500 })
    }
}