import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';


export async function PUT(req) {
    const body = await req.json()
    // console.log("body", body);
    let { model, id, fieldName, newValue } = body
    // console.log("aslan inja mirese?", model, id, fieldName, newValue);
    switch (model) {
        case "UserModel":
            model = UserModel;
            break;
        case "BusinessModel":
            model = BusinessModel;
            break;
    }

    // console.log("hala model chie?", model);
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