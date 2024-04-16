// i want to get all request 

//all requests based on your primeJob guild filter by nearest first
// agar locatio
import connectToDB from '@/configs/db'
import { cookies } from "next/headers";
import { verifyToken } from "@/controllers/auth";
import { notFound } from 'next/navigation'
import BusinessModel from '@/models/Business'
import { redirect } from 'next/navigation'
import UserModel from '@/models/User'
import RequestModel from '@/models/Request';

export async function GET(req, res) {
    try {
        const token = cookies().get("token")?.value;
        const tokenPayLoad = verifyToken(token);

        if (!tokenPayLoad) { console.log("no logged user") }

        connectToDB()
        const logedUser = tokenPayLoad && await UserModel.findOne(
            { _id: tokenPayLoad.id },
        ).populate("businesses")

        const userBusinessesID = logedUser.businesses.map((business) => business._id)
        console.log("userBusinessesID", userBusinessesID);

        const Requests = logedUser ?
            await RequestModel.find({
                requesterBusiness: { $nin:userBusinessesID}
            }).populate("requesterBusiness")
            :
            await RequestModel.find({}, "title message guild acceptedBy");




        console.log("Requests", Requests);
        return Response.json(
            {
                message: 'get Requests successfully',
                data: Requests
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(`Error get reports`, error);
        Response.json(
            { message: `Error get reports`, error },
            { status: 500 })
    }

}

