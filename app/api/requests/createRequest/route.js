import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from '@/models/Bill';
import RequestModel from '@/models/Request';
import { GET } from "@/app/api/auth/me/route"

export async function PUT(req) {
    const body = await req.json()
    let { jobRequest } = body
    const response = await GET(req)
    const user = await response.json()

    try {
        const bill = await BillModel.findById(jobRequest);
        if (!bill) {
            throw new Error('document not found');
        }
        if (bill.to.toString() !== user._id.toString()) {
            Response.json(
                { message: `You are not authorized to update the bill ` },
                { status: 403 }
            )
        }
        if (!bill.isAccept) {
            bill.isAccept = true;
            await bill.save();
        } else {
            Response.json(
                { message: `white hats are wellcome :)` },
                { status: 400 }
            )
        }

        let business = await BusinessModel.findById(bill.from);

        for (let product of bill.products) {
            let theBusinessProduct = business.products.find(businessProduct => businessProduct.productName === product.productName);
            let uniqueCustomer = await BillModel.distinct('to', {
                productName: bill.productName,
                from: bill.from,
            });
            console.log("uniqueCustomerCount", uniqueCustomer.length);
            if (theBusinessProduct) {
                console.log("ta inja residams", theBusinessProduct);
                theBusinessProduct.totalDelivered += product.amount;
                theBusinessProduct.thisYearDelivered += product.amount
                theBusinessProduct.uniqueCustomer = uniqueCustomer.length
                await business.save()

            } else {
                business.products.push({
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
