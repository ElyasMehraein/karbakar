import Profile from '@/components/Profile/Profile'
import connectToDB from '@/configs/db'
import UserModel from '@/models/User'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// import profileImg from "@/public/m-hands.png"

export default function profile(props) {
  const whichUserProfile = props.user.code
  const router = useRouter()
  const pageCode = router.query.code
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
      <p>you are user {logedUserCode} </p>
      <p>this is user {whichUserProfile} profile</p>
      {isLogedInMyOwnProfile ? "page khodete" : "page shoma nist"}
      <Profile
        props={isLogedInMyOwnProfile}
      />
    </>

  )
}

export async function getServerSideProps(context) {
  connectToDB()
  if (isNaN(context.params.code)) {
    return {
      notFound: true
    }
  }
  const user = await UserModel.findOne(
    { code: context.params.code },
    "code"
  )
  if (!user) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      user: JSON.parse(JSON.stringify(user))
    }
  }
}
