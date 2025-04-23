import { cookies } from 'next/headers';
import React from 'react';

import MyIndex from '@/components/templates/index/MyIndex';
import connectToDB from '@/configs/db';
import { verifyToken } from '@/controllers/auth';
import BillModel from '@/models/Bill';
import BusinessModel from '@/models/Business';
import BusinessRelationModel from '@/models/BusinessRelation';
import GuildModel from '@/models/Guild';
import UserModel from '@/models/User';

interface TokenPayload {
  id: string;
}

interface User {
  _id: string;
  businesses: Array<{
    _id: string;
    monthlyCommitment: {
      product: {
        _id: string;
        name: string;
      };
    };
    demandsForGuilds: {
      guild: {
        _id: string;
        guildName: string;
      };
    };
  }>;
  primeJob?: string;
}

interface Business {
  _id: string;
  businessName: string;
  demandsForGuilds: Array<{
    guild: {
      _id: string;
      guildName: string;
    };
  }>;
  guild: {
    _id: string;
    guildName: string;
  };
}

interface Bill {
  _id: string;
  to: string;
  from: string;
  products: Array<{
    product: {
      _id: string;
      name: string;
    };
  }>;
  guild: string;
  isAccept: boolean;
}

interface BusinessRelation {
  _id: string;
  provider: {
    _id: string;
    monthlyCommitment: {
      product: {
        productName: string;
        unitOfMeasurement: string;
      };
    };
  };
  receiver: string;
  isAnswerNeed: boolean;
}

export default async function Page() {
  const token = (await cookies()).get('token')?.value;
  const tokenPayLoad = verifyToken(token) as TokenPayload | null;
  const isGuest = !tokenPayLoad;

  await connectToDB();

  let user: User | null = null;
  let primeBusiness: Business | null = null;
  let relations: BusinessRelation[] = [];
  let guestRelations: BusinessRelation[] = [];
  let bills: Bill[] = [];
  let distinctGuilds: string[] = [];

  try {
    if (!isGuest && tokenPayLoad) {
      user = await JSON.parse(
        JSON.stringify(
          await UserModel.findOne({ _id: tokenPayLoad.id })
            .populate({
              path: 'businesses',
              populate: [
                {
                  path: 'monthlyCommitment.product',
                  model: 'Product',
                  select: '_id name',
                },
                {
                  path: 'demandsForGuilds.guild',
                  model: 'Guild',
                  select: '_id guildName',
                },
              ],
            })
            .lean()
        )
      );

      if (user?.primeJob) {
        primeBusiness = await JSON.parse(
          JSON.stringify(
            await BusinessModel.findOne({ _id: user.primeJob })
              .populate('demandsForGuilds.guild guild')
              .lean()
          )
        );
      }

      relations = await JSON.parse(
        JSON.stringify(
          await BusinessRelationModel.find({
            receiver: {
              $in: user?.businesses?.map((business) => business._id),
            },
            isAnswerNeed: false,
          })
            .populate({
              path: 'provider',
              populate: {
                path: 'monthlyCommitment.product',
                model: 'Product',
                select: 'productName unitOfMeasurement',
              },
            })
            .lean()
        )
      );

      bills = await JSON.parse(
        JSON.stringify(
          await BillModel.find({ to: user?._id })
            .populate('from products.product')
            .lean()
        )
      );

      const billDocs = await BillModel.find({ isAccept: true }).lean();
      distinctGuilds = [...new Set(billDocs.map((doc) => doc.guild))];
    }

    const allRelations = await JSON.parse(
      JSON.stringify(
        await BusinessRelationModel.find({
          isAnswerNeed: false,
        })
          .populate({
            path: 'provider',
            populate: {
              path: 'monthlyCommitment.product',
              model: 'Product',
              select: 'productName unitOfMeasurement',
            },
          })
          .lean()
      )
    );

    guestRelations = allRelations.filter(
      (relation, index, allRelations) =>
        index ===
        allRelations.findIndex(
          (r) =>
            r.provider &&
            relation.provider &&
            r.provider._id.toString() === relation.provider._id.toString()
        )
    );
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <MyIndex
      user={user}
      bills={bills}
      token={token}
      distinctGuilds={distinctGuilds}
      primeBusiness={primeBusiness}
      relations={relations}
      guestRelations={guestRelations}
      isGuest={isGuest}
    />
  );
}
