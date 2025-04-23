import { NextRequest, NextResponse } from 'next/server';

import { GET } from '@/app/api/auth/me/route';
import connectToDB from '@/configs/db';
import BusinessModel from '@/models/Business';
import ProductModel from '@/models/Product';
import UserModel from '@/models/User';

interface Product {
  productName: string;
  unitOfMeasurement: string;
  isRetail: boolean;
}

interface BasketItem {
  product: Product;
  amount: number;
}

interface User {
  code: number;
  [key: string]: any;
}

interface Business {
  agentCode: number;
  guild: {
    _id: string;
    [key: string]: any;
  };
  monthlyCommitment: Array<{
    product: string;
    amount: number;
  }>;
  [key: string]: any;
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { businessID, basket } = body as {
      businessID: string;
      basket: BasketItem[];
    };

    await connectToDB();

    // Get logged-in user information
    const response = await GET(req);
    const user = (await response.json()) as User;
    const loggedUser = await UserModel.findOne({ code: user.code });

    if (!loggedUser) {
      return NextResponse.json(
        { message: 'Please log in first' },
        { status: 404 }
      );
    }

    // Verify user permissions to modify the business
    const business = (await BusinessModel.findById(businessID).populate(
      'guild'
    )) as Business;
    if (!business || Number(business.agentCode) !== user.code) {
      return NextResponse.json(
        { message: '403 Unauthorized access' },
        { status: 403 }
      );
    }

    if (basket.length === 0) {
      await BusinessModel.findByIdAndUpdate(
        businessID,
        { $set: { monthlyCommitment: [] } },
        { new: true }
      );
      return NextResponse.json(
        { message: 'Monthly commitment cleared as basket is empty' },
        { status: 200 }
      );
    }

    // Check and update products in the basket
    for (const item of basket) {
      const { productName, unitOfMeasurement, isRetail } = item.product;
      const { amount } = item;

      // Find the product in the business's guild
      let product = await ProductModel.findOne({
        guild: business.guild._id,
        productName,
      });

      // If the product does not exist, create a new one
      if (!product) {
        product = await ProductModel.create({
          productName,
          unitOfMeasurement,
          guild: business.guild._id,
          isRetail,
        });
      }

      // Check if the product already exists in the business's monthly commitment
      const existingCommitment = business.monthlyCommitment.find(
        (commitment) => commitment.product.toString() === product._id.toString()
      );

      // If the product is not already in the monthly commitment, add it
      if (!existingCommitment) {
        await BusinessModel.findByIdAndUpdate(
          businessID,
          {
            $addToSet: {
              monthlyCommitment: {
                product: product._id,
                amount,
              },
            },
          },
          { new: true }
        );
      }
    }

    return NextResponse.json(
      { message: 'Business successfully updated' },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
