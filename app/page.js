import React from 'react';
import MyIndex from '@/components/templates/index/MyIndex';
import { verifyToken } from "@/controllers/auth";
import connectToDB from '@/configs/db';
import UserModel from '@/models/User';
import { cookies } from "next/headers";
import BillModel from '@/models/Bill';
import BusinessModel from '@/models/Business';
import GuildModel from '@/models/Guild';
import BusinessRelationModel from '@/models/BusinessRelation';

export default async function page() {
  const token = (await cookies()).get("token")?.value;
  const tokenPayLoad = verifyToken(token);

  if (!tokenPayLoad) {
    return <MyIndex />;
  }

  await connectToDB();

  const user = await JSON.parse(JSON.stringify(await UserModel.findOne({ _id: tokenPayLoad.id })
    .populate({
      path: "businesses",
      populate: {
        path: "monthlyCommitment.product",
        model: "Product",
        select: "_id name",
      },
    })
    .lean()))


  let primeBusiness = null;
  if (user?.primeJob) {
    primeBusiness = await JSON.parse(JSON.stringify(await BusinessModel.findOne({ _id: user.primeJob })
      .populate("guild")
      .lean()))
  }

  const relations = await JSON.parse(JSON.stringify(await BusinessRelationModel.find({
    receiver: { $in: user?.businesses?.map((business) => business._id) },
    isAnswerNeed: false,
  })
    .populate({
      path: "provider",
      populate: {
        path: "monthlyCommitment.product",
        model: "Product",
        select: "productName unitOfMeasurement",
      },
    })
    .lean()))


  const bills = await JSON.parse(JSON.stringify(await BillModel.find({ to: user?._id })
    .populate("from products.product")
    .lean()))

  let distinctGuilds = []
  await BillModel.find({ isAccept: true })
    .then(docs => {
      if (docs.length > 0) {
        const guilds = docs.map(doc => doc.guild);
        distinctGuilds = [...new Set(guilds)];
      }
    })
    .catch(err => {
      console.error(err);
    });

  return (
    <MyIndex {...{ user, bills, token, distinctGuilds, primeBusiness, relations }} />
  );
}


