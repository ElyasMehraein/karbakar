import { NextResponse } from 'next/server';

import connectToDB from '@/configs/db';
import BusinessModel from '@/models/Business';

interface Product {
  _id: string;
  name: string;
  // اضافه کردن سایر فیلدهای مورد نیاز
}

interface MonthlyCommitment {
  product: Product;
  amount: number;
}

interface Business {
  _id: string;
  monthlyCommitment: MonthlyCommitment[];
}

export async function GET(req: Request): Promise<NextResponse> {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const businessId = searchParams.get('businessId');

    if (!businessId) {
      return NextResponse.json(
        { message: 'Business ID is required' },
        { status: 400 }
      );
    }

    const data = JSON.parse(
      JSON.stringify(
        await BusinessModel.findOne(
          {
            _id: businessId,
          },
          'monthlyCommitment'
        ).populate('monthlyCommitment.product')
      )
    ) as Business;

    return NextResponse.json(
      { message: 'Get Business products successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error getting Business products`, error);
    return NextResponse.json(
      { message: `Error getting Business products`, error },
      { status: 500 }
    );
  }
}
