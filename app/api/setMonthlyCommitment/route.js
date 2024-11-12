import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import BusinessModel from "@/models/Business";
import ProductModel from "@/models/Product";
import { GET } from "@/app/api/auth/me/route";

export async function PUT(req) {
    try {
        const body = await req.json();
        const { businessID, basket } = body;

        await connectToDB();

        // Get logged-in user information
        const response = await GET(req);
        const user = await response.json();
        const loggedUser = await UserModel.findOne({ code: user.code });

        if (!loggedUser) {
            return Response.json({ message: "Please log in first" }, { status: 404 });
        }

        // Verify user permissions to modify the business
        const business = await BusinessModel.findById(businessID).populate("guild");
        if (!business || Number(business.agentCode) !== user.code) {
            return Response.json({ message: "403 Unauthorized access" }, { status: 403 });
        }

        // Check and update products in the basket
        for (const item of basket) {
            const { productName, unitOfMeasurement, amount, isRetail } = item.product;

            // Find the product in the business's guild
            let product = await ProductModel.findOne({
                guild: business.guild._id,
                productName,
            });

            // If the product does not exist, create a new one
            if (!product) {
                product = await ProductModel.create({
                    productName,
                    unitOfMeasurement,
                    guild: business.guild._id,
                    isRetail,
                });
            }

            // Check if the product already exists in the business's monthly commitment
            const existingCommitment = business.monthlyCommitment.find(
                commitment => commitment.product.toString() === product._id.toString()
            );

            // If the product is not already in the monthly commitment, add it
            if (!existingCommitment) {
                await BusinessModel.findByIdAndUpdate(
                    businessID,
                    {
                        $addToSet: {
                            monthlyCommitment: {
                                product: product._id,
                                amount,
                                lastMonthDelivered: 0,
                                lastDeliveredMonth: new Date().getMonth() + 1,
                            },
                        },
                    },
                    { new: true }
                );
            }
        }

        return Response.json({ message: "Business successfully updated" }, { status: 201 });

    } catch (err) {
        console.error(err);
        return Response.json({ message: "Server error" }, { status: 500 });
    }
}
