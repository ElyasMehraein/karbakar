import React from 'react'
import MyIndex from '@/components/templates/index/MyIndex';
import { verifyToken } from "@/controllers/auth";
import connectToDB from '@/configs/db';
import UserModel from '@/models/User';
import { cookies } from "next/headers";
import BillModel from '@/models/Bill';
import BusinessModel from '@/models/Business';
import GuildModel from '@/models/Guild';

export default async function page() {
  const token = cookies().get("token")?.value;
  const tokenPayLoad = verifyToken(token);

  if (!tokenPayLoad) {
    return <MyIndex />
  }
  connectToDB()
  const user = await JSON.parse(JSON.stringify(await UserModel.findOne(
    { _id: tokenPayLoad.id },
  ).populate("businesses").exec()))
  let primeBusiness;
  if (user) {
    primeBusiness = await JSON.parse(JSON.stringify(await BusinessModel.findOne(
      { _id: user.primeJob },
    )?.populate("guild").exec()))

  }
  const bills = await JSON.parse(JSON.stringify(await BillModel.find({
    to: user?._id
  }).populate("from")))

  let distinctGuilds = []
  await BillModel.find({ isAccept: true })
    .then(docs => {
      if (docs.length > 0) {
        const guilds = docs.map(doc => doc.guild);
        distinctGuilds = [...new Set(guilds)];

      } else {
        console.log('No guilds to show.');
      }
    })
    .catch(err => {
      console.error(err);
    });
  return (
    <MyIndex {...{ user, bills, token, distinctGuilds, primeBusiness }} />
  )
}


