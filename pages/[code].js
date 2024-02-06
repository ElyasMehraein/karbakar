import Profile from '@/components/Profile/Profile'
import { useRouter } from 'next/router'

export default function Name() {
  const router = useRouter()
  return (


    <>

      <p>you are in {router.query.code} page</p>
      <Profile />
    </>

  )
}