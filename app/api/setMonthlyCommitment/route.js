import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import BusinessModel from "@/models/Business";
import GuildModel from "@/models/Guild";
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
            console.log("productName, unitOfMeasurement, amount, isRetail", productName, unitOfMeasurement, amount, isRetail);

            // Verify that the product guild matches the business guild
            const productExists = await ProductModel.findOne({
                guild: business.guild._id,
                productName,
            });

            if (!productExists) {
                // If product does not exist in the guild, create a new product entry
                await ProductModel.create({
                    productName,
                    unitOfMeasurement,
                    guild: business.guild._id,
                    isRetail,
                });
            }

            // Update the business's monthly commitment or add it as needed
            await BusinessModel.findByIdAndUpdate(
                businessID,
                {
                    $addToSet: {
                        monthlyCommitment: {
                            product: productExists ? productExists._id : (await ProductModel.findOne({ productName, guild: business.guild._id }))._id,
                            amount,
                            
                        },
                    },
                },
                { new: true }
            );
        }

        return Response.json({ message: "Business successfully updated" }, { status: 201 });

    } catch (err) {
        console.error(err);
        return Response.json({ message: "Server error" }, { status: 500 });
    }
}
