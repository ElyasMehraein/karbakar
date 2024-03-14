import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';


export async function PUT(req) {
    const body = await req.json()
    let { model, id, fieldName, newValue } = body
    switch (model) {
        case "UserModel":
            model = UserModel;
            break;
        case "BusinessModel":
            model = BusinessModel;
            break;
    }

    try {
        const updateQuery = {};
        updateQuery[fieldName] = newValue;
        await model.updateOne({ _id: id }, { $set: updateQuery });
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