import React from 'react'
import Index from '@/components/index/Index'
import { verifyToken } from "@/controllers/auth";
import connectToDB from '@/configs/db';
import UserModel from '@/models/User';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

export default async function page() {
  const token = cookies().get("token")?.value;
  const tokenPayLoad = verifyToken(token);

  if (!tokenPayLoad) {
    return redirect("/welcome");
  }
  connectToDB()
  const user = JSON.parse(JSON.stringify(await UserModel.findOne(
    { _id: tokenPayLoad.id },
    "-_id code"
  ).populate("businesses")))
  return (
    <Index user={user} token={token}/>
  )
}


