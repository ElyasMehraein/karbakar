import connectToDB from '@/configs/db'
import { cookies } from "next/headers";
import { verifyToken } from "@/controllers/auth";
import { notFound } from 'next/navigation'
import BusinessModel from '@/models/Business'
import { redirect } from 'next/navigation'
import UserModel from '@/models/User'
import ReportModel from '@/models/Report';


export async function GET(req, res) {
    try {
        const token = cookies().get("token")?.value;
        const tokenPayLoad = verifyToken(token);

        if (!tokenPayLoad) {
            redirect("/w");
        }

        connectToDB()
        const logedUser = JSON.parse(JSON.stringify(await UserModel.findOne(
            { _id: tokenPayLoad.id },
        )))

        const reports = await ReportModel.find({
            $or: [
              { recepiant: logedUser._id },
              {
                business: { $in: logedUser.businesses } ,
              }
            ]
          }).populate("business").populate("bill").populate("recepiant");
          
    return Response.json(
        { message: 'get reports successfully', data: reports },
        { status: 200 }
    );
} catch (error) {
    console.error(`Error get reports`, error);
    Response.json(
        { message: `Error get reports`, error },
        { status: 500 })
}

}

