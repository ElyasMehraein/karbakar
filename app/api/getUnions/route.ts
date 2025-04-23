import { getDistance } from 'geolib';

import { GET as getMe } from '@/app/api/auth/me/route';
import connectToDB from '@/configs/db';
import UnionModel from '@/models/Union';
import UserModel from '@/models/User';

interface Location {
  latitude: number;
  longitude: number;
}

interface Product {
  _id: string;
}

interface BasketItem {
  product: Product;
  amount: number;
}

interface Member {
  member: {
    _id: string;
  };
  demandBasket: BasketItem[];
  offerBasket: BasketItem[];
}

interface Union {
  _id: string;
  members: Member[];
  createdBy: {
    _id: string;
    latitude?: number;
    longitude?: number;
  }[];
  isActive: boolean;
}

interface Business {
  _id: string;
  latitude?: number;
  longitude?: number;
}

interface User {
  code: number;
  businesses: Business[];
}

interface Category5Item {
  union: Union;
  distance: number;
}

export async function GET(req: Request): Promise<Response> {
  try {
    await connectToDB();

    const unions = (await UnionModel.find()
      .populate('members.member')
      .populate({
        path: 'members.offerBasket.product members.demandBasket.product',
      })
      .populate('createdBy')
      .lean()) as Union[];

    const response = await getMe(req);
    if (!response || !response.ok) {
      return new Response(
        JSON.stringify({
          message: 'Unions fetched successfully',
          data: unions,
        }),
        { status: 200 }
      );
    }

    const user = (await response.json()) as User;

    const loggedUser = (await UserModel.findOne({ code: user.code })
      .populate({ path: 'businesses' })
      .lean()) as User;

    if (!loggedUser || !loggedUser.businesses.length) {
      return new Response(
        JSON.stringify({
          message: 'User not found or no businesses available',
        }),
        { status: 404 }
      );
    }

    const userBusinessIds = loggedUser.businesses.map((b) => b._id.toString());
    const userLocation = loggedUser.businesses[0];

    const category1: Union[] = [];
    const category2: Union[] = [];
    const category3: Union[] = [];
    const category4: Union[] = [];
    const category5: Category5Item[] = [];

    unions.forEach((union) => {
      const isUserMember = union.members.some((m) =>
        userBusinessIds.includes(m.member?._id?.toString() || '')
      );

      const totalDemands: Record<string, number> = {};
      const totalOffers: Record<string, number> = {};

      union.members.forEach((m) => {
        m.demandBasket.forEach((db) => {
          totalDemands[db.product._id] =
            (totalDemands[db.product._id] || 0) + db.amount;
        });
        m.offerBasket.forEach((ob) => {
          totalOffers[ob.product._id] =
            (totalOffers[ob.product._id] || 0) + ob.amount;
        });
      });

      let isAllDemandsSatisfied = true;
      Object.keys(totalDemands).forEach((productId) => {
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

      const creator = union.createdBy[0];
      if (
        creator?.latitude &&
        creator?.longitude &&
        userLocation?.latitude &&
        userLocation?.longitude
      ) {
        const distance = getDistance(
          {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          },
          { latitude: creator.latitude, longitude: creator.longitude }
        );
        category5.push({ union, distance });
      }
    });

    category5.sort((a, b) => a.distance - b.distance);

    return new Response(
      JSON.stringify({
        message: 'Unions fetched successfully',
        data: {
          category1,
          category2,
          category3,
          category4,
          category5: category5.map((item) => item.union),
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching unions:', error);
    return new Response(
      JSON.stringify({
        message: 'Error fetching unions',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500 }
    );
  }
}
