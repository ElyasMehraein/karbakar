import connectToDB from "@/configs/db";
import BillModel from "@/models/Bill";
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

        const bills = await BillModel.find({ 
            accepted: true,
            from: businessId 
        }).populate("products.product");

        const productTotals = {};

        bills.forEach(bill => {
            bill.products.forEach(({ product, amount }) => {
                if (product.billConfirm === true) {
                    const productId = product._id.toString();
                    if (productTotals[productId]) {
                        productTotals[productId].totalAmount += amount;
                    } else {
                        productTotals[productId] = {
                            product: product,
                            totalAmount: amount
                        };
                    }
                }
            });
        });

        const data = Object.values(productTotals);

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
