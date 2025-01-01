import connectToDB from "@/configs/db";
import UnionModel from "@/models/Union";
import BusinessModel from "@/models/Business";
import { GET } from "@/app/api/auth/me/route";

export async function DELETE(req) {
  try {
    // گرفتن ورودی‌های مورد نیاز از بادی
    const body = await req.json();
    const { unionID, myBusinessID, businessToRemoveID } = body;

    // اتصال به دیتابیس
    await connectToDB();

    // دریافت اطلاعات کاربر لاگین‌کرده
    const response = await GET(req);
    if (!response.ok) {
      return Response.json({ message: "log in first" }, { status: 401 });
    }
    const user = await response.json();

    // پیدا کردن کسب‌وکار کاربر بر اساس myBusinessID
    // تا مطمئن شویم agentCode آن با user.code یکی است
    const myBusiness = await BusinessModel.findById(myBusinessID).populate("guild");
    if (!myBusiness) {
      return Response.json(
        { message: "Business (of user) not found" },
        { status: 404 }
      );
    }
    // بررسی نمایندگی کاربر
    if (Number(myBusiness.agentCode) !== user.code) {
      return Response.json(
        { message: "403 Unauthorized access (agentCode mismatch)" },
        { status: 403 }
      );
    }

    // پیدا کردن اتحاد
    const union = await UnionModel.findById(unionID).populate("members.member");
    if (!union) {
      return Response.json({ message: "Union not found" }, { status: 404 });
    }

    // بررسی اینکه اتحاد اکتیو (فعال) نباشد
    if (union.isActive) {
      return Response.json(
        { message: "Cannot remove member from an active union" },
        { status: 403 }
      );
    }

    // چک کنیم آیا کسب‌وکاری که قرار است حذف شود در این اتحاد عضو هست؟
    const memberIndex = union.members.findIndex(
      (m) => m.member && m.member._id.toString() === businessToRemoveID
    );
    if (memberIndex === -1) {
      return Response.json(
        { message: "The business you want to remove is not in this union" },
        { status: 404 }
      );
    }

    // حذف آن عضو از لیست اعضای اتحاد
    union.members.splice(memberIndex, 1);

    // حذف رأی‌هایی که مربوط به آن کسب‌وکار است
    // (چه به عنوان رأی‌دهنده (voter) یا کسی که به او رأی داده شده (voteFor))
    if (Array.isArray(union.votes)) {
      union.votes = union.votes.filter(
        (vote) =>
          vote.voter?.toString() !== businessToRemoveID &&
          vote.voteFor?.toString() !== businessToRemoveID
      );
    }

    // اگر بخواهید از extensionVote هم حذف کنید، می‌توانید اینجا مشابه بالا عمل کنید
    // union.extensionVote = union.extensionVote.filter(
    //   (ev) => ev.extensionVoter?.toString() !== businessToRemoveID
    // );

    await union.save();

    return Response.json(
      { message: "Business removed from the union successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
