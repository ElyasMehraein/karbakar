import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from '@/models/Bill';
import { GET } from "@/app/api/auth/me/route"
import GuildModel from '@/models/Guild';

export async function PUT(req) {
    const body = await req.json()
    let { billId } = body
    const response = await GET(req)
    const user = await response.json()

    try {
        const bill = await BillModel.findById(billId);
        if (!bill) {
            throw new Error('document not found');
        }
        if (bill.to.toString() !== user._id.toString()) {
            return Response.json(
                { message: `You are not authorized to update the bill ` },
                { status: 403 }
            )
        }
        if (bill.status !== "pending") {
            return Response.json(
                { message: "its not pending bill" },
                { status: 400 }
            )
        }
        let guild = await GuildModel.findById(bill.guild);
        for (let product of bill.products) {
            let theGuildProduct = guild.products.find(guildProduct => guildProduct.productName === product.productName);
            if (!theGuildProduct) {
                guild.products.push({
                    productName: product.productName,
                    unitOfMeasurement: product.unitOfMeasurement,
                })
                await guild.save()
            }
        }
        let business = await BusinessModel.findById(bill.from);

        for (let product of bill.products) {
            let theBusinessProduct = business.deliveredProducts.find(businessProduct => businessProduct.productName === product.productName);
            let uniqueCustomer = await BillModel.distinct('to', {
                productName: bill.productName,
                from: bill.from,
            });
            if (theBusinessProduct) {
                theBusinessProduct.totalDelivered += product.amount;
                theBusinessProduct.thisYearDelivered += product.amount
                theBusinessProduct.uniqueCustomer = uniqueCustomer.length
                await business.save()

            } else {
                business.deliveredProducts.push({
                    productName: product.productName,
                    unitOfMeasurement: product.unitOfMeasurement,
                    totalDelivered: product.amount,
                    lastYearDelivered: 0,
                    thisYearDelivered: product.amount,
                    uniqueCustomer: 1,
                });
                await business.save()
            }
        }
        bill.status = "accepted";
        await bill.save();
        console.log(`the bill updated successfully.`);
        return Response.json(
            { message: `the bill updated successfully.` },
            { status: 200 }
        );
    } catch (error) {
        console.error(`Error updating the bill:`, error);
        Response.json(
            { message: `Error updating the bill `, error },
            { status: 500 })
    }
}
