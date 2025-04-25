import connectToDB from '@/configs/db'
import UnionModel from '@/models/Union'
import BusinessModel from '@/models/Business'

/**
 * تابع کمکی برای محاسبه‌ی عرضه و تقاضای کل (Leftover) در اتحاد.
 * اگر حاصل تراز همه‌ی محصولات 0 باشد، یعنی عرضه و تقاضا یکسان شده است.
 */
function calculateLeftover(union) {
  // ابتدا یک Map برای نگه‌داری مجموع عرضه/تقاضای هر محصول می‌سازیم
  const productTotals = new Map()

  union.members.forEach(({ offerBasket, demandBasket }) => {
    // جمع‌کردن عرضه‌ها
    offerBasket.forEach(offer => {
      if (!offer?.product) return
      const id = offer.product.toString()
      if (!productTotals.has(id)) {
        productTotals.set(id, { supply: 0, demand: 0 })
      }
      productTotals.get(id).supply += offer.amount
    })

    // جمع‌کردن تقاضاها
    demandBasket.forEach(demand => {
      if (!demand?.product) return
      const id = demand.product.toString()
      if (!productTotals.has(id)) {
        productTotals.set(id, { supply: 0, demand: 0 })
      }
      productTotals.get(id).demand += demand.amount
    })
  })

  // بررسی می‌کنیم آیا برای همه‌ی محصولات، supply - demand = 0 است یا خیر
  let leftoverSupply = 0
  let leftoverDemand = 0

  for (const { supply, demand } of productTotals.values()) {
    const diff = supply - demand
    if (diff > 0) {
      leftoverSupply += diff
    } else if (diff < 0) {
      leftoverDemand += Math.abs(diff)
    }
  }

  return { leftoverSupply, leftoverDemand }
}

/**
 * تابع کمکی برای بررسی اینکه آیا "همه" اعضا به یکدیگر رأی داده‌اند یا خیر.
 * فرض بر این است که رأی مثبت در union.votes ثبت می‌شود و رأی "منفی" ثبت نمی‌شود.
 * اگر n عضو داریم، باید برای هر جفت (X, Y) که X != Y، حداقل یک رکورد در votes باشد:
 *    v.voter = X && v.voteFor = Y
 */
function allMembersHaveVotedForEachOther(union) {
  const memberIds = union.members.map(m => m.member.toString())

  // برای هر عضو در آرایهٔ members، چک کنیم آیا به سایر اعضا رأی داده است یا خیر
  for (let i = 0; i < memberIds.length; i++) {
    for (let j = 0; j < memberIds.length; j++) {
      if (i === j) continue // به خودش که نباید رأی بدهد
      const voter = memberIds[i]
      const voteFor = memberIds[j]

      // آیا رأی voter -> voteFor در union.votes وجود دارد؟
      const hasVote = union.votes.some(
        v => v.voter.toString() === voter && v.voteFor.toString() === voteFor
      )
      if (!hasVote) {
        // به محض این‌که یک رأی یافت نشود، false
        return false
      }
    }
  }

  return true
}

export async function POST(req) {
  try {
    await connectToDB()

    const { unionId, voterId, voteForId, voteType } = await req.json()

    // ابتدا چک می‌کنیم که ورودی‌های اصلی ارسال شده‌اند
    if (!unionId || !voterId || !voteForId || !voteType) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 })
    }

    // پیدا کردن اتحادیه
    const union = await UnionModel.findById(unionId)
    if (!union) {
      return new Response(JSON.stringify({ message: 'Union not found' }), {
        status: 404,
      })
    }

    // اگر اتحاد فعال شده باشد، دیگر امکان رأی‌دادن و اخراج وجود ندارد
    if (union.isActive) {
      return new Response(
        JSON.stringify({ message: 'This union is already active. No more changes allowed.' }),
        { status: 403 }
      )
    }

    // اطمینان از این‌که voter و voteFor در میان اعضای اتحاد هستند
    const isVoterMember = union.members.some(m => m.member.toString() === voterId.toString())
    const isVoteForMember = union.members.some(m => m.member.toString() === voteForId.toString())

    if (!isVoterMember || !isVoteForMember) {
      return new Response(JSON.stringify({ message: 'Voter or voteFor is not a union member' }), {
        status: 403,
      })
    }

    // بر اساس نوع رأی
    if (voteType === 'approve') {
      // بررسی کنیم آیا قبلاً رأی وجود داشته یا خیر (جلوگیری از رأی تکراری)
      const hasAlreadyVoted = union.votes.some(
        v =>
          v.voter.toString() === voterId.toString() && v.voteFor.toString() === voteForId.toString()
      )

      if (!hasAlreadyVoted) {
        // اگر رأی قبلی وجود ندارد، رأی جدید را اضافه می‌کنیم
        union.votes.push({
          voter: voterId,
          voteFor: voteForId,
        })
      }
    } else if (voteType === 'reject') {
      // 1) حذف رأی مثبت بین voterId و voteForId (در صورت وجود)
      union.votes = union.votes.filter(
        v =>
          !(
            v.voter.toString() === voterId.toString() &&
            v.voteFor.toString() === voteForId.toString()
          )
      )

      // 2) حذف عضو از آرایه‌ی members
      union.members = union.members.filter(m => m.member.toString() !== voteForId.toString())

      // 3) حذف رأی‌هایی که آن عضو (voteForId) داده یا به او داده شده است
      //    (چه به عنوان رأی‌دهنده "voter" یا به‌عنوان هدف "voteFor")
      union.votes = union.votes.filter(
        v =>
          v.voter.toString() !== voteForId.toString() &&
          v.voteFor.toString() !== voteForId.toString()
      )
    } else {
      return new Response(JSON.stringify({ message: 'Invalid voteType' }), { status: 400 })
    }

    // تغییرات را در دیتابیس ذخیره می‌کنیم
    await union.save()

    // در این مرحله، بررسی می‌کنیم آیا شرایط فعال‌شدن اتحاد برقرار شده است یا خیر
    // 1) تراز عرضه و تقاضا صفر باشد
    // 2) همه اعضا به یکدیگر رأی داده باشند
    const { leftoverSupply, leftoverDemand } = calculateLeftover(union)
    if (leftoverSupply === 0 && leftoverDemand === 0) {
      // حالا چک کنیم آیا همه اعضا به یکدیگر رأی داده‌اند
      if (allMembersHaveVotedForEachOther(union)) {
        union.isActive = true
        await union.save()
      }
    }

    return new Response(JSON.stringify({ message: 'Vote processed successfully' }), {
      status: 200,
    })
  } catch (error) {
    console.error('ERROR in /api/union/vote:', error)
    return new Response(
      JSON.stringify({
        message: 'Server error',
        error: error.message,
      }),
      { status: 500 }
    )
  }
}
