import connectToDB from "@/configs/db";
import BillModel from "@/models/Bill";
import BusinessModel from "@/models/Business";
import ProductModel from "@/models/Product";


export async function GET(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const businessId = searchParams.get("businessId");
        
        if (!businessId) {
            return Response.json(
                { message: 'Business ID is required' },
                { status: 400 }
            );
        }

        const data = JSON.parse(JSON.stringify(await BusinessModel.findOne({
            _id:businessId
        },
            "monthlyCommitment"
        ).populate("monthlyCommitment.product")));
        console.log("dataaaa", data);

        return Response.json(
            { message: 'Get Business products successfully', data },
            { status: 200 }
        );
    } catch (error) {
        console.error(`Error getting Business products`, error);
        return Response.json(
            { message: `Error getting Business products`, error },
            { status: 500 }
        );
    }
}
