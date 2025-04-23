import { redirect } from 'next/navigation';


import BugShow from '@/components/modules/BugShow';
import connectToDB from '@/configs/db';

import { GET } from '../api/auth/me/route';

import { User } from '@/types/user';

export default async function page(): Promise<JSX.Element> {
  await connectToDB();
  const response = await GET();
  let user: User | null = null;
  try {
    user = await response.json();
  } catch (err) {
    redirect('/');
  }
  return <BugShow user={user} />;
}
