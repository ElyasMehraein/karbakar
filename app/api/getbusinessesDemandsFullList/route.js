import connectToDB from '@/configs/db'
import BusinessModel from '@/models/Business'

export async function GET(req) {
  try {
    await connectToDB()

    // دریافت کسب‌وکارهایی که درخواست خدمات گیلد دارند
    const businesses = await BusinessModel.find({
      demandsForGuilds: { $exists: true, $not: { $size: 0 } },
    }).populate({
      path: 'demandsForGuilds.guild', // populate کردن فیلد guild درون آرایه demandsForGuilds
      select: 'guildName jobCategory',
    })

    // گروه‌بندی کسب‌وکارها بر اساس گیلدهای مورد تقاضا
    const groupedByDemandedGuild = {}

    businesses.forEach(business => {
      business.demandsForGuilds.forEach(demand => {
        // اطمینان از وجود اطلاعات گیلد بعد از populate
        if (!demand.guild) return
        const guildId = demand.guild._id.toString()

        if (!groupedByDemandedGuild[guildId]) {
          groupedByDemandedGuild[guildId] = {
            guildName: demand.guild.guildName,
            jobCategory: demand.guild.jobCategory,
            businesses: [],
          }
        }

        groupedByDemandedGuild[guildId].businesses.push({
          _id: business._id,
          businessName: business.businessName,
          businessBrand: business.businessBrand,
          bio: business.bio,
          explain: business.explain,
          demandsForGuilds: business.demandsForGuilds,
          // در صورت نیاز می‌توانید سایر فیلدها را هم اضافه کنید
        })
      })
    })

    return Response.json(
      { message: 'get demanded guilds successfully', data: Object.values(groupedByDemandedGuild) },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error getting demanded guilds', error)
    return Response.json({ message: 'Error getting demanded guilds', error }, { status: 500 })
  }
}
