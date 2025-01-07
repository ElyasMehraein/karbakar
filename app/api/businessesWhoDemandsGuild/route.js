import connectToDB from "@/configs/db";
import BusinessModel from "@/models/Business";
import GuildModel from "@/models/Guild";


export async function GET(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const guildID = searchParams.get("guildID");

        if (!guildID) {
            return Response.json(
                { message: 'guild ID is required' },
                { status: 400 }
            );
        }

        const businesses = await BusinessModel.find({
            demandsForGuilds: { $elemMatch: { guild: guildID } }
        });

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