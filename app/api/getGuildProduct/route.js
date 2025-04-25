import connectToDB from '@/configs/db'
import ProductModel from '@/models/Product'

export async function GET(req) {
  try {
    await connectToDB()
    const { searchParams } = new URL(req.url)
    const guildID = searchParams.get('guildID')

    if (!guildID) {
      return Response.json({ message: 'Guild ID is required' }, { status: 400 })
    }

    const data = await ProductModel.find({
      guild: guildID,
    })

    return Response.json({ message: 'Get Guild products successfully', data }, { status: 200 })
  } catch (error) {
    console.error(`Error getting Guild products`, error)
    return Response.json({ message: `Error getting Guild products`, error }, { status: 500 })
  }
}
