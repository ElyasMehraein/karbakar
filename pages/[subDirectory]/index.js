import Profile from '@/components/Profile/Profile'
import connectToDB from '@/configs/db'
import UserModel from '@/models/User'
import BusinessModel from '@/models/Business'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function subDirectory(sub) {
  if (sub.user) {

    const whichUserProfile = sub.user.code
    const router = useRouter()
    const userCode = router.query.subDirectory
    const [isLogedIn, setIsLogedIn] = useState(false)
    const [logedUserCode, setlogedUserCode] = useState(null)
    const [isLogedInMyOwnProfile, setIsLogedInMyOwnProfile] = useState(false)
    useEffect(() => {
      const userAuth = async () => {
        const res = await fetch("/api/auth/me")
        if (res.status === 200) {
          const user = await res.json()
          setlogedUserCode(user.data.code)
          setIsLogedIn(true)
        }
      }
      userAuth()
      if (logedUserCode === whichUserProfile) {
        setIsLogedInMyOwnProfile(true)
      }
    }, [logedUserCode])

    return (
      <>
        {/* <p>you are user {logedUserCode} </p>
      <p>this is user {whichUserProfile} profile</p>
      {isLogedInMyOwnProfile ? "page khodete" : "page shoma nist"} */}
        <Profile user={sub.user}
          logedUserCode={logedUserCode} whichUserProfile={whichUserProfile}
        />
      </>

    )
  } else if (sub.business) {
    console.log("it is a bussiness");
  }
}

export async function getServerSideProps(context) {
  connectToDB()
  if (isNaN(context.params.subDirectory)) {
    const business = await BusinessModel.findOne({ businessName: context.params.subDirectory })
    if (!business) { return { notFound: true } }
    return {
      props: {
        user: JSON.parse(JSON.stringify(business))
      }
    }
  }
  const user = await UserModel.findOne(
    { code: context.params.subDirectory },
  )
  if (!user) { return { notFound: true } }
  return {
    props: {
      user: JSON.parse(JSON.stringify(user))
    }
  }
}
