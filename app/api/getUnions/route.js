import connectToDB from "@/configs/db";
import UnionModel from "@/models/Union";
import UserModel from "@/models/User";
import { GET as getMe } from "@/app/api/auth/me/route"; // متد گرفتن اطلاعات کاربر لاگین‌شده
// واسه بقیه اتحادها
// try {
//     await connectToDB();
//     const unions = await UnionModel.find()
//         .populate('members.member')
//         .populate('members.offerBasket.product members.demandBasket.product members.member.guild')
//         .lean();

//     return Response.json(
//         { message: 'get unions successfully', data: unions },
//         { status: 200 }
//     );
// } catch (error) {
//     console.error(`Error get unions`, error);
//     return Response.json(
//         { message: `Error get unions`, error },
//         { status: 500 })


export async function GET(req) {
  try {
    await connectToDB();

    // گرفتن اطلاعات کاربر لاگین‌شده
    const response = await getMe(req);
    if (!response.ok) {
      return Response.json({ message: "log in first" }, { status: 401 });
    }
    const user = await response.json();

    // یافتن رکورد کامل User از دیتابیس
    const loggedUser = await UserModel
      .findOne({ code: user.code })
      .populate({
        path: 'businesses',
        populate: {
          path: 'guild', // اگر گیلد بیزنس را هم نیاز دارید
        }
      })
      .lean();

    if (!loggedUser) {
      return Response.json({ message: "log in first" }, { status: 404 });
    }

    // گردآوری آیدی بیزنس‌های کاربر
    const userBusinessIds = (loggedUser.businesses || []).map(b => b._id.toString());
    // گردآوری آیدی گیلدهای بیزنس‌های کاربر
    const userBusinessGuildIds = (loggedUser.businesses || [])
      .filter(b => b.guild?._id)
      .map(b => b.guild._id.toString());

    // گرفتن تمام اتحادیه‌ها (Unions)
    // دقت کنید که ما products را populate می‌کنیم تا به فیلد guild آن دسترسی داشته باشیم
    const unions = await UnionModel.find()
      .populate('members.member')
      .populate({
        path: 'members.offerBasket.product members.demandBasket.product',
        populate: { path: 'guild' } // حتماً اضافه کنید تا فیلد product.guild پر شود
      })
      .lean();

    // آرایه‌های خروجی برای چهار دسته
    const category1 = []; // کاربر عضو نیست + نیاز باقی‌مانده به گیلد کاربر
    const category2 = []; // کاربر عضو است + نیاز برآورده نشده
    const category3 = []; // کاربر عضو است + نیاز برآورده شده + isActive = false
    const category4 = []; // کاربر عضو است + نیاز برآورده شده + isActive = true

    unions.forEach((union) => {
      // چک کنیم کاربر عضو این اتحاد هست یا خیر
      const isUserMember = union.members?.some(
        m => userBusinessIds.includes(m.member?._id?.toString())
      );

      // محاسبه‌ی مجموع عرضه (Offers) و تقاضا (Demands) برای هر productId
      const totalDemands = {};
      const totalOffers = {};

      // ساختن مپ (productId => productGuildId) برای راحتی دسترسی
      const productGuildMap = {};

      union.members?.forEach((m) => {
        // demandBasket
        m.demandBasket?.forEach((dbItem) => {
          const product = dbItem.product;
          if (!product) return;

          const productId = product._id.toString();
          if (!totalDemands[productId]) totalDemands[productId] = 0;
          totalDemands[productId] += dbItem.amount;

          // ذخیره گیلد این محصول (فقط اگر قبلاً تنظیم نشده باشد)
          if (!productGuildMap[productId]) {
            productGuildMap[productId] = product.guild?._id?.toString() || null;
          }
        });

        // offerBasket
        m.offerBasket?.forEach((obItem) => {
          const product = obItem.product;
          if (!product) return;

          const productId = product._id.toString();
          if (!totalOffers[productId]) totalOffers[productId] = 0;
          totalOffers[productId] += obItem.amount;

          // ذخیره گیلد این محصول
          if (!productGuildMap[productId]) {
            productGuildMap[productId] = product.guild?._id?.toString() || null;
          }
        });
      });

      let isAllDemandsSatisfied = true;
      let atLeastOneProductNeedsUserGuild = false;

      const allProductIds = [
        ...new Set([
          ...Object.keys(totalDemands),
          ...Object.keys(totalOffers),
        ]),
      ];

      // بررسی هر محصول برای اختلاف عرضه و تقاضا
      for (const productId of allProductIds) {
        const demand = totalDemands[productId] || 0;
        const offer = totalOffers[productId] || 0;
        const diff = demand - offer;

        // اگر diff > 0 باشد یعنی هنوز به این محصول نیاز هست
        if (diff > 0) {
          isAllDemandsSatisfied = false;

          // بررسی اینکه آیا محصول مربوط به گیلد کاربر است
          const guildIdOfThisProduct = productGuildMap[productId];
          if (guildIdOfThisProduct && userBusinessGuildIds.includes(guildIdOfThisProduct)) {
            atLeastOneProductNeedsUserGuild = true;
          }
        }
      }

      // حالا بر اساس منطق مورد نظر شما دسته‌بندی می‌کنیم:

      // دسته ۱: کاربر عضو نیست و هنوز نیازها رفع نشده و حداقل یک محصول مربوط به گیلد کاربر
      if (!isUserMember && !isAllDemandsSatisfied && atLeastOneProductNeedsUserGuild) {
        category1.push(union);
        return; // از فورئیچ برمی‌گردیم
      }

      // اگر کاربر عضو است
      if (isUserMember) {
        // دسته ۲: کاربر عضو است و هنوز نیاز برآورده نشده
        if (!isAllDemandsSatisfied) {
          category2.push(union);
          return;
        }

        // در این مرحله یعنی نیازها برآورده شده (isAllDemandsSatisfied = true)
        // پس می‌بینیم isActive هست یا خیر
        if (!union.isActive) {
          // دسته ۳: نیازها برآورده شده ولی union isActive = false
          category3.push(union);
          return;
        }

        // دسته ۴: نیازها برآورده شده و union isActive = true
        category4.push(union);
        return;
      }

      // اگر اتحادیه‌ای باقی بماند که در هیچ شرایطی نیفتد
      // بسته به طراحی شما یا در هیچ‌کدام از دسته‌ها قرار نمی‌گیرد
      // یا می‌توانید دسته پیش‌فرضی برای آن در نظر بگیرید.
    });

    // برگرداندن پاسخ
    return Response.json(
      {
        message: 'get unions successfully',
        data: {
          category1, // کاربر عضو نیست + نیاز باقی مانده به گیلد کاربر
          category2, // کاربر عضو است + نیاز برآورده نشده
          category3, // کاربر عضو است + نیاز برآورده شده + ولی isActive=false (در انتظار رای)
          category4, // کاربر عضو است + نیاز برآورده شده + isActive=true
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error get unions`, error);
    return Response.json(
      { message: `Error get unions`, error: error?.message || error },
      { status: 500 }
    );
  }
}
