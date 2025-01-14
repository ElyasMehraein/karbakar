import connectToDB from "@/configs/db";
import BusinessModel from "@/models/Business";
import GuildModel from "@/models/Guild";


export async function GET(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const businessID = searchParams.get("businessID");

        if (!businessID) {
            return Response.json(
                { message: 'business ID is required' },
                { status: 400 }
            );
        }

        const business = await BusinessModel.findById(businessID).populate('demandsForGuilds.guild');

        return Response.json(
            { message: 'get businesses successfully', data: business.demandsForGuilds },
            { status: 200 }
        );
    } catch (error) {
        console.error(`Error get businesses`, error);
        return Response.json(
            { message: `Error get businesses`, error },
            { status: 500 })
    }
}