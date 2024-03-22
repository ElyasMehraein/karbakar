import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from '@/models/Bill';
import { GET } from "@/app/api/auth/me/route"

export async function PUT(req) {
    const body = await req.json()
    let { billId, fieldName, newValue } = body
    const response = await GET(req)
    const user = await response.json()

    try {
        const doc = await BillModel.findById(billId);
        if (!doc) {
            throw new Error('Document not found');
        }
        if (doc.to !== user._id) {
            Response.json(
                { message: `You are not authorized to update ${fieldName} ` },
                { status: 403 }
            )
        }
        doc[fieldName] = newValue;
        await doc.save();
        console.log(`${fieldName} updated successfully.`);
        return Response.json(
            { message: `${fieldName} updated successfully.` },
            { status: 200 }
        );
    } catch (error) {
        console.error(`Error updating ${fieldName}:`, error);
        Response.json(
            { message: `Error updating ${fieldName} `, error },
            { status: 500 })
    }
}
