import React from 'react'
import MyIndex from '@/components/templates/index/MyIndex'
import { verifyToken } from '@/controllers/auth'
import connectToDB from '@/configs/db'
import UserModel from '@/models/User'
import { cookies } from 'next/headers'
import BillModel from '@/models/Bill'
import BusinessModel from '@/models/Business'
import GuildModel from '@/models/Guild'
import BusinessRelationModel from '@/models/BusinessRelation'

export default async function page() {
  const token = (await cookies()).get('token')?.value
  const tokenPayLoad = verifyToken(token)
  const isGuest = !tokenPayLoad

  await connectToDB()

  let user = null
  let primeBusiness = null
  let relations = []
  let guestRelations = []
  let bills = []
  let distinctGuilds = []

  try {
    if (!isGuest) {
      user = await JSON.parse(
        JSON.stringify(
          await UserModel.findOne({ _id: tokenPayLoad.id })
            .populate({
              path: 'businesses',
              populate: [
                {
                  path: 'monthlyCommitment.product',
                  model: 'Product',
                  select: '_id name',
                },
                {
                  path: 'demandsForGuilds.guild',
                  model: 'Guild',
                  select: '_id guildName',
                },
              ],
            })
            .lean()
        )
      )

      if (user?.primeJob) {
        primeBusiness = await JSON.parse(
          JSON.stringify(
            await BusinessModel.findOne({ _id: user.primeJob })
              .populate('demandsForGuilds.guild guild')
              .lean()
          )
        )
      }

      relations = await JSON.parse(
        JSON.stringify(
          await BusinessRelationModel.find({
            receiver: { $in: user?.businesses?.map(business => business._id) },
            isAnswerNeed: false,
          })
            .populate({
              path: 'provider',
              populate: {
                path: 'monthlyCommitment.product',
                model: 'Product',
                select: 'productName unitOfMeasurement',
              },
            })
            .lean()
        )
      )

      bills = await JSON.parse(
        JSON.stringify(
          await BillModel.find({ to: user?._id }).populate('from products.product').lean()
        )
      )

      // استخراج دسته‌های مختلف اصناف
      const billDocs = await BillModel.find({ isAccept: true }).lean()
      distinctGuilds = [...new Set(billDocs.map(doc => doc.guild))]
    } else {
      const allRelations = await JSON.parse(
        JSON.stringify(
          await BusinessRelationModel.find({
            isAnswerNeed: false,
          })
            .populate({
              path: 'provider',
              populate: {
                path: 'monthlyCommitment.product',
                model: 'Product',
                select: 'productName unitOfMeasurement',
              },
            })
            .lean()
        )
      )
      guestRelations = allRelations.filter(
        (relation, index, allRelations) =>
          index ===
          allRelations.findIndex(
            r =>
              r.provider &&
              relation.provider &&
              r.provider._id.toString() === relation.provider._id.toString()
          )
      )
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return (
    <MyIndex
      user={user}
      bills={bills}
      token={token}
      distinctGuilds={distinctGuilds}
      primeBusiness={primeBusiness}
      relations={relations}
      guestRelations={guestRelations}
      isGuest={isGuest}
    />
  )
}
