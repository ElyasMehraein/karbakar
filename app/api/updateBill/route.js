import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from '@/models/Bill';
import { GET } from "@/app/api/auth/me/route"

export async function PUT(req) {
    const body = await req.json()
    let {requesterId, id, fieldName, newValue } = body
    const response = await GET(req)
    const user = await response.json()
    if (requesterId !== user._id) {
        Response.json(
            { message: `You are not authorized to update ${fieldName} ` },
            { status: 403 })
    }
    switch (model) {
        case "UserModel":
            model = UserModel;
            break;
        case "BusinessModel":
            model = BusinessModel;
            break;
        case "BillModel":
            model = BillModel;
            break;
    }
    if (model === BillModel) {

        
        
    }

    try {
        const doc = await model.findById(id);
        if (!doc) {
            throw new Error('Document not found');
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
