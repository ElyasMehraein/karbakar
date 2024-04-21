import connectToDB from '@/configs/db'
import { cookies } from "next/headers";
import { verifyToken } from "@/controllers/auth";
import { notFound } from 'next/navigation'
import BusinessModel from '@/models/Business'
import { redirect } from 'next/navigation'
import UserModel from '@/models/User'
import RequestModel from '@/models/Request';

export async function GET(req, res) {
    const token = cookies().get("token")?.value;
    const tokenPayLoad = verifyToken(token);
    try {

        if (!tokenPayLoad) { console.log("no logged user") }

        connectToDB()
        const logedUser = tokenPayLoad && await UserModel.findOne(
            { _id: tokenPayLoad.id },
        ).populate("businesses")

        let requests;
        
        if (logedUser) {
            const userBusinessesID = logedUser.businesses.map((business) => business._id)
            requests = await RequestModel.find({
                requesterBusiness: { $nin: userBusinessesID }
            }).populate("requesterBusiness")
            return Response.json({ message: 'get Requests as user info successfully', data: requests }, { status: 200 });
        } else {
            requests = await RequestModel.find({}, "title message guild acceptedBy");
            return Response.json({ message: 'get Requests for guests successfully', data: requests }, { status: 200 });
        }
    } catch (error) {
        console.error(`Error get reports`, error);
        Response.json(
            { message: `Error get reports`, error },
            { status: 500 })
    }

}

