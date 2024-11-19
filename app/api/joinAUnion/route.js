import connectToDB from "@/configs/db";
import UnionModel from "@/models/Union";
import ProductModel from "@/models/Product";
import BusinessModel from "@/models/Business";
import GuildModel from "@/models/Guild";
import { GET } from "@/app/api/auth/me/route";

export async function POST(req) {
    try {
        const body = await req.json();
        const { unionID, businessID, offerBasket, demandBasket, guildID, guildName, jobCategory } = body;

        await connectToDB();

        // Get logged-in user information
        const response = await GET(req);
        const user = await response.json();

        // Check if the logged-in user is the agent of the business
        const business = await BusinessModel.findById(businessID).populate("guild");
        if (!business || Number(business.agentCode) !== user.code) {
            return Response.json({ message: "403 Unauthorized access" }, { status: 403 });
        }

        // Find the union
        const union = await UnionModel.findById(unionID).populate("members.member");
        if (!union) {
            return Response.json({ message: "Union not found" }, { status: 404 });
        }

        // Function to validate and create products
        async function validateAndCreateProducts(basket) {
            const validatedBasket = [];

            for (const item of basket) {
                const { productName, unitOfMeasurement, isRetail } = item.product;
                const { amount } = item;

                if (!productName || !unitOfMeasurement || (!guildID && (!guildName || !jobCategory))) {
                    throw new Error("Incomplete product information in basket");
                }

                // Find or create the guild
                let guild;
                if (guildID) {
                    guild = await GuildModel.findById(guildID);
                    if (!guild) throw new Error("Invalid guildID provided");
                } else {
                    guild = await GuildModel.findOne({ guildName, jobCategory });
                    if (!guild) {
                        guild = new GuildModel({ guildName, jobCategory });
                        await guild.save();
                    }
                }

                // Find or create the product
                let product = await ProductModel.findOne({
                    productName,
                    guild: guild._id,
                });

                if (!product) {
                    product = new ProductModel({
                        productName,
                        unitOfMeasurement,
                        guild: guild._id,
                        isRetail,
                    });
                    await product.save();
                }

                validatedBasket.push({
                    product: product._id,
                    amount,
                });
            }

            return validatedBasket;
        }

        // Validate and create products for both baskets
        const validatedOfferBasket = await validateAndCreateProducts(offerBasket);
        const validatedDemandBasket = await validateAndCreateProducts(demandBasket);

        // Add the business as a member to the union
        union.members.push({
            member: businessID,
            offerBasket: validatedOfferBasket,
            demandBasket: validatedDemandBasket,
        });

        await union.save();

        return Response.json({ message: "Business successfully added to the union" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return Response.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}
