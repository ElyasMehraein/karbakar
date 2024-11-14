import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import BusinessModel from "@/models/Business";
import ProductModel from "@/models/Product";
import { GET } from "@/app/api/auth/me/route";
import GuildModel from "@/models/Guild";

export async function PUT(req) {
    try {
        const body = await req.json();
        const { businessID, selectedGuild, requestText, jobCategory } = body;
        console.log(" businessID, selectedGuild, requestText, jobCategory", businessID, selectedGuild, requestText, jobCategory);
        await connectToDB();

        // Get logged-in user information
        const response = await GET(req);
        const user = await response.json();
        const loggedUser = await UserModel.findOne({ code: user.code });

        if (!loggedUser) {
            return Response.json({ message: "Please log in first" }, { status: 404 });
        }

        // Verify user permissions to modify the business
        const business = await BusinessModel.findById(businessID);


        if (!selectedGuild) {
            return Response.json({ message: "no guild selected" }, { status: 400 });
        }
        // hame betonan senf doros konan vase business
        // bayad negah kone che senf haee vojod dare
        // vaghti type kard senf nabod chizi ke type mikone tabdil be senf beshe
        // badesh ba id senf toye business gharar begire

        let guild;
        const isGuildExist = await GuildModel.findOne({ guildName: selectedGuild })
        if (isGuildExist) {
            guild = isGuildExist
        } else {
            newGuild = await GuildModel.create({
                guildName: selectedGuild,
                jobCategory,
            });
            guild = newGuild
        }

        const existingDemand = business.demandsForGuilds.some((demand) => {
            demand._id.toString() === guild._id.toString()
        });

        if (!existingDemand) {
            await BusinessModel.findByIdAndUpdate(
                businessID,
                {
                    $addToSet: {
                        demandsForGuilds: {
                            guild: guild._id,
                            requestText,
                        },
                    },
                },
                { new: true }
            );
        } else {
            return Response.json({ message: "demand already exist" }, { status: 406 });

        }
        return Response.json({ message: "Business successfully updated" }, { status: 201 });

    } catch (err) {
        console.error(err);
        return Response.json({ message: "Server error" }, { status: 500 });
    }
}
