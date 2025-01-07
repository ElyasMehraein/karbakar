import connectToDB from '@/configs/db';
import UnionModel from '@/models/Union';
import UserModel from '@/models/User';
import { GET as getMe } from '@/app/api/auth/me/route';
import { getDistance } from 'geolib';

export async function GET(req) {
    try {
        await connectToDB();

        // گرفتن اطلاعات کاربر لاگین‌شده
        const response = await getMe(req);
        if (!response.ok) {
            return new Response(
                JSON.stringify({ message: "log in first" }),
                { status: 401 }
            );
        }
        const user = await response.json();

        // یافتن کاربر و مختصات جغرافیایی آن
        const loggedUser = await UserModel.findOne({ code: user.code })
            .populate({ path: 'businesses' })
            .lean();

        if (!loggedUser) {
            return new Response(
                JSON.stringify({ message: "User not found" }),
                { status: 404 }
            );
        }

        const userBusinessIds = loggedUser.businesses.map(b => b._id.toString());
        const userLocation = loggedUser.businesses[0];

        // گرفتن همه اتحادیه‌ها
        const unions = await UnionModel.find()
            .populate('members.member')
            .populate({ path: 'members.offerBasket.product members.demandBasket.product' })
            .populate('createdBy')
            .lean();

        // آرایه‌های دسته‌بندی
        const category1 = [];
        const category2 = [];
        const category3 = [];
        const category4 = [];
        const category5 = [];

        unions.forEach((union) => {
            const isUserMember = union.members.some(m => userBusinessIds.includes(m.member?._id?.toString()));

            const totalDemands = {};
            const totalOffers = {};
            union.members.forEach(m => {
                m.demandBasket.forEach(db => {
                    totalDemands[db.product._id] = (totalDemands[db.product._id] || 0) + db.amount;
                });
                m.offerBasket.forEach(ob => {
                    totalOffers[ob.product._id] = (totalOffers[ob.product._id] || 0) + ob.amount;
                });
            });

            let isAllDemandsSatisfied = true;
            Object.keys(totalDemands).forEach(productId => {
                if ((totalDemands[productId] || 0) > (totalOffers[productId] || 0)) {
                    isAllDemandsSatisfied = false;
                }
            });

            if (!isUserMember && !isAllDemandsSatisfied) {
                category1.push(union);
                return;
            }

            if (isUserMember) {
                if (!isAllDemandsSatisfied) {
                    category2.push(union);
                    return;
                }

                if (!union.isActive) {
                    category3.push(union);
                    return;
                }

                category4.push(union);
                return;
            }

            // محاسبه فاصله برای دسته‌بندی پنجم
            if (!isUserMember && isAllDemandsSatisfied) {
                const creator = union.createdBy[0];
                if (creator?.latitude && creator?.longitude && userLocation?.latitude && userLocation?.longitude) {
                    const distance = getDistance(
                        { latitude: userLocation.latitude, longitude: userLocation.longitude },
                        { latitude: creator.latitude, longitude: creator.longitude }
                    );
                    category5.push({ union, distance });
                }
            }
        });

        // مرتب‌سازی دسته‌بندی ۵ بر اساس فاصله نزدیک‌ترین به دورترین
        category5.sort((a, b) => a.distance - b.distance);

        return new Response(
            JSON.stringify({
                message: 'Unions fetched successfully',
                data: {
                    category1,
                    category2,
                    category3,
                    category4,
                    category5: category5.map(item => item.union)
                }
            }),
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching unions:', error);
        return new Response(
            JSON.stringify({ message: 'Error fetching unions', error: error.message }),
            { status: 500 }
        );
    }
}
