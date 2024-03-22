import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from '@/models/Bill';
import { GET } from "@/app/api/auth/me/route"

export async function PUT(req) {
    const body = await req.json()
    let { billId, newValue } = body
    const response = await GET(req)
    const user = await response.json()

    try {
        const bill = await BillModel.findById(billId);
        if (!bill) {
            throw new Error('document not found');
        }
        if (bill.to.toString() !== user._id.toString()) {
            Response.json(
                { message: `You are not authorized to update the bill ` },
                { status: 403 }
            )
        }
        // bill.isAccept = true;
        // await bill.save();
        let business = await BusinessModel.findById(bill.from);
        let theBusiness = business.products.find(product =>
            product.productName === bill.productName
        )
        if (theBusiness) {
            theBusiness.totalDelivered += bill.amount;
            await business.save
        } else {
            business.products.push({ productName: bill[0].productName })
            await business.save()
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
