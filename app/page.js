import React from 'react';
import MyIndex from '@/components/templates/index/MyIndex';
import { verifyToken } from "@/controllers/auth";
import connectToDB from '@/configs/db';
import UserModel from '@/models/User';
import { cookies } from "next/headers";
import BillModel from '@/models/Bill';
import BusinessModel from '@/models/Business';
import BusinessRelationModel from '@/models/BusinessRelation';

export default async function page() {
  const token = cookies().get("token")?.value;
  const tokenPayLoad = verifyToken(token);

  if (!tokenPayLoad) {
    return <MyIndex />;
  }

  await connectToDB();

  const user = await UserModel.findOne({ _id: tokenPayLoad.id })
    .populate({
      path: "businesses",
      populate: {
        path: "monthlyCommitment.product",
        model: "Product",
      },
    })
    .lean()
    .exec();

  // Convert nested ObjectIds to strings
  if (user) {
    user.businesses = user.businesses.map((business) => ({
      ...business,
      _id: business._id.toString(),
      monthlyCommitment: business.monthlyCommitment.map((commitment) => ({
        ...commitment,
        _id: commitment._id.toString(),
        product: {
          ...commitment.product,
          _id: commitment.product._id.toString(),
        },
      })),
    }));
  }

  let primeBusiness;
  if (user?.primeJob) {
    primeBusiness = await BusinessModel.findOne({ _id: user.primeJob })
      .populate("guild")
      .lean()
      .exec();

    // Convert guild _id to string if populated
    if (primeBusiness?.guild) {
      primeBusiness.guild._id = primeBusiness.guild._id.toString();
    }
  }

  const relations = await BusinessRelationModel.find({
    receiver: { $in: user?.businesses?.map((business) => business._id) },
    isAnswerNeed: false,
  })
    .populate("provider")
    .lean()
    .exec();

  // Convert provider _id in relations to string
  relations.forEach((relation) => {
    relation.provider._id = relation.provider._id.toString();
  });

  const bills = await BillModel.find({ to: user?._id })
    .populate("from")
    .lean()
    .exec();

  // Convert guilds to unique values and transform _id fields to strings
  const distinctGuilds = await BillModel.find({ isAccept: true })
    .distinct("guild")
    .then((guilds) => guilds.map((guildId) => guildId.toString()))
    .catch((err) => {
      console.error(err);
      return [];
    });

  return (
    <MyIndex
      {...{
        user,
        bills,
        token,
        distinctGuilds,
        primeBusiness,
        relations,
      }}
    />
  );
}
