import connectToDB from "@/configs/db";
import BusinessModel from "@/models/Business";
import GuildModel from "@/models/Guild";
import UnionModel from "@/models/Union";


export async function GET(req) {
    try {
        await connectToDB();
        const unions = JSON.parse(JSON.stringify(await UnionModel.find()));

        console.log("unions", unions);
        return Response.json(
            { message: 'get unions successfully', data: unions },
            { status: 200 }
        );
    } catch (error) {
        console.error(`Error get unions`, error);
        return Response.json(
            { message: `Error get unions`, error },
            { status: 500 })
    }
}