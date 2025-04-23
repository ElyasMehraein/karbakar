import connectToDB from "@/configs/db";
import BusinessModel from "@/models/Business";

interface Guild {
    _id: string;
    guildName: string;
    jobCategory: string;
}

interface DemandForGuild {
    guild: Guild;
}

interface Business {
    _id: string;
    businessName: string;
    businessBrand: string;
    bio: string;
    explain: string;
    demandsForGuilds: DemandForGuild[];
}

interface GroupedBusiness {
    guildName: string;
    jobCategory: string;
    businesses: Array<{
        _id: string;
        businessName: string;
        businessBrand: string;
        bio: string;
        explain: string;
        demandsForGuilds: DemandForGuild[];
    }>;
}

export async function GET(req: Request): Promise<Response> {
    try {
        await connectToDB();

        // دریافت کسب‌وکارهایی که درخواست خدمات گیلد دارند
        const businesses = await BusinessModel.find({
            demandsForGuilds: { $exists: true, $not: { $size: 0 } }
        }).populate({
            path: 'demandsForGuilds.guild',
            select: 'guildName jobCategory'
        });

        // گروه‌بندی کسب‌وکارها بر اساس گیلدهای مورد تقاضا
        const groupedByDemandedGuild: Record<string, GroupedBusiness> = {};

        businesses.forEach((business: Business) => {
            business.demandsForGuilds.forEach(demand => {
                if (!demand.guild) return;
                const guildId = demand.guild._id.toString();

                if (!groupedByDemandedGuild[guildId]) {
                    groupedByDemandedGuild[guildId] = {
                        guildName: demand.guild.guildName,
                        jobCategory: demand.guild.jobCategory,
                        businesses: []
                    };
                }

                groupedByDemandedGuild[guildId].businesses.push({
                    _id: business._id,
                    businessName: business.businessName,
                    businessBrand: business.businessBrand,
                    bio: business.bio,
                    explain: business.explain,
                    demandsForGuilds: business.demandsForGuilds
                });
            });
        });

        return Response.json(
            { message: "get demanded guilds successfully", data: Object.values(groupedByDemandedGuild) },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error getting demanded guilds", error);
        return Response.json(
            { message: "Error getting demanded guilds", error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
} 