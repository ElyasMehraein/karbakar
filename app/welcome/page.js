import React from 'react'
import Wellcome from '@/components/welcome/welcome';
import { verifyToken } from "@/controllers/auth";
import { redirect } from 'next/navigation'

import connectToDB from '@/configs/db';
import UserModel from '@/models/User';
import { cookies } from "next/headers";

export default async function page() {
  const token = cookies().get("token")?.value;
  const tokenPayLoad = verifyToken(token);

  if (tokenPayLoad) {
    redirect('/')
  }
  // connectToDB()
  // const user = JSON.parse(JSON.stringify(await UserModel.findOne(
  //   { _id: tokenPayLoad.id },
  //   "-_id code"
  // )))
  return (
    <Wellcome />
  )
}

