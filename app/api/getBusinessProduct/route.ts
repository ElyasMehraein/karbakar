import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

import connectToDB from '@/configs/db';
import BillModel from '@/models/Bill';

interface Product {
  _id: mongoose.Types.ObjectId;
  billConfirm: boolean;
  name: string;
  description?: string;
  price: number;
  unitOfMeasurement: string;
}

interface BillProduct {
  product: Product;
  amount: number;
}

interface Bill {
  products: BillProduct[];
  accepted: boolean;
  from: mongoose.Types.ObjectId;
}

interface ProductTotal {
  product: Product;
  totalAmount: number;
}

export async function GET(_req: NextRequest): Promise<NextResponse> {
  try {
    await connectToDB();
    const { searchParams } = new URL(_req.url);
    const businessId = searchParams.get('businessId');

    if (!businessId) {
      return NextResponse.json(
        { message: 'Business ID is required' },
        { status: 400 }
      );
    }

    const bills = await BillModel.find({
      accepted: true,
      from: businessId,
    }).populate('products.product');

    if (!bills || bills.length === 0) {
      return NextResponse.json(
        { message: 'No bills found for this business', data: [] },
        { status: 200 }
      );
    }

    const productTotals: Record<string, ProductTotal> = {};
    bills.forEach((bill) => {
      bill.products.forEach(({ product, amount }) => {
        if (product.billConfirm === true) {
          const productId = product._id.toString();
          if (productTotals[productId]) {
            productTotals[productId].totalAmount += amount;
          } else {
            productTotals[productId] = {
              product: product,
              totalAmount: amount,
            };
          }
        }
      });
    });
    const data = Object.values(productTotals);

    return NextResponse.json(
      { message: 'Get Business products successfully', data },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error(`Error getting Business products`, error);
    return NextResponse.json(
      { message: `Error getting Business products`, error },
      { status: 500 }
    );
  }
}
