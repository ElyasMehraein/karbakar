import connectToDB from "@/configs/db"
import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from "@/models/Bill";
// import { redirect } from 'next/navigation'
import { GET } from "@/app/api/auth/me/route"
import ReportModel from "@/models/Report";
import GuildModel from "@/models/Guild";
import ProductModel from "@/models/Product";

export async function POST(req) {
    try {
        const body = await req.json();
        const { businessID, customerCode, basket } = body;

        await connectToDB();
        const response = await GET(req);
        const user = await response.json();
        const Business = JSON.parse(JSON.stringify(await BusinessModel.findOne({ _id: businessID }).populate("guild")));

        const customer = JSON.parse(JSON.stringify(await UserModel.findOne({ code: customerCode })));
        if (!customer) {
            return Response.json({ message: "Customer not found" }, { status: 404 });
        }
        if (Number(Business.agentCode) !== user.code) {
            return Response.json({ message: "403 Unauthorized access" }, { status: 403 });
        }
        if (customer.code === user.code) {
            return Response.json({ message: "406 You can't sell things to yourself!" }, { status: 406 });
        }
        if (customer.businesses.length === 0) {
            return Response.json({ message: "Customer has no business" }, { status: 407 });
        }


        // Create an array to store Product IDs
        const products = [];

        // Loop through each bill item to create a Product
        for (const item of basket) {
            const { productName, unitOfMeasurement, isRetail } = item.product;
            const { amount } = item;

            let basketProduct = await ProductModel.findOne({ productName });
            if (basketProduct) {
                products.push({
                    product: basketProduct._id,
                    amount,
                });
            } else {
                const product = await ProductModel.create({
                    productName,
                    unitOfMeasurement,
                    guild: Business.guild._id,
                    isRetail,
                });
                products.push({
                    product: product._id,
                    amount,
                })
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
            title: "bill",
            isSeen: false,
        });

        return Response.json({ message: "Bill & report created successfully" }, { status: 201 });

    } catch (err) {
        console.error("Server error:", err);
        return Response.json({ message: "Server error", error: err.message }, { status: 500 });
    }
}
