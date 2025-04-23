import { NextRequest } from 'next/server';

import { GET } from '@/app/api/auth/me/route';
import connectToDB from '@/configs/db';
import BillModel from '@/models/Bill';
import BusinessModel from '@/models/Business';
import ProductModel from '@/models/Product';
import ReportModel from '@/models/Report';
import UserModel from '@/models/User';

interface BasketItem {
  product: {
    productName: string;
    unitOfMeasurement: string;
    isRetail: boolean;
  };
  amount: number;
}

interface CreateBillRequestBody {
  businessID: string;
  customerCode: number;
  basket: BasketItem[];
}

interface User {
  code: number;
  _id: string;
  primeJob: string;
  businesses: Array<{
    _id: string;
    businessName: string;
    // ... سایر فیلدهای مورد نیاز
  }>;
}

interface Business {
  _id: string;
  agentCode: number;
  guild: {
    _id: string;
  };
}

interface Product {
  _id: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: CreateBillRequestBody = await req.json();
    const { businessID, customerCode, basket } = body;

    await connectToDB();
    const response = await GET();
    const user: User = await response.json();
    const Business: Business = JSON.parse(
      JSON.stringify(
        await BusinessModel.findOne({ _id: businessID }).populate('guild')
      )
    );

    const customer: User = JSON.parse(
      JSON.stringify(await UserModel.findOne({ code: customerCode }))
    );
    if (!customer) {
      return Response.json({ message: 'Customer not found' }, { status: 404 });
    }
    if (Number(Business.agentCode) !== user.code) {
      return Response.json(
        { message: '403 Unauthorized access' },
        { status: 403 }
      );
    }
    if (customer.code === user.code) {
      return Response.json(
        { message: "406 You can't sell things to yourself!" },
        { status: 406 }
      );
    }
    if (customer.businesses.length === 0) {
      return Response.json(
        { message: 'Customer has no business' },
        { status: 422 }
      );
    }

    // Create an array to store Product IDs
    const products: { product: string; amount: number }[] = [];

    // Loop through each bill item to create a Product
    for (const item of basket) {
      const { productName, unitOfMeasurement, isRetail } = item.product;
      const { amount } = item;

      const basketProduct = (await ProductModel.findOne({
        productName,
      })) as Product | null;
      if (basketProduct) {
        products.push({
          product: basketProduct._id,
          amount,
        });
      } else {
        const product = (await ProductModel.create({
          productName,
          unitOfMeasurement,
          guild: Business.guild._id,
          isRetail,
        })) as Product;
        products.push({
          product: product._id,
          amount,
        });
      }
    }

    // Create a Bill with all the product IDs
    await BillModel.create({
      guild: Business.guild._id,
      from: Business._id,
      to: customer._id,
      recipientBusiness: customer.primeJob,
      products,
    });

    // Create a report for the created bill
    await ReportModel.create({
      recepiant: customer._id,
      title: 'bill',
      isSeen: false,
    });

    return Response.json(
      { message: 'Bill & report created successfully' },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error('Server error:', err);
    if (err instanceof Error) {
      return Response.json(
        { message: 'Server error', error: err.message },
        { status: 500 }
      );
    }
    return Response.json(
      { message: 'Server error', error: 'Unknown error occurred' },
      { status: 500 }
    );
  }
}
