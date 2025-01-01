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

    // دریافت اطلاعات کاربر لاگین کرده
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

    async function validateAndCreateProducts(basket, guildIdForNewProducts) {
      const validatedBasket = [];

      for (const item of basket) {
        const { _id, productName, unitOfMeasurement, isRetail } = item.product;
        const { amount } = item;

        // چک‌های مقدماتی
        if (!productName || !unitOfMeasurement || !guildIdForNewProducts) {
          throw new Error("Incomplete product information in basket");
        }

        let product;

        // اگر آیدی داریم، ابتدا همان آیدی را در DB جستجو می‌کنیم
        if (_id) {
          product = await ProductModel.findById(_id);

          // اگر محصول با این آیدی پیدا نشد، محصول جدید می‌سازیم
          if (!product) {
            product = new ProductModel({
              productName,
              unitOfMeasurement,
              guild: guildIdForNewProducts,
              isRetail,
            });
            await product.save();
          }
          // اگر پیدا شد، همان را بی‌هیچ چک دیگری استفاده می‌کنیم
        } else {
          // اگر آیدی وجود ندارد، باید بر اساس (productName, unitOfMeasurement, guild) جستجو کنیم
          product = await ProductModel.findOne({
            productName,
            unitOfMeasurement,
            guild: guildIdForNewProducts,
          });

          // اگر در آن گیلد محصولی با این نام و واحداندازه‌گیری پیدا نشد، محصول جدید می‌سازیم
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

    // در نهایت کسب‌وکار را به اعضای اتحادیه اضافه می‌کنیم
    union.members.push({
      member: businessID,
      offerBasket: validatedOfferBasket,
      demandBasket: validatedDemandBasket,
    });

    await union.save();

    return Response.json(
      { message: "Business successfully added to the union" },
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
