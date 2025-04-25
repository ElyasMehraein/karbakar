import connectToDB from '@/configs/db'
import UserModel from '@/models/User'
import BusinessModel from '@/models/Business'
import ProductModel from '@/models/Product'
import { GET } from '@/app/api/auth/me/route'
import GuildModel from '@/models/Guild'

export async function PUT(req) {
  try {
    const body = await req.json()
    const { businessID, selectedGuild, requestText, jobCategory } = body
    await connectToDB()

    // Get logged-in user information
    const response = await GET(req)
    const user = await response.json()
    const loggedUser = await UserModel.findOne({ code: user.code })

    if (!loggedUser) {
      return Response.json({ message: 'Please log in first' }, { status: 404 })
    }
    if (!jobCategory) {
      return Response.json({ message: 'jobCategory is required.' }, { status: 407 })
    }

    // Verify user permissions to modify the business
    const business = await BusinessModel.findById(businessID)

    if (!selectedGuild) {
      return Response.json({ message: 'no guild selected' }, { status: 400 })
    }

    let guild
    const isGuildExist = await GuildModel.findOne({ guildName: selectedGuild, jobCategory })
    if (isGuildExist) {
      guild = isGuildExist
    } else {
      guild = await GuildModel.create({
        guildName: selectedGuild,
        jobCategory,
      })
    }

    const isItMoreThan30 = Boolean(business.demandsForGuilds.length > 30)
    if (isItMoreThan30) {
      return Response.json(
        { message: 'you can not have more than 30 demands for guilds' },
        { status: 422 }
      )
    }
    const existingDemand = business.demandsForGuilds.some(demand => {
      return demand.guild.toString() === guild._id.toString()
    })

    if (!existingDemand) {
      await BusinessModel.findByIdAndUpdate(
        businessID,
        {
          $addToSet: {
            demandsForGuilds: {
              guild: guild._id,
              requestText: requestText && requestText.length > 0 ? requestText : undefined,
            },
          },
        },
        { new: true }
      )
    } else {
      return Response.json({ message: 'demand already exist' }, { status: 406 })
    }
    return Response.json(
      { message: 'Business successfully updated', data: guild._id },
      { status: 201 }
    )
  } catch (err) {
    console.error(err)
    return Response.json({ message: 'Server error' }, { status: 500 })
  }
}
