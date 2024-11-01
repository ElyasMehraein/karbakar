import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import BusinessModel from "@/models/Business";
import GuildModel from "@/models/Guild";
import { GET } from "@/app/api/auth/me/route";

export async function PUT(req) {
    try {
        const body = await req.json();
        const { businessID, basket } = body;

        await connectToDB();

        // دریافت اطلاعات کاربر لاگین شده
        const response = await GET(req);
        const user = await response.json();
        const loggedUser = await UserModel.findOne({ code: user.code });
        
        if (!loggedUser) {
            return Response.json({ message: "لطفا ابتدا وارد شوید" }, { status: 404 });
        }

        // بررسی اینکه کاربر مجوز لازم برای تغییرات در کسب و کار را دارد
        const Business = await BusinessModel.findById(businessID);
        if (!Business || Number(Business.agentCode) !== user.code) {
            return Response.json({ message: "403 دسترسی غیر مجاز" }, { status: 403 });
        }

        // یافتن گیلد مربوط به کسب و کار
        const guild = await GuildModel.findById(Business.guild);

        // بررسی محصولات موجود در basket و افزودن به Guild.products در صورت عدم وجود
        const updatedBasket = [];
        for (const item of basket) {
            // چک می‌کنیم آیا محصول در Guild.products وجود دارد
            let product = guild.products.find(
                (p) => p.productName === item.productName && p.unitOfMeasurement === item.unitOfMeasurement
            );

            // اگر محصول وجود ندارد، آن را اضافه کرده و ذخیره می‌کنیم
            if (!product) {
                product = guild.products.create({
                    productName: item.productName,
                    unitOfMeasurement: item.unitOfMeasurement,
                });
                guild.products.push(product);
                await guild.save();
            }

            // اضافه کردن اطلاعات محصول با استفاده از ObjectId محصول موجود در گیلد
            updatedBasket.push({
                product: product._id,
                amount: item.amount,
                isRetail: item.isRetail,
            });
        }

        // ذخیره updatedBasket در فیلد monthlyCommitment کسب و کار
        await BusinessModel.findByIdAndUpdate(
            businessID,
            { $set: { monthlyCommitment: updatedBasket } },
            { new: true }
        );

        return Response.json({ message: "کسب و کار با موفقیت بروز شد" }, { status: 201 });

    } catch (err) {
        console.error(err);
        return Response.json({ message: "خطای سرور" }, { status: 500 });
    }
}
