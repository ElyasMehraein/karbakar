import connectToDB from '@/configs/db'
import { cookies } from "next/headers";
import { verifyToken } from "@/controllers/auth";
import { notFound } from 'next/navigation'

// import Profile from '@/components/Profile/Profile'
import UserModel from '@/models/User'
import BusinessModel from '@/models/Business'
import Business from '@/components/business/business'


export default async function subDirectory({ params }) {


  const token = cookies().get("token")?.value;
  const tokenPayLoad = verifyToken(token);

  if (!tokenPayLoad) {
    return redirect("/welcome");
  }
  connectToDB()
  const logedUserCode = JSON.parse(JSON.stringify(await UserModel.findOne(
    { _id: tokenPayLoad.id },
    "-_id code"
  ))).code


  if (isNaN(params.subDirectory)) {

    const business = await BusinessModel.findOne({ businessName: params.subDirectory })
    if (!business) {
      console.log("business not found in DB");
      notFound()
    }
    return (
      <Business business={JSON.parse(JSON.stringify(business))}
        logedUserCode={logedUserCode}
      />
    )

  }
  //   const user = await UserModel.findOne(
  //     { code: context.params.subDirectory },
  //   )
  //   if (!user) {
  //     console.log("user not found in DB");
  //     return { notFound: true }
  //   }
  //   return {
  //     props: {
  //       user: JSON.parse(JSON.stringify(user))
  //     }
  // const userAuth = async () => {
  //   const res = await fetch("/api/auth/me")
  //   if (res.status === 200) {
  //     const user = await res.json()
  //     setlogedUserCode(user.data.code)
  //   }
  // }




  //   if (sub.user) {
  //     return (
  //       <Profile user={sub.user}
  //         logedUserCode={logedUserCode} whichUserProfile={whichUserProfile}
  //       />
  //     )
  //   } else if (sub.business) {
  //     return (
  //       <Business business={sub.business}
  //       logedUserCode={logedUserCode} whichUserProfile={whichUserProfile} // need to pass business agent
  //       />
  //     )
  //   }
  // }

}

