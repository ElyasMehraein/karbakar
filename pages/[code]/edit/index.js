import Profile from '@/components/editProfile/Profile'
import connectToDB from '@/configs/db'
import { verifyToken } from '@/controllers/auth'
import UserModel from '@/models/User'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function profile(props) {
  const logedUserCode = props.user.code
  const router = useRouter()
  const pageCode = router.query.code
  let isLogedInMyOwnProfile = false
  useEffect(() => {
    if (logedUserCode == pageCode) {
      isLogedInMyOwnProfile = true
    }else{
      router.replace("/403")
    }
  }, [])


  return (
    <>
      {/* <p>you are user {logedUserCode} </p>
      <p>this is user {pageCode} profile</p>
      {logedUserCode === pageCode? "page khodete" : "page shoma nist"} */}
      <Profile
        logedUserCode={logedUserCode} whichUserProfile={pageCode} />
    </>

  )
}

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  const tokenPayLoad = verifyToken(token);
  if (!tokenPayLoad) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  connectToDB()
  const user = await UserModel.findOne(
    { _id: tokenPayLoad.id },
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
