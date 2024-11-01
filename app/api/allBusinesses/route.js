import connectToDB from "@/configs/db";
import BusinessModel from "@/models/Business";
import GuildModel from "@/models/Guild";


export async function GET(req) {
    try {
        await connectToDB();
        const businesses = JSON.parse(JSON.stringify(await BusinessModel.find({},
            "businessName bio businessBrand isAvatar longitude latitude"
        )));


        return Response.json(
            { message: 'get businesses successfully', data: businesses },
            { status: 200 }
        );
    } catch (error) {
        console.error(`Error get businesses`, error);
        return Response.json(
            { message: `Error get businesses`, error },
            { status: 500 })
    }
}