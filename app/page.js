import React from 'react'
import Index from '@/components/templates/index/Index'
import { verifyToken } from "@/controllers/auth";
import connectToDB from '@/configs/db';
import UserModel from '@/models/User';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
import BillModel from '@/models/Bill';

export default async function page() {
  const token = cookies().get("token")?.value;
  const tokenPayLoad = verifyToken(token);

  if (!tokenPayLoad) {
    return redirect("/welcome");
  }
  connectToDB()
  const user = JSON.parse(JSON.stringify(await UserModel.findOne(
    { _id: tokenPayLoad.id },
    "-_id code avatar"
  ).populate("businesses")))

  const bills = JSON.parse(JSON.stringify(await BillModel.find({
    to: user?._id
  })))

  console.log("bills", bills);
  return (
    <Index user={user} bills={bills} token={token} />
  )
}


