import { notFound, redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import connectToDB from '@/configs/db'
import { verifyToken } from '@/controllers/auth'
import BusinessModel from '@/models/Business'
import UserModel from '@/models/User'
import EditProfile from '@/components/templates/editProfile/EditProfile'
import EditBusiness from '@/components/templates/editBusiness/EditBusiness'

export default async function Page({ params }) {
  try {
    // گرفتن توکن از کوکی
    const token = cookies().get('token')?.value
    // اعتبارسنجی توکن
    const tokenPayload = verifyToken(token)

    if (!tokenPayload) {
      // اگر توکن معتبر نباشد، ریدایرکت
      redirect('/w')
    }

    // اتصال به دیتابیس
    await connectToDB()

    // یافتن کاربر لاگین شده
    const loggedUser = await UserModel.findOne(
      { _id: tokenPayload.id },
      'code'
    ).lean()

    if (!loggedUser) {
      console.log('Logged user not found')
      notFound()
    }

    const loggedUserCode = loggedUser.code
    const { subDirectory } = params

    // اگر پارامتر مسیر (subDirectory) عدد باشد => ویرایش پروفایل کاربر
    if (!isNaN(Number(subDirectory))) {
      const user = await UserModel.findOne(
        { code: Number(subDirectory) }
      ).lean()

      if (!user) {
        console.log('User not found in DB')
        notFound()
      }

      // تبدیل به یک شیء ساده برای جلوگیری از ارور بافر/ObjectID
      const userToSend = JSON.parse(JSON.stringify(user))

      return (
        <EditProfile
          user={userToSend}
          logedUserCode={loggedUserCode}
        />
      )
    }
    // در غیر این صورت => ویرایش بیزینس
    else {
      const business = await BusinessModel.findOne({
        businessName: subDirectory,
      })
        .populate('workers')
        .lean()

      if (!business) {
        console.log('Business not found in DB')
        notFound()
      }

      // بررسی مالکیت بیزینس
      if (Number(business.agentCode) !== loggedUserCode) {
        return <h1 className='inMiddle'>403 دسترسی غیر مجاز</h1>
      }

      // یافتن تمامی کاربران (در صورت نیاز برای ویرایش بیزینس)
      const users = await UserModel.find().lean()

      // تبدیل اشیاء دریافتی به اشیاء ساده
      const businessToSend = JSON.parse(JSON.stringify(business))
      const usersToSend = JSON.parse(JSON.stringify(users))

      return (
        <EditBusiness
          business={businessToSend}
          logedUserCode={loggedUserCode}
          users={usersToSend}
        />
      )
    }
  } catch (err) {
    console.error('Error in edit route:', err)
    redirect('/w')
  }
}
