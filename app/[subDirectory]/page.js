import connectToDB from '@/configs/db';
import { cookies } from "next/headers";
import { verifyToken } from "@/controllers/auth";
import { notFound } from 'next/navigation';
import BillModel from '@/models/Bill';
import BusinessModel from '@/models/Business';
import Business from '@/components/templates/business/business';
import UserModel from '@/models/User';
import Profile from '@/components/templates/Profile/Profile';
import { redirect } from 'next/navigation';
import { GET } from '../api/auth/logout/route';
import BusinessRelationModel from '@/models/BusinessRelation';

export default async function subDirectory({ params }) {

  try {
    const token = cookies().get("token")?.value;
    const tokenPayLoad = verifyToken(token);

    connectToDB();
    let logedUser = null;

    if (tokenPayLoad) {
      logedUser = JSON.parse(JSON.stringify(await UserModel.findOne(
        { _id: tokenPayLoad.id },
        "-_id code businesses"
      ).populate([
        "businesses",
      ])));
    }

    if (isNaN(params.subDirectory)) {

      // Find Business with relationships (populated)
      const business = JSON.parse(JSON.stringify(await BusinessModel.findOne({
        businessName: params.subDirectory
      }).populate([
        "workers",
        "guild",
      ])));

      if (!business) {
        console.log("business not found in DB");
        notFound();
      }

      // Find relevant Bills
      const bills = JSON.parse(JSON.stringify(await BillModel.find({
        from: business._id,
        isAccept: true
      }).populate("to")));

      // Get related businesses for logged-in user (if any)
      let relations = JSON.parse(JSON.stringify(await BusinessRelationModel.find({
        $or: [
          { provider: business._id },
          { receiver: business._id },
        ],
      })));

      return (
        <Business
          business={business}
          logedUser={logedUser}
          bills={bills}
          relations={relations}
        />
      );

    } else {

      const user = JSON.parse(JSON.stringify(await UserModel.findOne(
        { code: params.subDirectory },
      ).populate("businesses")));

      if (!user) {
        console.log("user not found in DB");
        notFound();
      }
      return (
        <Profile user={user}
          logedUserCode={logedUserCode}
        />
      );
    }
  } catch (err) {
    console.error('server error in subDirectory:', err);
    redirect("/w");
  }
}