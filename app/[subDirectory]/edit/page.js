import connectToDB from '@/configs/db'
import { cookies } from "next/headers";
import { verifyToken } from "@/controllers/auth";
import { notFound } from 'next/navigation'
import BusinessModel from '@/models/Business'
import { redirect } from 'next/navigation'
import EditBusiness from '@/components/templates/editBusiness/EditBusiness';
import UserModel from '@/models/User'
import EditProfile from '@/components/templates/editProfile/EditProfile'

export default async function edit({ params }) {
  const token = cookies().get("token")?.value;
  const tokenPayLoad = verifyToken(token);

  if (!tokenPayLoad) {
    redirect("/w");
  }

  connectToDB()
  const logedUserCode = JSON.parse(JSON.stringify(await UserModel.findOne(
    { _id: tokenPayLoad.id },
    "-_id code"
  ))).code;

  // Check if subDirectory is a number (user code)
  if (!isNaN(params.subDirectory)) {
    // Edit user profile scenario
    const user = JSON.parse(JSON.stringify(await UserModel.findOne(
      { code: Number(params.subDirectory) }, // Convert to number explicitly
    )));

    if (!user) {
      console.log("user not found in DB");
      notFound();
    }

    return (
      <EditProfile user={user} logedUserCode={logedUserCode} />
    );
  } else {
    // Edit business scenario
    const business = JSON.parse(JSON.stringify(await BusinessModel.findOne({
      businessName: params.subDirectory
    }).populate("workers")));

    const users = await JSON.parse(JSON.stringify(await UserModel.find()))
    if (!business) {
      console.log("business not found in DB");
      notFound()
    }
    if (Number(business.agentCode) !== logedUserCode) {
      return <h1 className='inMiddle'> 403 دسترسی غیر مجاز</h1>
    }
    return (
      <EditBusiness business={business} logedUserCode={logedUserCode} users={users} />
    );
  }
}
