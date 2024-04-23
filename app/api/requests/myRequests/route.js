import connectToDB from '@/configs/db'
import { cookies } from "next/headers";
import UserModel from '@/models/User'
import RequestModel from '@/models/Request';
import BusinessModel from '@/models/Business'
import { verifyToken } from "@/controllers/auth";
import { createHash } from "crypto";

export async function GET(req, res) {
    const token = cookies().get("token")?.value;
    const tokenPayLoad = verifyToken(token);

    if (!tokenPayLoad) {
        Response.json(
            { message: "no logged user" },
            { status: 403 })
    }
    try {

        connectToDB()
        const logedUser = tokenPayLoad && await UserModel.findOne({ _id: tokenPayLoad.id }).populate("businesses")
        if (!logedUser) {
            Response.json(
                { message: "no logged user" },
                { status: 403 })
        }
        const uniqCode = createHash("sha256").update(logedUser._id + process.env.PAPER).digest("hex");
        const requests = await RequestModel.find({ uniqCode }).populate("acceptedBy").sort({ createdAt: -1 })

        return Response.json({ message: 'get Requests as user info successfully', data: requests }, { status: 200 });
    } catch (error) {
        console.error(`Error get reports`, error);
        Response.json(
            { message: `Error get reports`, error },
            { status: 500 })
    }
}



