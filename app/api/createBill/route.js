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
        const { selectedBusiness, customerCode, bills } = body;

        await connectToDB();
        const response = await GET(req);
        const user = await response.json();
        const Business = JSON.parse(JSON.stringify(await BusinessModel.findOne({ businessName: selectedBusiness }).populate("guild")));

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

        console.log("bills", bills);

        // Create an array to store Product IDs
        const productIds = [];

        // Loop through each bill item to create a Product
        for (const bill of bills) {
            const product = await ProductModel.create({
                productName: bill.productName,
                unitOfMeasurement: bill.unitOfMeasurement,
                isRetail: bill.isRetail,
                guild: Business.guild._id,
            });
            productIds.push({
                product: product._id,
                amount: bill.amount
            });
        }

        // Create a Bill with all the product IDs
        const createdBill = await BillModel.create({
            guild: Business.guild._id,
            from: Business._id,
            to: customer._id,
            products: productIds, // Add all product IDs to the bill
            status: "pending"
        });

        // Create a report for the created bill
        await ReportModel.create({
            recepiant: customer._id,
            title: "bill",
            business: Business._id,
            bill: createdBill._id,
            isSeen: false,
            isAnswerNeed: false,
            answer: false,
        });

        return Response.json({ message: "Bill & report created successfully" }, { status: 201 });

    } catch (err) {
        console.error("Server error:", err);
        return Response.json({ message: "Server error", error: err.message }, { status: 500 });
    }
}
