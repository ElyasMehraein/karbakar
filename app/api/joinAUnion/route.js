import connectToDB from "@/configs/db";
import UnionModel from "@/models/Union";
import ProductModel from "@/models/Product";
import BusinessModel from "@/models/Business";
import { GET } from "@/app/api/auth/me/route";

export async function POST(req) {
  try {
    const body = await req.json();
    const { unionID, businessID, offerBasket, demandBasket, demandGuildID } = body;

    // اتصال به دیتابیس
    await connectToDB();

    // دریافت اطلاعات کاربر لاگین‌کرده
    const response = await GET(req);
    const user = await response.json();

    // بررسی اینکه آیا کاربر جاری، نماینده‌ی (agent) این کسب‌وکار است یا خیر
    const business = await BusinessModel.findById(businessID).populate("guild");
    if (!business || Number(business.agentCode) !== user.code) {
      return Response.json(
        { message: "403 Unauthorized access" },
        { status: 403 }
      );
    }

    // پیدا کردن اتحادیه (Union)
    const union = await UnionModel.findById(unionID).populate("members.member");
    if (!union) {
      return Response.json({ message: "Union not found" }, { status: 404 });
    }

    /**
     * این تابع سبد محصولات پیشنهادی یا موردنیاز را بررسی می‌کند:
     * ۱. اگر محصولی وجود نداشت (بر اساس _id)، ایجاد می‌کند.
     * ۲. اگر داشت، همان را برمی‌گرداند.
     */
    async function validateAndCreateProducts(basket, guildIdForNewProducts) {
      const validatedBasket = [];

      for (const item of basket) {
        const { _id, productName, unitOfMeasurement, isRetail } = item.product;
        const { amount } = item;

        if (!productName || !unitOfMeasurement || !guildIdForNewProducts) {
          throw new Error("Incomplete product information in basket");
        }

        let product;

        // اگر آیدی وجود دارد، ابتدا بررسی می‌کنیم در پایگاه داده هست یا خیر
        if (!typeof(_id) === "string") {
          product = await ProductModel.findById(_id);

          // اگر محصول یافت نشد، یک محصول جدید می‌سازیم
         
        } else {
          // اگر آیدی وجود ندارد، بر اساس (productName، unitOfMeasurement، guild) جستجو می‌کنیم
          product = await ProductModel.findOne({
            productName,
            unitOfMeasurement,
            guild: guildIdForNewProducts,
          });

          // اگر چنین محصولی پیدا نشد، محصول جدید می‌سازیم
          if (!product) {
            product = new ProductModel({
              productName,
              unitOfMeasurement,
              guild: guildIdForNewProducts,
              isRetail,
            });
            await product.save();
          }
        }

        validatedBasket.push({
          product: product._id,
          amount,
        });
      }

      return validatedBasket;
    }

    // گیلد کسب‌وکار برای سبد پیشنهادی
    const guildIdForOffer = business.guild?._id || business.guild;

    // اعتبارسنجی و ساخت/پیداکردن محصولات سبد پیشنهادی
    const validatedOfferBasket = await validateAndCreateProducts(
      offerBasket,
      guildIdForOffer
    );

    // گیلد نیاز برای سبد موردنیاز
    const validatedDemandBasket = await validateAndCreateProducts(
      demandBasket,
      demandGuildID
    );

    // عضو جدید را به آرایه‌ی members اضافه می‌کنیم
    union.members.push({
      member: businessID,
      offerBasket: validatedOfferBasket,
      demandBasket: validatedDemandBasket,
    });

    // حالا که عضو جدید را اضافه کردیم، 
    // می‌خواهیم این کسب‌وکار جدید، به همه‌ی اعضای فعلی رأی مثبت بدهد.
    // پس از اضافه شدن، union.members شامل عضو جدید هم هست، 
    // بنابراین برای رأی دادن فقط اعضای قدیمی را فیلتر می‌کنیم:
    const newMemberId = businessID.toString();

    // «اعضای قبل از اضافه‌شدن» می‌توانند با فیلتر زیر مشخص شوند:
    // ولی اگر تمایل دارید عضو جدید نیز به عضو خودش رأی ندهد:
    const oldMembers = union.members.filter(
      (m) => m.member.toString() !== newMemberId
    );

    // برای هر عضو قدیمی، رکوردی در union.votes اضافه می‌کنیم 
    // که voter = کسب‌وکار جدید و voteFor = اعضای قدیمی
    oldMembers.forEach((memberObj) => {
      union.votes.push({
        voter: newMemberId,
        voteFor: memberObj.member,
      });
    });

    await union.save();

    return Response.json(
      { message: "Business successfully added to the union and voted for existing members" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
