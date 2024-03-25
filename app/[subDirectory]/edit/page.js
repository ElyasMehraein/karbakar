import connectToDB from '@/configs/db'
import { cookies } from "next/headers";
import { verifyToken } from "@/controllers/auth";
import { notFound } from 'next/navigation'
import BusinessModel from '@/models/Business'
import { redirect } from 'next/navigation'
import EditBusiness from '@/components/templates/EditBusiness/EditBusiness'
import UserModel from '@/models/User'
import EditProfile from '@/components/templates/EditProfile/EditProfile'


export default async function edit({ params }) {

  const token = cookies().get("token")?.value;
  const tokenPayLoad = verifyToken(token);

  if (!tokenPayLoad) {
    redirect("/welcome");
  }

  connectToDB()
  const logedUserCode = JSON.parse(JSON.stringify(await UserModel.findOne(
    { _id: tokenPayLoad.id },
    "-_id code"
  ))).code

  if (isNaN(params.subDirectory)) {
    const business = JSON.parse(JSON.stringify(await BusinessModel.findOne({
      businessName: params.subDirectory
    }).populate("workers")));

    const users = await JSON.parse(JSON.stringify(await UserModel.find()))
    console.log(users);
    if (!business) {
      console.log("business not found in DB");
      notFound()
    }
    if (Number(business.agentCode) !== logedUserCode) {
      return <h1 className='inMiddle'> 403 دسترسی غیر مجاز</h1>
    }
    return (
      <EditBusiness business={business} logedUserCode={logedUserCode} users={users} />
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
    <EditProfile user={user} logedUserCode={logedUserCode} />
  )
}

