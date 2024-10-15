import connectToDB from '@/configs/db'
import { cookies } from "next/headers";
import { verifyToken } from "@/controllers/auth";
import { notFound } from 'next/navigation'
import BusinessModel from '@/models/Business'
import { redirect } from 'next/navigation'
import UserModel from '@/models/User'
import ReportModel from '@/models/Report';


export async function GET(req, res) {


    if (!cookies().get("token")) {

        return Response.json(
            { message: "only users can get reports" },
            { status: 403 })
    }

    const token = cookies().get("token")?.value;
    const tokenPayLoad = verifyToken(token);
    try {

        connectToDB()
        const logedUser = JSON.parse(JSON.stringify(await UserModel.findOne(
            { _id: tokenPayLoad.id },
        )))
            // console.log("logedUserlogedUser", logedUser);
        const reports = await ReportModel.find(
                { recepiant: logedUser._id }
        ).populate("business").populate("bill").populate("recepiant");
        console.log("reportsreports", reports);
        return Response.json(
            { message: 'get reports successfully', data: reports },
            { status: 200 }
        );
    } catch (error) {
        console.error(`Error get reports`, error);
        return Response.json(
            { message: `Error get reports`, error },
            { status: 500 })
    }

}

