import connectToDB from '@/configs/db'
import UserModel from '@/models/User'
import BusinessModel from '@/models/Business'

export async function GET(request) {
  try {
    await connectToDB()
    const { searchParams } = new URL(request.url)
    const term = searchParams.get('term')?.trim() || ''

    // اگر term خالی بود، خروجی خالی بدهیم:
    if (!term) {
      return new Response(JSON.stringify({ data: [] }), { status: 200 })
    }

    // بررسی اینکه آیا term یک عدد است
    const parsedCode = Number(term)
    const isNumber = !isNaN(parsedCode)

    let users = []
    let businesses = []

    if (isNumber) {
      // اگر عدد باشد، فقط در کد کاربران جستجو کن
      users = await UserModel.find({ code: parsedCode }, 'userName code avatarUrl').limit(10).lean()
      console.log('ha bia', users)
      // هیچ جستجویی در کسب‌وکارها انجام نده
    } else {
      // اگر رشته باشد، در userName جستجو کن
      users = await UserModel.find(
        { userName: { $regex: term, $options: 'i' } },
        'userName code avatarUrl'
      )
        .limit(10)
        .lean()

      // کسب و کارها: businessName یا businessBrand
      businesses = await BusinessModel.find(
        {
          $or: [
            { businessName: { $regex: term, $options: 'i' } },
            { businessBrand: { $regex: term, $options: 'i' } },
          ],
        },
        'businessName businessBrand avatarUrl'
      )
        .limit(10)
        .lean()
    }

    // ترکیب داده‌ها در یک آرایه واحد برای ساده‌سازی کار فرانت‌اند
    const combinedResults = [
      ...users.map(u => ({
        _id: u._id?.toString() ?? `user-${u.code}`,
        type: 'user',
        name: u.userName,
        code: u.code,
        avatarUrl: u.avatarUrl,
      })),
      ...businesses.map(b => ({
        _id: b._id?.toString(),
        type: 'business',
        name: b.businessName,
        brand: b.businessBrand,
        avatarUrl: b.avatarUrl,
      })),
    ]

    return new Response(JSON.stringify({ data: combinedResults }), { status: 200 })
  } catch (error) {
    console.error('Error in search route:', error)
    return new Response(JSON.stringify({ message: 'An error occurred', error: error.message }), {
      status: 500,
    })
  }
}
