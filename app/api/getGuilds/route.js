import connectToDB from "@/configs/db";
import BusinessModel from "@/models/Business";
import GuildModel from "@/models/Guild";


export async function GET(req) {
    try {
        await connectToDB();
        const guilds = JSON.parse(JSON.stringify(await GuildModel.find({},
          "guildName products jobCategory"
        )));


        return Response.json(
            { message: 'get guilds successfully', data: guilds },
            { status: 200 }
        );
    } catch (error) {
        console.error(`Error get guilds`, error);
        return Response.json(
            { message: `Error get guilds`, error },
            { status: 500 })
    }
}