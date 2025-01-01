import connectToDB from "@/configs/db";
import UnionModel from "@/models/Union";
import ProductModel from "@/models/Product";
import BusinessModel from "@/models/Business";
import { GET } from "@/app/api/auth/me/route";

export async function DELETE(req) {

  //افراد در هر مرحله ای غیر از فعال شدن اتحاد می توانند خروج بزنند  

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

   
    // در نهایت کسب‌وکار را از اعضای اتحادیه حذف می‌کنیم
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
