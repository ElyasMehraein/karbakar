import BugShow from '@/components/modules/BugShow'
import connectToDB from '@/configs/db'
import { GET } from '../api/auth/me/route'
import { redirect } from 'next/navigation'

export default async function page() {
  await connectToDB()
  const response = await GET()
  let user = null
  try {
    user = await response.json()
  } catch (err) {
    redirect('/')
  }
  return <BugShow user={user} />
}
