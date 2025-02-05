import connectToDB from "@/configs/db";
import BusinessModel from "@/models/Business";
import GuildModel from "@/models/Guild";

export async function GET(req) {
    try {
        await connectToDB();

        const businesses = await BusinessModel.find({
            demandsForGuilds: { $exists: true, $not: { $size: 0 } }
        }).populate({
            path: 'guild', // دریافت اطلاعات کامل گیلد
            select: 'guildName jobCategory'
        });

        // گروه‌بندی کسب‌وکارها بر اساس گیلد
        const groupedByGuild = {};

        businesses.forEach(business => {
            const guild = business.guild;
            if (!guild) return; // بررسی اینکه آیا گیلد موجود است

            const guildId = guild._id.toString();

            if (!groupedByGuild[guildId]) {
                groupedByGuild[guildId] = {
                    guildName: guild.guildName,
                    jobCategory: guild.jobCategory, // اضافه کردن دسته‌بندی گیلد
                    businesses: []
                };
            }

            groupedByGuild[guildId].businesses.push(business);
        });

        return Response.json(
            { message: "get businesses successfully", data: Object.values(groupedByGuild) },
            { status: 200 }
        );
    } catch (error) {
        console.error(`Error get businesses`, error);
        return Response.json(
            { message: `Error get businesses`, error },
            { status: 500 }
        );
    }
}
