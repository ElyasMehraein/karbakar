import connectToDB from '@/configs/db'
import { cookies } from "next/headers";
import { verifyToken } from "@/controllers/auth";
import { notFound } from 'next/navigation'
import BusinessModel from '@/models/Business'

import EditBusiness from '@/components/EditBusiness/EditBusiness'
import UserModel from '@/models/User'
import Profile from '@/components/Profile/Profile'


export default async function edit({ params }) {

  const token = cookies().get("token")?.value;
  const tokenPayLoad = verifyToken(token);

  if (!tokenPayLoad) {
    return redirect("/welcome");
  }
  connectToDB()
  const logedUserCode = JSON.parse(JSON.stringify(await UserModel.findOne(
    { _id: tokenPayLoad.id },
    "-_id code"
  ))).code;

  if (isNaN(params.subDirectory)) {
    console.log("params.subDirectory", params.subDirectory);

    const business = await BusinessModel.findOne({ businessName: params.subDirectory })
    if (!business) {
      console.log("business not found in DB");
      notFound()
    }
    console.log("params.subDirectory", params.subDirectory);
    return (
      <EditBusiness business={business}
        logedUserCode={logedUserCode}
      />
    )
  }



  const user = JSON.parse(JSON.stringify(await UserModel.findOne(
    { code: params.subDirectory },
  )))

  if (!user) {
    console.log("user not found in DB");
    notFound()
  }

  return (
    <h1>inside profile edit</h1>
    // <Profile user={user}
    //   logedUserCode={logedUserCode}
    // />
  )
}

