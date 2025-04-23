import { Types } from "mongoose";
import { NextResponse } from "next/server";

import connectToDB from "@/configs/db";
import Business from "@/models/Business";
import Guild from "@/models/Guild";
import Product from "@/models/Product";
import Request from "@/models/Request";

interface Business {
  _id: Types.ObjectId;
  agentCode: string;
  guild: Types.ObjectId;
}

interface Guild {
  _id: Types.ObjectId;
}

interface ProductDocument {
  _id: Types.ObjectId;
  productName: string;
  unitOfMeasurement: string;
  guild: Types.ObjectId;
  isRetail: boolean;
}

export async function GET() {
  try {
    await connectToDB();
    const businesses = await Business.find().lean();
    return NextResponse.json(businesses);
  } catch {
    return NextResponse.json(
      { error: 'خطا در دریافت کسب‌وکارها' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    const { businessID, basket, user } = body;

    if (!businessID || !basket || !user) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const business = await Business.findById(businessID).lean() as unknown as Business;
    if (!business) {
      return NextResponse.json({ message: 'Business not found' }, { status: 404 });
    }

    if (business.agentCode !== user.code) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const validatedBasket = [];
    for (const product of basket) {
      const { productName, unitOfMeasurement, guildID, isRetail } = product;

      const GuildInDB = await Guild.findById(guildID).lean() as unknown as Guild;
      if (!GuildInDB) {
        return NextResponse.json({ message: 'Guild not found' }, { status: 404 });
      }

      let existingProduct = await Product.findOne({
        productName,
        unitOfMeasurement,
        guild: GuildInDB._id,
      }) as unknown as ProductDocument;

      if (!existingProduct) {
        existingProduct = await Product.create({
          productName,
          unitOfMeasurement,
          guild: GuildInDB._id,
          isRetail,
        }) as unknown as ProductDocument;
      }

      validatedBasket.push({
        product: existingProduct._id.toString(),
        amount: product.amount,
      });
    }

    const request = await Request.create({
      business: businessID,
      basket: validatedBasket,
      status: 'pending',
      createdBy: user._id,
    });

    return NextResponse.json(request);
  } catch {
    return NextResponse.json(
      { error: 'خطا در ایجاد درخواست' },
      { status: 500 }
    );
  }
} 