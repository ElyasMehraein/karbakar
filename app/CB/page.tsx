import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import CreateBusiness from '@/components/templates/createBusiness/CreateBusiness';
import connectToDB from '@/configs/db';
import { verifyToken } from '@/controllers/auth';
import UserModel from '@/models/User';

export default async function page(): Promise<JSX.Element> {
  const token = (await cookies()).get('token')?.value;
  const tokenPayLoad = verifyToken(token);
  if (!tokenPayLoad) {
    redirect('/w');
  }
  await connectToDB();
  const user = await UserModel.findOne({ _id: tokenPayLoad.id }, 'code');
  if (!user) {
    redirect('/');
  }
  return <CreateBusiness />;
}
