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
import BusinessRelationModel from '@/models/BusinessRelation'; // Import BusinessRelationModel

export default async function subDirectory({ params }) {

  try {
    const token = cookies().get("token")?.value;
    const tokenPayLoad = verifyToken(token);

    connectToDB();
    let logedUserCode = null;

    if (tokenPayLoad) {
      logedUserCode = JSON.parse(JSON.stringify(await UserModel.findOne(
        { _id: tokenPayLoad.id },
        "-_id code"
      ))).code;
    }

    if (isNaN(params.subDirectory)) {

      // Find Business with relationships (populated)
      const business = await BusinessModel.findOne({
        businessName: params.subDirectory
      }).populate([
        "workers",
        "guild",
      ]);

      if (!business) {
        console.log("business not found in DB");
        notFound();
      }

      // Find relevant Bills
      const bills = await BillModel.find({
        from: business._id,
        isAccept: true
      }).populate("to");

      // Get related businesses for logged-in user (if any)
      let relations = await BusinessRelationModel.find({
        $or: [
          { provider: business._id },
          { receiver: business._id },
        ],
      });

      let providers = relations.filter(relation => relation.provider.equals(business._id));
      let receivers = relations.filter(relation => relation.receiver.equals(business._id));


      return (
        <Business
          business={business}
          logedUserCode={logedUserCode}
          bills={bills}
          relatedBusinesses={{ providers, receivers }} // Pass related businesses
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