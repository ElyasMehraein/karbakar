import Profile from '@/components/Profile/Profile'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useState } from 'react'
// import profileImg from "@/public/m-hands.png"

export default function profile() {
  const router = useRouter()
  const pageCode = router.query.code
  const [isLogedIn, setIsLogedIn] = useState(false)

  useEffect(() => {
    const userAuth = async () => {
      const res = await fetch("/api/auth/me")
      if (res.status === 200) {
        setIsLogedIn(true)
      }
    }
    userAuth()
  }, [])
  console.log("router.query.code", pageCode);
  console.log("isLogedIn", isLogedIn);
  
  return (


    <>

      {/* <p>you are in {router.query.code} page</p> */}
      <Profile
      // props={isLogedInOwnProfile}
      />
    </>

  )
}