import BusinessModel from '@/models/Business';


export async function PUT(req) {
    const body = await req.json()
    console.log("body", body);
    const { BusinessId, fieldName, newValue } = body
    try {
        console.log("aslan inja mirese?", BusinessId, fieldName, newValue);
        const updateQuery = {};
        updateQuery[fieldName] = newValue;
        console.log("updateQuery", updateQuery);
        await BusinessModel.updateOne({ _id: BusinessId }, { $set: updateQuery });
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




// const { id } = params;
// const { title, description, price } = await request.json();
// await connectMongoDB();
// await Products.findByIdAndUpdate(id, { title, description, price });
// return NextResponse.json(
//     { message: "Product updated successfully" },
//     { status: 200 }
// );
// }