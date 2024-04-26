import connectToDB from '@/configs/db'
import { cookies } from "next/headers";
import { verifyToken } from "@/controllers/auth";
import { notFound } from 'next/navigation'
import BillModel from '@/models/Bill';
import BusinessModel from '@/models/Business'
import Business from '@/components/templates/business/business'
import UserModel from '@/models/User'
import Profile from '@/components/templates/Profile/Profile'
import { redirect } from 'next/navigation'
import { POST } from '../api/auth/logout/route';
export default async function subDirectory({ params }) {

  try {
    const token = cookies().get("token")?.value;
    const tokenPayLoad = verifyToken(token);

    connectToDB()
    let logedUserCode = null;

    if (tokenPayLoad) {
      logedUserCode = JSON.parse(JSON.stringify(await UserModel.findOne(
        { _id: tokenPayLoad.id },
        "-_id code"
      ))).code;
    }

    if (isNaN(params.subDirectory)) {

      const business = JSON.parse(JSON.stringify(await BusinessModel.findOne({
        businessName: params.subDirectory
      }).populate("workers")));

      if (!business) {
        console.log("business not found in DB");
        notFound()
      }

      const bills = JSON.parse(JSON.stringify(await BillModel.find({
        from: business._id,
        isAccept: true
      }).populate("to")));

      return (
        <Business business={business}
          logedUserCode={logedUserCode}
          bills={bills}
        />
      )

    }



    const user = JSON.parse(JSON.stringify(await UserModel.findOne(
      { code: params.subDirectory },
    ).populate("businesses")))

    if (!user) {
      console.log("user not found in DB");
      notFound()
    }
    return (
      <Profile user={user}
        logedUserCode={logedUserCode}
      />
    )
  } catch (err) {
    console.error('server error in subDirectory:', err);
    POST()
    redirect("/w");
  }
}

