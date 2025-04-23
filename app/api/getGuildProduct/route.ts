import { NextResponse } from 'next/server';

import connectToDB from '@/configs/db';
import ProductModel from '@/models/Product';

interface Product {
  guild: string;
  // اضافه کردن سایر فیلدهای مورد نیاز
}

export async function GET(req: Request): Promise<NextResponse> {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const guildID = searchParams.get('guildID');

    if (!guildID) {
      return NextResponse.json(
        { message: 'Guild ID is required' },
        { status: 400 }
      );
    }

    const data: Product[] = await ProductModel.find({
      guild: guildID,
    });

    return NextResponse.json(
      { message: 'Get Guild products successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error getting Guild products`, error);
    return NextResponse.json(
      { message: `Error getting Guild products`, error },
      { status: 500 }
    );
  }
}
