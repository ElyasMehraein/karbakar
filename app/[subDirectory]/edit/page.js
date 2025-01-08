import connectToDB from '@/configs/db'
import { cookies } from "next/headers";
import { verifyToken } from "@/controllers/auth";
import { notFound, redirect } from 'next/navigation'
import BusinessModel from '@/models/Business'
import EditBusiness from '@/components/templates/editBusiness/EditBusiness';
import UserModel from '@/models/User'
import EditProfile from '@/components/templates/editProfile/EditProfile'

export default async function edit({ params }) {
  try {
    const token = (await cookies()).get("token")?.value;
    const tokenPayLoad = verifyToken(token);

    if (!tokenPayLoad) {
      redirect("/w");
    }

    await connectToDB();
    const logedUser = await UserModel.findOne(
      { _id: tokenPayLoad.id },
      "code"
    ).lean();

    if (!logedUser) {
      console.log("Logged user not found");
      notFound();
    }

    const logedUserCode = logedUser.code;

    if (!isNaN(params.subDirectory)) {
      const user = await UserModel.findOne(
        { code: Number(params.subDirectory) }
      ).lean();

      if (!user) {
        console.log("User not found in DB");
        notFound();
      }

      return (
        <EditProfile user={user} logedUserCode={logedUserCode} />
      );
    } else {
      const business = await BusinessModel.findOne({
        businessName: params.subDirectory
      }).populate("workers").lean();

      if (!business) {
        console.log("Business not found in DB");
        notFound();
      }

      if (Number(business.agentCode) !== logedUserCode) {
        return <h1 className='inMiddle'>403 دسترسی غیر مجاز</h1>
      }

      const users = await UserModel.find().lean();
      return (
        <EditBusiness business={business} logedUserCode={logedUserCode} users={users} />
      );
    }
  } catch (err) {
    console.error("Error in edit route:", err);
    redirect("/w");
  }
}
