import Profile from '@/components/Profile/Profile'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useState } from 'react'
// import profileImg from "@/public/m-hands.png"

export default function profile() {
  const router = useRouter()
  const [isLogedIn, setIsLogedIn] = useState(false)
  const [user, setUser] = useState("")
  const [isLogedInOwnProfile, setIsLogedInOwnProfile] = useState(false)
  console.log(router.query.code);
  console.log(user.code);
  console.log("toye codeam", isLogedInOwnProfile);
  const userAuth = async () => {
    const res = await fetch("/api/auth/me")
    if (res.status === 200) {
      const user = await res.json()
      setUser(user.data)
      if (router.query.code !== user.code) {
        () => setIsLogedInOwnProfile(true)
        console.log("toye codeam2", isLogedInOwnProfile);

      }
    }
  }
  userAuth()
  // useEffect(() => {
  // },[])

  return (


    <>

      <p>you are in {router.query.code} page</p>
      <Profile props={isLogedInOwnProfile} />
    </>

  )
}