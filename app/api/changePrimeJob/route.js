import BusinessModel from "@/models/Business"
import connectToDB from "@/configs/db"
import { verifyToken } from "@/controllers/auth";
import UserModel from '@/models/User';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
import { GET } from "@/app/api/auth/me/route"

export async function POST(req) {

    try {
        const body = await req.json()
        connectToDB()
        const response = await GET(req)
        const user = await response.json()
        let business = await BusinessModel.findOne({ _id: body })
        // console.log("api", body);
        if (!business) {
            return Response.json({ message: "business is not exist" }, { status: 404 })
        }
        if (user.primeJob === business._id) {
            return Response.json({ message: "selected business is your current primeJob" }, { status: 406 })
        }
        const areYouWorkHere = business.workers.some((worker) => worker = user._id)
        if (!areYouWorkHere) {
            return Response.json({ message: "You are not an employee of this business" }, { status: 403 })
        }

        await UserModel.findByIdAndUpdate(user._id, { primeJob: business._id }, { new: true })
        return Response.json({ message: "changing primeJob is done successfully" }, { status: 201 })

    } catch (err) {
        console.error("errror", err);
        return Response.json({ message: "server error" }, { status: 500 })
    }
}