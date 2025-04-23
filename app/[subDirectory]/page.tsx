export const dynamicParams = true;
import { cookies } from 'next/headers';

import Profile from '@/components/templates/Profile/Profile';
import Business from '@/components/templates/business/business';
import connectToDB from '@/configs/db';
import { verifyToken } from '@/controllers/auth';
import BillModel from '@/models/Bill';
import BusinessModel from '@/models/Business';
import BusinessRelationModel from '@/models/BusinessRelation';
import UserModel from '@/models/User';

interface PageParams {
  subDirectory: string;
}

interface LogedUser {
  code: number;
  businesses: Array<{
    _id: string;
    businessName: string;
    // ... سایر فیلدهای مورد نیاز
  }>;
}

export default async function subDirectory({ params }: { params: PageParams }) {
  const token = (await cookies()).get('token')?.value;
  const tokenPayLoad = verifyToken(token);

  await connectToDB();
  let logedUser: LogedUser | null = null;

  if (tokenPayLoad) {
    logedUser = await UserModel.findOne(
      { _id: tokenPayLoad.id },
      '-_id code businesses'
    )
      .populate('businesses')
      .lean();
  }

  const subDirectory = params.subDirectory;

  if (isNaN(Number(subDirectory))) {
    const business = await BusinessModel.findOne({
      businessName: subDirectory,
    })
      .populate(['workers', 'guild', 'monthlyCommitment.product'])
      .lean();

    if (!business) {
      console.log('business not found in DB');
      notFound();
    }

    const bills = await BillModel.find({
      from: business._id,
      isAccept: true,
    })
      .populate('to')
      .lean();

    const relations = await BusinessRelationModel.find({
      $or: [{ provider: business._id }, { receiver: business._id }],
    })
      .populate('receiver provider')
      .lean();

    return (
      <Business
        business={JSON.parse(JSON.stringify(business))}
        logedUser={JSON.parse(JSON.stringify(logedUser))}
        bills={JSON.parse(JSON.stringify(bills))}
        relations={JSON.parse(JSON.stringify(relations))}
      />
    );
  } else {
    const user = await UserModel.findOne({ code: Number(subDirectory) })
      .populate('businesses')
      .lean();

    if (!user) {
      console.log('user not found in DB');
      notFound();
    }

    return (
      <Profile
        user={JSON.parse(JSON.stringify(user))}
        logedUser={JSON.parse(JSON.stringify(logedUser))}
      />
    );
  }
}
