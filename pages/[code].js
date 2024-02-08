import Profile from '@/components/Profile/Profile'
import UserModel from '@/models/User'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useState } from 'react'
// import profileImg from "@/public/m-hands.png"

export default function profile() {
  const router = useRouter()
  const pageCode = router.query.code
  const [isLogedIn, setIsLogedIn] = useState(false)
  const [userCode, setUserCode] = useState(null);


  connectToDb()
  useEffect(() => {
    const userAuth = async () => {
      const res = await fetch("/api/auth/me")
      if (res.status === 200) {
        setIsLogedIn(true)
        const user = await res.json();
        setUserCode(user.data.code);
      }
      let user = await UserModel.findOne({ _id })

    }
    userAuth()
  }, [])
  // console.log(user.data._id);
  console.log("router.query.code", pageCode);
  console.log("isLogedIn", isLogedIn);
  //isProfile address avalable?show the name: 404
  return (


    <>
      <p>hello {userCode} you are in {router.query.code} page</p>
      <Profile
      // props={isLogedInOwnProfile}
      />
    </>

  )
}