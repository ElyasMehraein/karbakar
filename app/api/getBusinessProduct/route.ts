import connectToDB from "@/configs/db";
import BillModel from "@/models/Bill";
import ProductModel from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

interface Product {
    _id: string;
    billConfirm: boolean;
    [key: string]: any;
}

interface BillProduct {
    product: Product;
    amount: number;
}

interface Bill {
    products: BillProduct[];
    [key: string]: any;
}

interface ProductTotal {
    product: Product;
    totalAmount: number;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const businessId = searchParams.get("businessId");

        if (!businessId) {
            return NextResponse.json(
                { message: 'Business ID is required' },
                { status: 400 }
            );
        }

        const bills: Bill[] = await BillModel.find({
            accepted: true,
            from: businessId
        }).populate("products.product");

        const productTotals: Record<string, ProductTotal> = {};
        bills.forEach(bill => {
            bill.products.forEach(({ product, amount }) => {
                if (product.billConfirm === true) {
                    const productId = product._id.toString();
                    if (productTotals[productId]) {
                        productTotals[productId].totalAmount += amount;
                    } else {
                        productTotals[productId] = {
                            product: product,
                            totalAmount: amount
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
    } catch (error) {
        console.error(`Error getting Business products`, error);
        return NextResponse.json(
            { message: `Error getting Business products`, error },
            { status: 500 }
        );
    }
} 