import Profile from '@/components/Profile/Profile'
import connectToDB from '@/configs/db'
import UserModel from '@/models/User'
import BusinessModel from '@/models/Business'
import { useEffect, useState } from 'react'
import Business from '@/components/business/business'

export default function subDirectory(sub) {
  const whichUserProfile = sub.user.code
  const [logedUserCode, setlogedUserCode] = useState(null)
  useEffect(() => {
    const userAuth = async () => {
      const res = await fetch("/api/auth/me")
      if (res.status === 200) {
        const user = await res.json()
        setlogedUserCode(user.data.code)
      }
    }
    userAuth()
  }, [logedUserCode])



  if (sub.user) {
    return (
      <Profile user={sub.user}
        logedUserCode={logedUserCode} whichUserProfile={whichUserProfile}
      />
    )
  } else if (sub.business) {
    return (
      <Business business={sub.business}
      logedUserCode={logedUserCode} whichUserProfile={whichUserProfile} // need to pass business agent
      />
    )
  }
}

export async function getServerSideProps(context) {
  connectToDB()
  if (isNaN(context.params.subDirectory)) {
    console.log("it looks like a bussinessName => ", context.params.subDirectory);
    const business = await BusinessModel.findOne({ businessName: context.params.subDirectory })
    if (!business) {
      console.log("business not found in DB");
      return { notFound: true }
    }
    return {
      props: {
        business: JSON.parse(JSON.stringify(business))
      }
    }
  }
  const user = await UserModel.findOne(
    { code: context.params.subDirectory },
  )
  if (!user) {
    console.log("user not found in DB");
    return { notFound: true }
  }
  return {
    props: {
      user: JSON.parse(JSON.stringify(user))
    }
  }
}
